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
    // Core vehicle ads
    { raw: "selling fully upgraded sandking xl", expected: "Selling Vapid Sandking XL. Fully upgraded. Price: Negotiable." },
    { raw: "buying truffade chiron", expected: "Buying Truffade Chiron. Budget: Negotiable." },
    // Cage pet cases
    { raw: "Buying cage with a rat", expected: "Buying cage with a Rat. Budget: Negotiable." },
    { raw: "Selling cage with a pet", expected: "Selling cage with a pet. Price: Negotiable." },
    { raw: "Buying cage with a Dog", expected: "Buying cage with a Dog. Budget: Negotiable." },
    { raw: "buying pet", expected: "Buying cage with a pet. Budget: Negotiable." },
    { raw: "selling pet 600k", expected: "Selling cage with a pet. Price: $600.000" },
    // Clothing
    { raw: "selling black gloves", expected: "Selling Black Gloves. Price: Negotiable." },
    // Real estate
    { raw: "selling house 1406", expected: "Selling house №1406. Price: Negotiable." },
    // Tickets
    { raw: "selling 10 rp tickets for 350k each", expected: "Selling 10 Grand tickets for $350k each. Price: $3.5M." },
    // Subscription
    { raw: "buying prime platinum 30 days", expected: "Buying Prime Platinum (30 days). Budget: Negotiable." },
    // Dating
    { raw: "looking for girlfriend", expected: "Looking for a Girlfriend." },
    // Charger item
    { raw: "selling charger", expected: "Selling Charger. Price: Negotiable." },
    // Fish
    { raw: "selling 10 salmon", expected: "Selling 10 Salmon. Price: Negotiable." },
    // License plate cases
    { raw: "selling a liesence plate number 1FIB123", expected: "Selling license plate (1FIB123). Price: Negotiable." },
    { raw: "buying plate (222)", expected: "Buying license plate (222). Budget: Negotiable." },
    { raw: "selling a custom license plate", expected: "Selling a custom license plate. Price: Negotiable." }
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
