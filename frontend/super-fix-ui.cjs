const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function walkDir(dir) {
    let files = [];
    for (const item of fs.readdirSync(dir)) {
        const fullPath = path.join(dir, item);
        if (fs.statSync(fullPath).isDirectory()) {
            files = files.concat(walkDir(fullPath));
        } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
            files.push(fullPath);
        }
    }
    return files;
}

const allFiles = walkDir(srcDir);

allFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    // 1. Restore Light/Dark mode backgrounds across all pages!
    const darkOnlyWrapper1 = 'className="h-screen overflow-y-auto bg-[#121212] text-white"';
    const responsiveWrapper1 = 'className="h-screen overflow-y-auto bg-white text-slate-900 dark:bg-[#121212] dark:text-white"';
    if (content.includes(darkOnlyWrapper1)) {
        content = content.replace(new RegExp(darkOnlyWrapper1.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), responsiveWrapper1);
        changed = true;
    }

    const darkOnlyWrapper2 = "className='h-screen overflow-y-auto bg-[#121212] text-white'";
    const responsiveWrapper2 = "className='h-screen overflow-y-auto bg-white text-slate-900 dark:bg-[#121212] dark:text-white'";
    if (content.includes(darkOnlyWrapper2)) {
        content = content.replace(new RegExp(darkOnlyWrapper2.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), responsiveWrapper2);
        changed = true;
    }

    // 2. Kill the cyan (#08e6f5) entirely
    // We will do explicit targeted string replacements first, then fallback global replacements
    const targets = {
        'bg-[#08e6f5]': 'bg-blue-600 dark:bg-blue-500',
        'text-[#08e6f5]': 'text-blue-600 dark:text-blue-500',
        'border-[#08e6f5]': 'border-blue-600 dark:border-blue-500',
        'focus:border-[#08e6f5]': 'focus:border-blue-600 dark:focus:border-blue-500',
        'focus:ring-[#08e6f5]': 'focus:ring-blue-600 dark:focus:ring-blue-500',
        'peer-checked:bg-[#08e6f5]': 'peer-checked:bg-blue-600 dark:peer-checked:bg-blue-500',
        'bg-[#9ef9ff]': 'bg-blue-100 dark:bg-blue-900/30',
        'hover:text-black focus:border-[#08e6f5] focus:bg-[#08e6f5] focus:text-black': 'hover:text-slate-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800',
        'shadow-[5px_5px_0px_0px_#4f4e4e]': '',
        'active:shadow-[0px_0px_0px_0px_#4f4e4e]': '',
        'active:translate-x-[5px] active:translate-y-[5px]': '',
        'active:translate-x-[3px] active:translate-y-[3px]': '',
        // Common string in drawer: hover:bg-[#08e6f5] hover:text-black focus:border-[#08e6f5] focus:bg-[#08e6f5] focus:text-black
        'hover:bg-[#08e6f5] hover:text-black focus:border-[#08e6f5] focus:bg-[#08e6f5] focus:text-black': 'hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:bg-zinc-100 dark:focus:bg-zinc-800',
        'hover:bg-[#08e6f5] hover:text-black': 'hover:bg-zinc-100 dark:hover:bg-zinc-800',
        'group-hover:bg-[#08e6f5]': 'group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700',
        'border-[#08e6f5] text-[#08e6f5] bg-white': 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500 bg-blue-50 dark:bg-blue-900/20',
        'text-black': 'text-white' // the specific text-black used next to cyan buttons
    };

    // targeted string replacements
    let oldContent = content;
    
    // First, fix explicit Drawer strings
    content = content.replace(/hover:bg-\[#08e6f5\] hover:text-black focus:border-\[#08e6f5\] focus:bg-\[#08e6f5\] focus:text-black/g, 'hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:bg-zinc-100 dark:focus:bg-zinc-800');
    content = content.replace(/hover:bg-\[#08e6f5\] hover:text-black/g, 'hover:bg-zinc-100 dark:hover:bg-zinc-800');
    content = content.replace(/border-\[#08e6f5\] text-\[#08e6f5\] bg-white/g, 'border-zinc-900 text-zinc-900 dark:border-white dark:text-white bg-zinc-100 dark:bg-zinc-800');
    
    // Replace all other cyan instances
    content = content.replace(/bg-\[#08e6f5\]/g, 'bg-blue-600 dark:bg-blue-500');
    content = content.replace(/text-\[#08e6f5\]/g, 'text-blue-600 dark:text-blue-500');
    content = content.replace(/border-\[#08e6f5\]/g, 'border-blue-600 dark:border-blue-500');
    content = content.replace(/group-hover:bg-\[#08e6f5\]/g, 'group-hover:bg-blue-600 dark:group-hover:bg-blue-500');
    content = content.replace(/bg-\[#9ef9ff\]/g, 'bg-zinc-100 dark:bg-zinc-900/40'); // often used for icon backgrounds
    
    // clean up shadows
    content = content.replace(/shadow-\[5px_5px_0px_0px_#4f4e4e\]/g, 'shadow-md');
    content = content.replace(/active:shadow-\[0px_0px_0px_0px_#4f4e4e\]/g, '');
    content = content.replace(/active:translate-x-\[5px\] active:translate-y-\[5px\]/g, 'active:scale-95');
    content = content.replace(/active:translate-x-\[3px\] active:translate-y-\[3px\]/g, 'active:scale-95');

    // Make inputs visible on light mode
    content = content.replace(/text-gray-300/g, 'text-zinc-700 dark:text-gray-300');
    
    if (content !== oldContent) {
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    }
});
