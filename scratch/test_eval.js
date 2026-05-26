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

console.log("Loading app.js...");
const appJsPath = path.join(__dirname, '..', 'app.js');
const appJsContent = fs.readFileSync(appJsPath, 'utf8');
console.log("Loaded. Evaluating app.js...");
eval(appJsContent);
console.log("Evaluated successfully!");
process.exit(0);
