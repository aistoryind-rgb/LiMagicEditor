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

console.log("Running pipeline for test 16...");
const context = {
    raw: "Sling \"Bravado Viper 2008\" with par confin and drift kit. Price: Negable.",
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
console.log("Done!", context.finalText);
process.exit(0);
