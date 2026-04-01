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

    // Revert the main wrapper div colors
    const newWrapper1 = 'className="h-screen overflow-y-auto bg-white text-slate-900 dark:bg-[#121212] dark:text-white"';
    const oldWrapper1 = 'className="h-screen overflow-y-auto bg-[#121212] text-white"';

    if (content.includes(newWrapper1)) {
        content = content.replace(new RegExp(newWrapper1.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), oldWrapper1);
        changed = true;
    }

    const newWrapper2 = "className='h-screen overflow-y-auto bg-white text-slate-900 dark:bg-[#121212] dark:text-white'";
    const oldWrapper2 = "className='h-screen overflow-y-auto bg-[#121212] text-white'";

    if (content.includes(newWrapper2)) {
        content = content.replace(new RegExp(newWrapper2.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), oldWrapper2);
        changed = true;
    }

    // Revert sticky headers
    const newSticky = 'bg-white dark:bg-[#121212] py-2 text-slate-900 dark:text-white';
    const oldSticky = 'bg-[#121212] py-2';
    if (content.includes(newSticky)) {
        content = content.replace(new RegExp(newSticky.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), oldSticky);
        changed = true;
    }

    if (file.includes('Admin.jsx')) {
        content = content.replace(/border text-slate-900 dark:text-white/g, 'border text-white');
        content = content.replace(/text-zinc-600 dark:text-gray-300/g, 'text-gray-300');
        content = content.replace(/border-gray-200 dark:border-gray-600/g, 'border-gray-600');
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(file, content);
        console.log(`Reverted ${file}`);
    }
});
