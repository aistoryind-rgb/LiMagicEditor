const fs = require('fs');

// Mocks
global.window = {
    location: { hostname: "localhost" },
    scrollTo: () => {},
    addEventListener: () => {}
};
global.history = {
    scrollRestoration: "auto",
    replaceState: () => {}
};
global.document = {
    addEventListener: () => {},
    querySelectorAll: () => [],
    getElementById: () => ({
        addEventListener: () => {},
        setAttribute: () => {},
        querySelector: () => ({}),
        classList: { add: () => {}, remove: () => {} },
        style: {}
    })
};
global.localStorage = {
    getItem: () => null,
    setItem: () => {}
};
global.sessionStorage = {
    getItem: () => null,
    setItem: () => {}
};
global.navigator = {
    userAgent: ""
};
global.MutationObserver = class {
    observe() {}
    disconnect() {}
};

// Load app.js code
const code = fs.readFileSync('c:/Users/Max/Documents/Anti_Gravity_02/AI BUILD/app.js', 'utf8');
eval(code);

let allPassed = true;

console.log("Running selfTrainFromPolicy test...");
const rawAd = "buying sim card 7777777";
const category = "Other";

// Verify selfTrainFromPolicy returns the correct mapping
const trainResult = selfTrainFromPolicy(rawAd, category);
console.log("Train result:", trainResult);

if (trainResult && trainResult.wrong === "7777777" && trainResult.right === "77-77-777") {
    console.log("PASS: selfTrainFromPolicy successfully trained repeating digits to policy format!");
} else {
    console.error("FAIL: selfTrainFromPolicy failed to train repeating digits. Result:", trainResult);
    allPassed = false;
}

// Verify cleanExpectedOutput with meta-report expected output
console.log("\nRunning cleanExpectedOutput test...");
const expectedMeta = '[Inline False-Rejection Report]\nRaw Ad Content: "buying sim card 7777777"\nRejection Reason: "None"';
const cleanedOutput = cleanExpectedOutput(rawAd, expectedMeta, category);
console.log("Cleaned output:", cleanedOutput);

const expectedCleaned = "Buying SIM card № 77-77-777. Budget: Negotiable.";
if (cleanedOutput === expectedCleaned) {
    console.log("PASS: cleanExpectedOutput successfully cleaned up and formatted false-rejection meta-report!");
} else {
    console.error(`FAIL: cleanExpectedOutput output mismatch.\nExpected: ${expectedCleaned}\nGot: ${cleanedOutput}`);
    allPassed = false;
}

console.log("\n-----------------------------------------");
if (allPassed) {
    console.log("ALL TESTS PASSED SUCCESSFULLY! 🎉");
} else {
    console.error("SOME TESTS FAILED! ❌");
    process.exit(1);
}
