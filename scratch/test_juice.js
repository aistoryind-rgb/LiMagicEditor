const fs = require('fs');
const path = require('path');
global.window = global;
global.customSpelling = {};
global.customTemplates = [];
global.localStorage = { getItem: () => null, setItem: () => {} };
global.setInterval = () => {};
global.setTimeout = () => {};
global.document = {
    addEventListener: () => {},
    getElementById: (id) => {
        return {
            value: "",
            textContent: "",
            classList: { add: () => {}, remove: () => {} },
            setAttribute: () => {},
            addEventListener: () => {},
            querySelector: () => ({ textContent: "", innerHTML: "" })
        };
    }
};

// Load the compiled code
const appCode = fs.readFileSync(path.join(__dirname, '../app.js'), 'utf8');
eval(appCode);

const ctx = {
    raw: "selling pumpkin plantation with 10 beds 1.3 million",
    phoneNumber: "",
    actionOverride: "auto",
    status: "passed",
    rejectionReason: "",
    blacklistReason: "",
    logs: [],
    category: "Businesses",
    finalText: "",
    priceInfo: null
};

// Create a custom version of runValidationPipeline for testing
const testRunPipeline = (raw) => {
    console.log("0. START raw:", raw);
    let text = raw.replace(/\s+/g, ' ').trim();
    console.log("1. After whitespace replace:", text);
    
    text = correctSpelling(text, ctx);
    console.log("2. After correctSpelling:", text);
    
    text = normalizePricesInText(text);
    console.log("3. After normalizePricesInText:", text);
    
    let action = detectActionFromText(text) || "Selling";
    console.log("4. Detected Action:", action);
    
    ctx.category = detectCategory(text);
    console.log("5. Detected Category:", ctx.category);
    
    parsePriceAndBudget(text, action, ctx);
    console.log("6. Matched prices in ctx.priceMatches:", ctx.priceMatches);
    
    let adBody = cleanPriceKeywords(text, ctx);
    console.log("7. After cleanPriceKeywords:", adBody);
    
    const processedBody = runValidationPipeline(ctx, "auto");
    console.log("8. PROCESSED BODY:", processedBody);
    console.log("9. PRICE INFO:", ctx.priceInfo);
    
    let mainSentence = `${ctx.action} ${processedBody}`.trim();
    mainSentence = mainSentence.charAt(0).toUpperCase() + mainSentence.slice(1);
    let pricePart = ctx.priceInfo ? ` ${ctx.priceInfo.type}: ${ctx.priceInfo.value}.` : " Price: Negotiable.";
    let finalAd = `${mainSentence}.${pricePart}`.replace(/\.\.+/g, '.').replace(/\s+/g, ' ').trim();
    console.log("10. ASSEMBLED AD:", finalAd);
};

testRunPipeline(ctx.raw);

