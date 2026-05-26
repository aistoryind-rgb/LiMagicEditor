const fs = require('fs');
const path = require('path');
global.window = global;
global.customSpelling = {};
global.customTemplates = [];
global.localStorage = { getItem: () => null, setItem: () => {} };
global.setInterval = () => {};
global.setTimeout = () => {};
global.fetch = () => Promise.resolve({ json: () => Promise.resolve({ status: "success" }) });
global.document = { addEventListener: () => {}, getElementById: () => ({ addEventListener: () => {} }), querySelectorAll: () => [], querySelector: () => null };

const appJsPath = path.join(__dirname, '..', 'app.js');
eval(fs.readFileSync(appJsPath, 'utf8'));

const tests = [
    { raw: "Buying cage with a rat", expected: "Buying cage with a Rat. Budget: Negotiable." },
    { raw: "selling cage with a pug", expected: "Selling cage with a Pug. Price: Negotiable." },
    { raw: "buying cage with a retriever", expected: "Buying cage with a Retriever. Budget: Negotiable." },
    { raw: "selling cage with a panda", expected: "Selling cage with a Panda. Price: Negotiable." },
    { raw: "selling six tailed fox on shoulder pet", expected: "Selling six tailed fox on shoulder pet. Price: Negotiable." },
];

let failed = 0;
for (const tc of tests) {
    const ctx = { raw: tc.raw, phoneNumber: "", status: "passed", rejectionReason: "", blacklistReason: "", logs: [], category: "Other", finalText: "", priceInfo: null };
    runValidationPipeline(ctx, "auto");
    const passed = ctx.finalText === tc.expected;
    console.log(`${passed ? "PASS" : "FAIL"}: "${tc.raw}"`);
    if (!passed) {
        console.log(`  Expected: ${tc.expected}`);
        console.log(`  Got:      ${ctx.finalText}`);
        failed++;
    }
}
console.log(`\n${tests.length - failed}/${tests.length} passed.`);
process.exit(failed > 0 ? 1 : 0);
