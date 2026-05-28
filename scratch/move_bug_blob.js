const fs = require('fs');
const path = require('path');

const appJsPath = path.join(__dirname, '../app.js');
let content = fs.readFileSync(appJsPath, 'utf8');

// Normalize line endings to LF for consistent matching
const isCRLF = content.includes('\r\n');
content = content.replace(/\r\n/g, '\n');

// 1. Extract the generateBugReportCardBlob block
const targetStart = `    // Inline Submit Bug Button
    function generateBugReportCardBlob(rawAdText, activeCategory, rejectionReasonText, timestamp) {`;
const targetEnd = `            }, 100);
        });
    }`;

const startIndex = content.indexOf(targetStart);
const endIndex = content.indexOf(targetEnd, startIndex);

if (startIndex === -1 || endIndex === -1) {
    console.error("Error: Could not find generateBugReportCardBlob block boundaries.");
    process.exit(1);
}

const fullTargetBlockLength = (endIndex + targetEnd.length) - startIndex;
const targetBlock = content.substring(startIndex, startIndex + fullTargetBlockLength);

// Remove the target block from its local nested position
content = content.substring(0, startIndex) + content.substring(startIndex + fullTargetBlockLength);
console.log("Removed generateBugReportCardBlob from local nested position.");

// 2. Insert it as a global function before `function escapeHTML(str) {`
const helperRoutinesHeader = `/* ==========================================================================
   Helper Routines
   ========================================================================== */`;

const insertIndex = content.indexOf(helperRoutinesHeader);
if (insertIndex === -1) {
    console.error("Error: Could not find Helper Routines header.");
    process.exit(1);
}

// Convert function definition to not have nested indent spacing if wanted, but keeping it as is is perfectly valid.
// Let's clean the nested indentation by removing the first 4 leading spaces of each line to make it neat.
const cleanedBlock = targetBlock.split('\n').map(line => {
    if (line.startsWith('    ')) {
        return line.substring(4);
    }
    return line;
}).join('\n');

content = content.substring(0, insertIndex) + cleanedBlock + '\n\n' + content.substring(insertIndex);
console.log("Inserted generateBugReportCardBlob globally before Helper Routines.");

// Restore CRLF if it was present originally
if (isCRLF) {
    content = content.replace(/\n/g, '\r\n');
}

fs.writeFileSync(appJsPath, content, 'utf8');
console.log("All refactoring saved to app.js successfully.");
