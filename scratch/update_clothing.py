import json

path = r"c:\Users\Max\Documents\Anti_Gravity_02\AI BUILD\clothing.json"

with open(path, "r", encoding="utf-8") as f:
    data = json.load(f)

# List of missing premium accessories to add
new_accessories = [
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
]

# Ensure female.ACCESSORY has them (already added some but let's make it fully consistent)
for acc in new_accessories:
    if acc not in data["female"]["ACCESSORY"]:
        data["female"]["ACCESSORY"].append(acc)

# Ensure male.ACCESSORY has them
for acc in new_accessories:
    if acc not in data["male"]["ACCESSORY"]:
        data["male"]["ACCESSORY"].append(acc)

# Save back with beautiful formatting
with open(path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=4, ensure_ascii=False)

print("clothing.json updated successfully!")
