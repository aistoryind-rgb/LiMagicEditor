const fs = require('fs');
const path = require('path');

const clothingPath = path.join(__dirname, '..', 'clothing.json');
const data = JSON.parse(fs.readFileSync(clothingPath, 'utf8'));

const newAccessories = [
    "accessory",
    "Ak-47 Chain",
    "black voron shoulder accessory",
    "Bracelet",
    "Chain",
    "Chain With Star Pendant",
    "Clown Chain",
    "Eagle Necklace",
    "El Primo Corazon Krawl On The Shoulder Accessory",
    "Fluorescent Cat Ears",
    "glowing nails",
    "Hamster On The Shoulder Accessory",
    "Leon Krawl On The Shoulder Accessory",
    "Lovely Bird Egg On The Shoulder Accessory",
    "Necklace",
    "Neon Rabbit Ears",
    "Owl On The Shoulder Accessory",
    "Scarf",
    "Six-Tailed Fox On The Shoulder Accessory",
    "Strong Chicken On The Shoulder Accessory",
    "Tie",
    "Toothless Dragon On The Shoulder Accessory",
    "beads accessory",
    "Onelove Chain"
];

// Update female accessories
newAccessories.forEach(acc => {
    if (!data.female.ACCESSORY.includes(acc)) {
        data.female.ACCESSORY.push(acc);
    }
});

// Update male accessories
newAccessories.forEach(acc => {
    if (!data.male.ACCESSORY.includes(acc)) {
        data.male.ACCESSORY.push(acc);
    }
});

fs.writeFileSync(clothingPath, JSON.stringify(data, null, 4), 'utf8');
console.log("clothing.json updated successfully via Node.js!");
