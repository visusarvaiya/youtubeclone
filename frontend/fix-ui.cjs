const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'pages');

function walkDir(dir) {
    let files = [];
    for (const item of fs.readdirSync(dir)) {
        const fullPath = path.join(dir, item);
        if (fs.statSync(fullPath).isDirectory()) {
            files = files.concat(walkDir(fullPath));
        } else if (fullPath.endsWith('.jsx')) {
            files.push(fullPath);
        }
    }
    return files;
}

const allFiles = walkDir(srcDir);

allFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    // Replace the main wrapper div colors
    const oldWrapper1 = 'className="h-screen overflow-y-auto bg-[#121212] text-white"';
    const newWrapper1 = 'className="h-screen overflow-y-auto bg-white text-slate-900 dark:bg-[#121212] dark:text-white"';
    if (content.includes(oldWrapper1)) {
        content = content.replace(new RegExp(oldWrapper1.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newWrapper1);
        changed = true;
    }

    const oldWrapper2 = "className='h-screen overflow-y-auto bg-[#121212] text-white'";
    const newWrapper2 = "className='h-screen overflow-y-auto bg-white text-slate-900 dark:bg-[#121212] dark:text-white'";
    if (content.includes(oldWrapper2)) {
        content = content.replace(new RegExp(oldWrapper2.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newWrapper2);
        changed = true;
    }

    // Replace sticky headers that have bg-[#121212]
    const oldSticky = 'bg-[#121212] py-2';
    const newSticky = 'bg-white dark:bg-[#121212] py-2 text-slate-900 dark:text-white';
    if (content.includes(oldSticky)) {
        content = content.replace(new RegExp(oldSticky.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newSticky);
        changed = true;
    }

    if (file.includes('Admin.jsx')) {
        // Fix table text-white -> text-slate-900 dark:text-white
        content = content.replace('border text-white', 'border text-slate-900 dark:text-white');
        
        // Fix text-gray-300 -> text-zinc-600 dark:text-gray-300
        content = content.replace(/text-gray-300/g, 'text-zinc-600 dark:text-gray-300');
        
        // Fix text-gray-200 -> text-zinc-600 dark:text-gray-300
        content = content.replace(/text-gray-200/g, 'text-zinc-600 dark:text-gray-300');

        // Fix button styling
        content = content.replace(/bg-\[#08e6f5\] px-3 py-2 font-bold text-black/g, 'bg-blue-600 dark:bg-blue-500 px-3 py-2 font-bold text-white');
        content = content.replace(/bg-\[#08e6f5\] px-3 py-2 font-semibold text-black/g, 'bg-blue-600 dark:bg-blue-500 px-3 py-2 font-semibold text-white');
        
        // Fix border-gray-600 -> border-gray-200 dark:border-gray-600
        content = content.replace(/border-gray-600/g, 'border-gray-200 dark:border-gray-600');
        
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    }
});
