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

// Load app.js
const appJsPath = path.join(__dirname, '..', 'app.js');
const appJsContent = fs.readFileSync(appJsPath, 'utf8');
eval(appJsContent);

// Load run_tests.js test cases
const runTestsPath = path.join(__dirname, 'run_tests.js');
const runTestsContent = fs.readFileSync(runTestsPath, 'utf8');

// Extract testCases array using regex or eval
const testCasesMatch = runTestsContent.match(/const testCases = (\[[\s\S]*?\]);/);
if (!testCasesMatch) {
    console.error("Could not find testCases in run_tests.js");
    process.exit(1);
}
const testCases = eval(testCasesMatch[1]);

const progressFile = path.join(__dirname, 'test_progress.txt');
fs.writeFileSync(progressFile, 'Starting tests...\n');

let failed = 0;
for (const tc of testCases) {
    fs.appendFileSync(progressFile, `Running: ${tc.name}\n`);
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

    try {
        runValidationPipeline(context, "auto");
    } catch (e) {
        context.status = "error";
        context.rejectionReason = e.toString();
    }
    
    let passed = false;
    if (typeof tc.expected === "object" && tc.expected !== null) {
        passed = (context.status === tc.expected.status);
    } else {
        passed = (context.finalText === tc.expected);
    }
    if (!passed) {
        failed++;
        fs.appendFileSync(progressFile, `  FAIL Got: ${context.finalText || context.status}\n`);
    } else {
        fs.appendFileSync(progressFile, `  PASS\n`);
    }
}

fs.appendFileSync(progressFile, `Finished all tests. Failed: ${failed}\n`);
console.log("Completed!");
process.exit(0);
