const fs = require('fs');
const path = require('path');

const appJsPath = path.join(__dirname, '../app.js');
let content = fs.readFileSync(appJsPath, 'utf8');

// Normalize line endings to LF for consistent matching
const isCRLF = content.includes('\r\n');
content = content.replace(/\r\n/g, '\n');

// 1. Patch escapeHTML function
const escapeHtmlTarget = `function escapeHTML(str) {
    if (str === null || str === undefined) return "";
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}`;

// We already patched escapeHTML, but let's make sure it handles both states
const escapeHtmlTargetOld = `function escapeHTML(str) {
    if (!str) return "";
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}`;

if (content.includes(escapeHtmlTargetOld)) {
    content = content.replace(escapeHtmlTargetOld, escapeHtmlTarget);
    console.log("Patched escapeHTML successfully.");
} else if (content.includes(escapeHtmlTarget)) {
    console.log("escapeHTML was already patched.");
} else {
    console.error("Error: Could not find escapeHTML function target.");
    process.exit(1);
}

// 2. Patch z-index of dialogs from 20000 to 100000 to overlay the GRP login gate (99999)
const zIndexTarget = `overlay.style.zIndex = "20000";`;
const zIndexReplacement = `overlay.style.zIndex = "100000";`;

const zIndexCount = (content.match(new RegExp(zIndexTarget, 'g')) || []).length;
if (zIndexCount > 0) {
    content = content.split(zIndexTarget).join(zIndexReplacement);
    console.log(`Patched ${zIndexCount} z-index declarations to 100000.`);
} else if (content.includes(zIndexReplacement)) {
    console.log("z-index was already patched to 100000.");
} else {
    console.error("Error: Could not find any z-index declarations to patch.");
    process.exit(1);
}

// 3. Patch dialog animation blocks to use synchronous reflow instead of requestAnimationFrame
const animationTarget = `    overlay.appendChild(dialog);
    targetDoc.body.appendChild(overlay);

    // Fade-in animations
    requestAnimationFrame(() => {
        overlay.style.opacity = "1";
        dialog.style.transform = "scale(1) translateY(0)";
    });`;

const animationReplacement = `    overlay.appendChild(dialog);
    targetDoc.body.appendChild(overlay);

    // Fade-in animations
    void overlay.offsetHeight; // Force reflow to guarantee CSS transition works on all browsers
    overlay.style.opacity = "1";
    dialog.style.transform = "scale(1) translateY(0)";`;

const animationTargetReflow = `    overlay.appendChild(dialog);
    targetDoc.body.appendChild(overlay);

    // Fade-in animations
    void overlay.offsetHeight; // Force reflow to guarantee CSS transition works on all browsers
    overlay.style.opacity = "1";
    dialog.style.transform = "scale(1) translateY(0)";`;

if (content.includes(animationTarget)) {
    const animCount = (content.match(new RegExp(escapeRegExp(animationTarget), 'g')) || []).length;
    content = content.split(animationTarget).join(animationReplacement);
    console.log(`Patched ${animCount} dialog animation blocks.`);
} else if (content.includes(animationTargetReflow)) {
    console.log("Dialog animation blocks were already patched.");
} else {
    console.error("Error: Could not find animation target blocks.");
    process.exit(1);
}

// Restore CRLF if it was present originally
if (isCRLF) {
    content = content.replace(/\n/g, '\r\n');
}

fs.writeFileSync(appJsPath, content, 'utf8');
console.log("All patches saved to app.js.");

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
