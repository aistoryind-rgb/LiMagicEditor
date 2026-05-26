const fs = require('fs');
const path = require('path');
global.window = global;
global.customSpelling = {};
global.customTemplates = [];
global.localStorage = {
    getItem: () => null,
    setItem: () => {}
};
global.setInterval = () => {};
global.setTimeout = () => {};
global.fetch = () => Promise.resolve({
    json: () => Promise.resolve({ status: "success" })
});
global.document = {
    addEventListener: () => {},
    getElementById: () => ({ addEventListener: () => {} }),
    querySelectorAll: () => [],
    querySelector: () => null
};

const appJsPath = path.join(__dirname, '..', 'app.js');
const appJsContent = fs.readFileSync(appJsPath, 'utf8');
eval(appJsContent);

const runTestsPath = path.join(__dirname, 'run_tests.js');
const runTestsContent = fs.readFileSync(runTestsPath, 'utf8');
const testCasesMatch = runTestsContent.match(/const testCases = (\[[\s\S]*?\]);/);
const testCases = eval(testCasesMatch[1]);

console.log("Running tests 1 to 16 in sequence...");
for (let i = 0; i < 16; i++) {
    const tc = testCases[i];
    console.log(`Running test ${i + 1}: ${tc.name}`);
    const context = {
        raw: tc.raw,
        phoneNumber: "",
        status: "passed",
        rejectionReason: "",
        blacklistReason: "",
        logs: [],
        category: "Other",
        finalText: "",
        priceInfo: null
    };
    runValidationPipeline(context, "auto");
    console.log(`  Done: ${context.finalText}`);
}
console.log("Completed sequence!");
process.exit(0);
