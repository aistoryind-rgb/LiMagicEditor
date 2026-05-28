const fs = require('fs');
const path = require('path');

const appJsPath = path.join(__dirname, '..', 'app.js');
const extractedPolicyPath = path.join(__dirname, 'extracted_policy.txt');

console.log('Reading files...');
let policyText = fs.readFileSync(extractedPolicyPath, 'utf8');
let appJsText = fs.readFileSync(appJsPath, 'utf8');

// Perform character cleanups
const cleanups = [
    { regex: /´╗┐/g, replace: '' },
    { regex: /ÔÇ£/g, replace: '“' },
    { regex: /ÔÇØ/g, replace: '”' },
    { regex: /ÔÇÿ/g, replace: '‘' },
    { regex: /ÔÇÖ/g, replace: '’' },
    { regex: /ÔÇª/g, replace: '…' },
    { regex: /Ôäû/g, replace: '№' },
    { regex: /ÔùÅ/g, replace: '●' },
    { regex: /Ôùä/g, replace: '○' },
    { regex: /ÔÇô/g, replace: '–' },
    { regex: /ÔÇó/g, replace: '•' },
    { regex: /ÔÇö/g, replace: '—' },
    { regex: /ÔÇò/g, replace: '•' },
    { regex: /ÔÇ╣/g, replace: '‹' },
    { regex: /ÔÇ║/g, replace: '›' },
    { regex: /ÔÇá/g, replace: '†' },
    { regex: /ÔÇí/g, replace: '‡' },
    { regex: /Ôäó/g, replace: '™' },
    { regex: /#­ƒô▒/g, replace: '#📱' },
    { regex: /#­ƒº¥/g, replace: '#📁' },
    { regex: /­ƒô▒/g, replace: '📱' },
    { regex: /­ƒº¥/g, replace: '📁' }
];

console.log('Cleaning policy text...');
for (const cleanup of cleanups) {
    policyText = policyText.replace(cleanup.regex, cleanup.replace);
}

// Find const POLICY_PAGES = [ in app.js
const startIndex = appJsText.indexOf('const POLICY_PAGES = [');
if (startIndex === -1) {
    console.error('Error: Could not find const POLICY_PAGES = [ in app.js');
    process.exit(1);
}

// Find the end of POLICY_PAGES array. We want to find the ]; followed by let currentPolicySpread or let currentPolicyPage
// Let's search for let currentPolicySpread = 0; or let isBookSearchMode
const spreadIndex = appJsText.indexOf('let currentPolicySpread = 0;');
if (spreadIndex === -1) {
    console.error('Error: Could not find let currentPolicySpread = 0; in app.js');
    process.exit(1);
}

// Search backwards from spreadIndex for ];
const closingIndex = appJsText.lastIndexOf('];', spreadIndex);
if (closingIndex === -1 || closingIndex < startIndex) {
    console.error('Error: Could not find closing ]; of POLICY_PAGES in app.js');
    process.exit(1);
}

const endIndex = closingIndex + 2; // Include the ];

console.log(`Replacing POLICY_PAGES in app.js from index ${startIndex} to ${endIndex}...`);

const updatedAppJsText = appJsText.slice(0, startIndex) + policyText + appJsText.slice(endIndex);

fs.writeFileSync(appJsPath, updatedAppJsText, 'utf8');
console.log('Successfully updated app.js with cleaned 51-page array!');
