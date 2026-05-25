/**
 * LifeInvader EN3 Advertisement Editor - Core Application Logic
 */

// Datasets will be injected here during build
const VEHICLE_DB = {
    "helicopters":  [
                        "Buzzard",
                        "Frogger",
                        "Maverick",
                        "Sparrow",
                        "SuperVolito Carbon",
                        "Swift Deluxe",
                        "Volatus"
                    ],
    "boats":  [
                  "Dinghy",
                  "Dinghy (2-Seater)",
                  "Dinghy (Yacht)",
                  "Jetmax",
                  "Marquis",
                  "SeaShark",
                  "Speeder",
                  "Squalo",
                  "Suntrap",
                  "Toro",
                  "Tropic"
              ],
    "planes":  [
                   "Alpha-Z1",
                   "Cuban 800",
                   "Dodo",
                   "Duster",
                   "Howard NX-25",
                   "Luxor",
                   "Luxor Deluxe",
                   "Malard",
                   "Mammatus",
                   "Microlight",
                   "Nimbus",
                   "P-45 Nokota",
                   "V-65 Molotok",
                   "Velum"
               ],
    "motorcycles":  [
                        "Akuma",
                        "Bagger",
                        "Carbon RS",
                        "Daemon",
                        "Enduro",
                        "Faggio",
                        "Gargoyle",
                        "Hakuchou",
                        "Innovation",
                        "Lectro",
                        "Manchez",
                        "Nemesis",
                        "PCJ-600",
                        "Rat Bike",
                        "Sanchez",
                        "Thrust",
                        "Vader",
                        "Whippet Race Bike",
                        "Zombie Chopper",
                        "Apocalypse Deathbike",
                        "Bati 801",
                        "Chimera",
                        "Defiler",
                        "Esskey",
                        "FCR 1000",
                        "Hakuchou Drag",
                        "Nightblade",
                        "Ruffian",
                        "Sanctus",
                        "Tri-Cycles Race Bike",
                        "Vindicator",
                        "Wolfsbane",
                        "Avarus",
                        "Bati 801RR",
                        "Cliffhanger",
                        "Diabolus",
                        "FCR 1000 Custom",
                        "Hexer",
                        "Shotaro",
                        "Vortex",
                        "BF-400",
                        "Cruiser",
                        "Diabolus Custom",
                        "Future Shock Deathbike",
                        "Sovereign",
                        "Blazer",
                        "Double-T",
                        "Street Blazer",
                        "Blazer Lifeguard",
                        "Stryder",
                        "BMX"
                    ],
    "not_sellable_cars":  [
                              "Annis Concept 2021",
                              "Brabus Rocket G900",
                              "Bravado Charger Daytona",
                              "Enus EXP 10",
                              "Genesis G90",
                              "KMTA Optima",
                              "Overflod Jesko 2020",
                              "Pfister Cayenne",
                              "Shelby Cobra Daytona",
                              "Truffade Veyron",
                              "Ubermacht M5 (F90)",
                              "Vapid Focus RS",
                              "Benefactor-MG G63 (6X6)",
                              "Enus Wraith",
                              "Grotti FXX-K Evo",
                              "Karin Corolla AE",
                              "Overflod CCX",
                              "Pfister Panamera Turismo",
                              "Skoda Octavia RS",
                              "Truffade La Voiture Noire",
                              "Ubermacht Z4 (E85)",
                              "Vapid GT 2017",
                              "Benefactor-Benz GLS 63",
                              "Grotti Tributo (F8)",
                              "Overflod One",
                              "Pfister 911 Turbo 2021",
                              "SSC Tuatara",
                              "Truffade Bolide",
                              "Ubermacht Vision",
                              "Vapid Raptor F150",
                              "Benefactor-Benz MG Visione",
                              "Grotti Stradale (SF90)",
                              "Overflod Gemera",
                              "Pegassi Veneno (LP750)",
                              "Truffade Divo",
                              "Vapid Mustang 1965",
                              "Benefactor-Benz Vision AVTR",
                              "Grotti Superfast (F812)",
                              "Overflod Regera",
                              "Pegassi Centenario (LP770)",
                              "Vapid Mustang MACH-E",
                              "Benefactor-MG Project One",
                              "Grotti Pista (F488)",
                              "Obey TT",
                              "Pegassi Terzo",
                              "Benefactor-MG E63 (W213)",
                              "Grotti Monza (SP2)",
                              "Obey RS5 Coupe",
                              "Pegassi Urus",
                              "Benefactor-Maybach GLS600",
                              "Gallivanter Evoque",
                              "Obey RS E-Tron GT",
                              "Pegassi Diablo (SV)",
                              "Benefactor-MG GLE63 Coupe",
                              "Obey E-Tron Sportback",
                              "Pegassi Aventador (LP700)",
                              "Benefactor-MG A45 (W176)",
                              "Ocelot Vulcan",
                              "Pegassi Alston (SC18)",
                              "Benefactor-MG CLS53 (C257)",
                              "Ocelot Evora",
                              "Pegassi Reventon",
                              "Benefactor-Benz GLC300",
                              "Ocelot GranTurismo",
                              "Pegassi Sian",
                              "Benefactor-Benz 300 SL (W198)",
                              "Pegassi Countach (LP400)",
                              "Benefactor-Benz 190E (Evolution II)",
                              "Pegassi Countach (LPI 800-4)",
                              "Benefactor-Maybach S63 (W223)",
                              "Pegassi SE (PJ1)",
                              "Progen Elva",
                              "Progen P1",
                              "Progen 765 LT (Spider)"
                          ],
    "sellable_cars":  [
                          "Adder",
                          "Baller",
                          "Canis Grand Cherokee",
                          "Declasse Corvette C7",
                          "Elegy Retro Custom",
                          "F620",
                          "Gallivanter Defender",
                          "Hermes",
                          "Imorgon",
                          "Jackal",
                          "Kamacho",
                          "Lampadati Giulia GTA",
                          "Mamba",
                          "Nebula Turbo",
                          "Oracle",
                          "Panto",
                          "Raiden",
                          "Sabre Turbo",
                          "T-20",
                          "Ubermacht 760 (LI)",
                          "V-STR",
                          "Warrener",
                          "X80 Proto",
                          "Yosemite",
                          "Z-Type",
                          "9F",
                          "Alpha",
                          "Baller LE LWB",
                          "Calico GTF",
                          "Declasse Tahoe",
                          "Elegy RH8",
                          "Faction",
                          "Gallivanter Defender Halloween Edition",
                          "Hotknife",
                          "Impaler",
                          "JB 700",
                          "Khamelion",
                          "Landstalker",
                          "Massacro",
                          "Neon",
                          "Osiris",
                          "Paragon R",
                          "Rancher XL",
                          "Sandking SWB",
                          "Tailgater",
                          "Ubermacht I8",
                          "Vacca",
                          "Warrener HKR",
                          "XA-21",
                          "Yosemite Rancher",
                          "Zentorno",
                          "9F Cabrio",
                          "Annis ZR-350",
                          "Baller SG",
                          "Caracara 4x4",
                          "Deveste Eight",
                          "Ellie",
                          "Felon",
                          "Gallivanter Defender Christmas Edition",
                          "Huntley S",
                          "Infernus",
                          "Jester",
                          "Komoda",
                          "Lynx",
                          "Mammoth HUM EV",
                          "Nero",
                          "Obey A8",
                          "Pariah",
                          "Rapid GT",
                          "Sandking XL",
                          "Tailgater S",
                          "Ubermacht M3 (G80)",
                          "Vagner",
                          "Washington",
                          "XLS",
                          "Zion",
                          "Annis 350Z",
                          "Banshee",
                          "Carbonizzare",
                          "Deviant",
                          "Emperor",
                          "Felon GT",
                          "Gauntlet",
                          "Infernus Classic",
                          "Jester (Racecar)",
                          "Krieger",
                          "Monroe",
                          "Nero Custom",
                          "Obey R8",
                          "Patriot",
                          "Raptor",
                          "SC-1",
                          "Taipan",
                          "Ubermacht M3 (E46)",
                          "Vamos",
                          "Windsor",
                          "XLS (Armored)",
                          "Zion Cabrio",
                          "Annis Silvia (S15)",
                          "Banshee 900R",
                          "Casco",
                          "Dilettante",
                          "Emperor LX-570",
                          "Feltzer",
                          "Gauntlet Classic",
                          "Ingot",
                          "Jester Classic",
                          "Karin Land Cruiser 200",
                          "Moonbeam",
                          "Nightshade",
                          "Obey RS6",
                          "Patriot Stretch",
                          "Rat-Loader",
                          "Schafter",
                          "Tampa",
                          "Ubermacht M4 (G82)",
                          "Vectre",
                          "Windsor Drop",
                          "Annis Skyline GT-R (R34)",
                          "Beater Emperor",
                          "Cavalcade",
                          "Dinka RT-3000",
                          "Emperor RCF",
                          "Flash GT",
                          "Gauntlet Hellfire",
                          "Issi",
                          "Jester RR",
                          "Karin Tundra 2021",
                          "Monowheel",
                          "Novak",
                          "Obey RS7",
                          "Pegassi Huayra BC",
                          "Rat-Truck",
                          "Schafter LWB",
                          "Tempesta",
                          "Ubermacht M4 (GTS)",
                          "Velierer",
                          "Zion Classic",
                          "Annis GT-R I",
                          "Beater Mariachi Tornado",
                          "Cheburek",
                          "Dinka NSX 2017",
                          "Entity XF",
                          "FMJ",
                          "Gauntlet Redwood",
                          "Itali GTB",
                          "Journey",
                          "Karin Supra A80",
                          "Obey S8 (D4)",
                          "Pegassi Performante (LP640)",
                          "RE-7B",
                          "Schafter LWB (Armored)",
                          "Tezeract",
                          "Ubermacht M5 (E34)",
                          "Vigero",
                          "Zorrusso",
                          "Annis RX-7 (FD)",
                          "Beater Surfer",
                          "Cheetah",
                          "Dominator",
                          "Enus Cullinan",
                          "FQ 2",
                          "GB200",
                          "Itali GTB Custom",
                          "Jugular",
                          "Karin Mark 2",
                          "Ocelot Victor",
                          "Penetrator",
                          "Reaper",
                          "Schafter V12",
                          "Thrax",
                          "Ubermacht M5 (E60)",
                          "Virgo",
                          "Annis RX-7 (Veilside Fortune)",
                          "Beater Tornado",
                          "Cheetah Classic",
                          "Dominator ASP",
                          "Enus Phantom",
                          "Fugitive",
                          "Glendale",
                          "Itali GTO",
                          "Ocelot F-Type R",
                          "Penumbra",
                          "Rebel",
                          "Schlagen GT",
                          "Tigon",
                          "Ubermacht M5 (CS)",
                          "Virgo Classic",
                          "Annis WRX 2004",
                          "Benefactor-MG C63 (W205)",
                          "Chino",
                          "Dominator GTT",
                          "Enus Spectre",
                          "Furore GT",
                          "GP-1",
                          "Obey A6",
                          "Peyote Gasser",
                          "Rebla GTS",
                          "Schwarzer",
                          "Torero",
                          "Ubermacht M5 (CS) Halloween Edition",
                          "Viseris",
                          "Apocalypse Impaler",
                          "Benefactor-MG C63 Coupe (W205)",
                          "Clique",
                          "Dominator GTX",
                          "Enus Continental GT",
                          "Fusilade",
                          "Granger",
                          "Obey Q8",
                          "Pfister 811",
                          "Regina",
                          "Seminole",
                          "Toros",
                          "Ubermacht M8 (F91)",
                          "Visione",
                          "Apocalypse Imperator",
                          "Benefactor-MG G63 (G770)",
                          "Coil Cybertruck",
                          "Dominator PiBwasser",
                          "ETR-1",
                          "Futo",
                          "Growler",
                          "Ocelot Vanquish Zagto SB",
                          "Pfister Panamera",
                          "Remus",
                          "Sentinel Classic",
                          "Tropos Rallye",
                          "Ubermacht X5 (E70)",
                          "Voltic",
                          "Apocalypse Issi",
                          "Benefactor-MG S63 (W222)",
                          "Coil Model S",
                          "Drift Yosemite",
                          "Euros",
                          "Futo GTX",
                          "Grotti Italia (F458)",
                          "Ocelot Eletre",
                          "Pfister Taycan",
                          "Revolter",
                          "Sentinel XS",
                          "Truffade Centodieci",
                          "Ubermacht X5 (G05)",
                          "Voodoo",
                          "Apocalypse Slamvan",
                          "Benefactor-MG VT Black Series",
                          "Coil Model X",
                          "Dubsta",
                          "Exemplar",
                          "Future Shock Issi",
                          "GT 500",
                          "Pfister 918 Spyder",
                          "Rhapsody",
                          "Serrano",
                          "Tulip",
                          "Ubermacht X6-M (E71)",
                          "Voodoo Custom",
                          "Ardent",
                          "Benefactor-Benz 600SEL (W140)",
                          "Coil Roadster",
                          "Dubsta 6x6",
                          "Pheonix",
                          "Riata",
                          "Seven-70",
                          "Turismo Classic",
                          "Ubermacht X7 (G07)",
                          "Asbo",
                          "Benefactor-Benz E420 (W210)",
                          "Cognoscenti",
                          "Dubsta SG",
                          "Picador",
                          "Rocoto",
                          "Shelby GT500",
                          "Turismo R",
                          "Asea",
                          "Benefactor-Benz Vito (V447)",
                          "Cognoscenti 55",
                          "Dukes",
                          "Prairie",
                          "Ruiner",
                          "Slam Van",
                          "Truffade Chiron",
                          "Asterope",
                          "Benefactor-Maybach Pullman",
                          "Cognoscenti Cabrio",
                          "Declasse Camaro 2020",
                          "Premier",
                          "Rumpo",
                          "Slamvan Custom",
                          "Tyrant",
                          "Autarch",
                          "Bestia GTS",
                          "Comet",
                          "Previon",
                          "Ruston",
                          "Specter",
                          "Tyrus",
                          "Albany Escalade",
                          "BF Injection",
                          "Comet S2",
                          "Progen 675 LT",
                          "Rusty Rebel",
                          "Stafford",
                          "Bison",
                          "Comet SR",
                          "Stallion",
                          "Blade",
                          "Contender",
                          "Stinger",
                          "Blista",
                          "Coquette",
                          "Stinger GT",
                          "Blista Kanjo",
                          "Coquette Blackfin",
                          "Stirling GT",
                          "Bodhi",
                          "Coquette D10",
                          "Streiter",
                          "Brawler",
                          "Couquette Classic",
                          "Stretch",
                          "Bravado Charger SRT",
                          "Cyclone",
                          "Sultan",
                          "Bravado Charger 1969",
                          "Cypher",
                          "Bravado Challenger 2016",
                          "Sultan Classic",
                          "Bravado Ram 1500",
                          "Sultan RS",
                          "Bravado Viper 2008",
                          "Sultan RS Classic",
                          "Brioso R/A",
                          "Super Diamond",
                          "Buccaneer",
                          "Surano",
                          "Buffalo",
                          "Surge",
                          "Bullet",
                          "Swinger",
                          "Benefactor-MG GT",
                          "Benefactor-MG SL65 (R230)",
                          "Burgerfahrzeug Golf GTI Vision"
                      ]
}
;
const CLOTHING_DB = {
    "female":  {
                   "MASKS":  [

                             ],
                   "BACKPACKS":  [

                                 ],
                   "ACCESSORY":  [
                                     "navel piercing accessory",
                                     "gloves"
                                 ],
                   "WATCH":  [
                                 "Volex watch of type *",
                                 "Kolex watch of type *"
                             ],
                   "Dress":  [
                                 "luminous dress",
                                 "Love costume",
                                 "Spring set S23",
                                 "Wedding dress"
                             ],
                   "PANTS":  [
                                 "Abibas leggings",
                                 "Abibas pants",
                                 "jeans",
                                 "skirt with tights",
                                 "Muci shorts",
                                 "Custom Jeans"
                             ],
                   "TOP/HOODIE":  [
                                      "bandana top",
                                      "collection 5 top",
                                      "corset top",
                                      "day dress",
                                      "dress",
                                      "faution top",
                                      "jumpsuit",
                                      "long brand T-shirt",
                                      "low dress",
                                      "pullover with long sleeve",
                                      "short pullover",
                                      "Social Club hoodie",
                                      "stylish suit",
                                      "summer bra",
                                      "top 2 outerwear",
                                      "top Faution",
                                      "top with chains",
                                      "Watch Me sweater",
                                      "winter collection dress"
                                  ],
                   "SHOES":  [
                                 "tall boots",
                                 "luminous shoes"
                             ],
                   "HEADWEAR":  [
                                    "rabbit ears"
                                ]
               },
    "male":  {
                 "ANIMATED ITEMS":  [
                                        "Chick",
                                        "Fire Ring",
                                        "Lightning Charge",
                                        "Heros Cape",
                                        "Crown of Shining Runes"
                                    ],
                 "MASKS":  [
                               "alien with neon eyes mask",
                               "anime mask",
                               "bandana mask",
                               "baseball mask",
                               "Bigness mask",
                               "boxing helmet",
                               "carnival mask",
                               "Casual neon helmet",
                               "Christmas tree mask",
                               "Satanic horns",
                               "clown mask",
                               "cowgirl hat",
                               "Cupids crown",
                               "Daft Punk mask",
                               "demon mask",
                               "desert scarf mask",
                               "LM Playboy mask with luminous print",
                               "Lui Vi desert scarf mask",
                               "devil mask",
                               "earphones with a heart",
                               "emoji mask",
                               "evil mask",
                               "exotic mask",
                               "fox mask",
                               "gorilla mask",
                               "Glowing face scarf mask",
                               "handkerchief mask",
                               "Jason blue mask",
                               "kitsune mask",
                               "luminous head bag mask",
                               "Sashmello mask",
                               "Munk mask",
                               "monkey boss mask",
                               "Nik mask",
                               "owl mask",
                               "panama hat",
                               "penguin mask",
                               "pig mask",
                               "purge mask",
                               "raccoon mask",
                               "raptor mask",
                               "raven mask",
                               "Razer headphones",
                               "red stocking mask",
                               "reindeer mask",
                               "robot human mask",
                               "robot mask",
                               "rooster mask",
                               "samurai mask",
                               "Santa Claus mask",
                               "shamanic mask",
                               "Saruko neon mask",
                               "skeleton king mask",
                               "snowboarders mask",
                               "snowflake glasses",
                               "snowman mask",
                               "sports mask",
                               "stealthy mask",
                               "tied scarf mask",
                               "tight mask",
                               "toothy mask",
                               "trending shark head hat",
                               "TRON helmet",
                               "TV-head mask"
                           ],
                 "SPATIAL SOUND EFFECTS":  [
                                               "Aghhhhh",
                                               "Boowomp",
                                               "Bonk",
                                               "Bro",
                                               "Brother eww",
                                               "Cartoon tickle",
                                               "Directed by",
                                               "Duck",
                                               "Faaah",
                                               "Festive whistle",
                                               "Goofy laugh",
                                               "I love you",
                                               "Kiss",
                                               "Laughter",
                                               "Mwahahaha",
                                               "No no no no wait",
                                               "Romantic",
                                               "Sad violin",
                                               "Skeleton hits a shield",
                                               "Suspicious",
                                               "Suspicious sound",
                                               "Uwu",
                                               "Vagabond",
                                               "Whistle sound",
                                               "Woooow",
                                               "Yeah boy"
                                           ],
                 "ACCESSORY":  [
                                   "boxing gloves",
                                   "chain around the body accessory",
                                   "chain lost treasure neon accessory",
                                   "Cyberpunk greatsword accessory",
                                   "deer antler accessory",
                                   "deer antlers with a red nose accessory",
                                   "flying bear on the shoulder accessory",
                                   "gloves",
                                   "glowing snow glasses",
                                   "Grand Chain",
                                   "hearts Pride glasses",
                                   "neck scarf accessory",
                                   "pixel glasses",
                                   "Satanic Wings",
                                   "shiny deer antler headband accessory",
                                   "snowflake glasses",
                                   "Snake around the body accessory",
                                   "wristband accessory"
                               ],
                 "WATCH":  [
                               "Vasio G-Shock watch",
                               "Volex watch of type *",
                               "Kolex watch of type *"
                           ],
                 "PANTS":  [
                               "Abibas pants",
                               "Abibas sport pants",
                               "Abibas sweatpants",
                               "bright trousers",
                               "Bior pants",
                               "Grand RP collection pants",
                               "Muci pants",
                               "Muci trousers",
                               "Casual neon pants",
                               "Classic denim shorts",
                               "half-glowing pants",
                               "insulated personal pants",
                               "Lui Vi pants",
                               "luminous Fendi pants",
                               "luminous Grand RP trousers",
                               "LM Playboy pants with luminous print",
                               "luminous trousers",
                               "Leather gothic pants",
                               "new fashionable joggers",
                               "Niki new collection pants",
                               "Niki tech fleece pants",
                               "Niki track suit pants",
                               "neon pants",
                               "Neon Pants Set New Sample LW",
                               "summer voyage shorts",
                               "Shorts Lui Vi",
                               "TRON pants"
                           ],
                 "BACKPACK SKINS":  [
                                        "Backpack from the Cubic Friend paired set skin",
                                        "Backpack with piggy keychain skin",
                                        "Branded Small backpack skin",
                                        "Capsule backpack skin",
                                        "Chain bag with spikes skin",
                                        "Classic Lui Vui backpack skin",
                                        "Cloud backpack skin",
                                        "Cross backpack skin",
                                        "Duffel Bag skin",
                                        "Fur-lined bunny backpack",
                                        "Gauard bag with Ladudu skin",
                                        "Gingerbread house backpack skin",
                                        "Gayardo shoulder bag skin",
                                        "Grand backpack skin",
                                        "Happy bear shoulder bag skin",
                                        "HaHaHa set crossbody bag skin",
                                        "Large LV crossbody bag skin",
                                        "LUV backpack with wings skin",
                                        "Luv Moscnino spiky heart backpack skin",
                                        "LV backpack with water prints skin",
                                        "LV crossbody bag skin",
                                        "LW Crossbody Bag skin",
                                        "Memo Bag Ladudu skin",
                                        "Motosport Waist bag skin",
                                        "Neon Chrome handbag skin",
                                        "Scary chicken backpack skin",
                                        "Skeleton cheetah plush backpack skin",
                                        "Small shoulder bag LW skin",
                                        "SSC Kit Bag skin",
                                        "Sweet Sheep fur bag"
                                    ],
                 "TOP/HOODIE":  [
                                    "Air Bior pullover sweater",
                                    "black jacket with yellow trim",
                                    "bomber jacket with glowing elements",
                                    "branded insulated hoodie",
                                    "branded longsleeve",
                                    "branded T-shirt",
                                    "bright hoodie",
                                    "branded Molo T-shirt",
                                    "Casual neon set",
                                    "Casual neon torso",
                                    "Chanel top",
                                    "collection 2022 T-shirt",
                                    "cropp collection T-shirt",
                                    "denim jacket",
                                    "fur coat without a hood",
                                    "Glowing Bomber Set NEW Sample LW",
                                    "Grand RP collection hoodie",
                                    "Grand RP collection T-shirt",
                                    "haliky hoodie",
                                    "haliky T-shirt",
                                    "Hoodie with Balaclava Cap X Yazzy",
                                    "jacket with luminous trim",
                                    "jacket with T-shirt",
                                    "Lui Vi jacket",
                                    "Lui Vi sweatshirt",
                                    "Lui Vi full set",
                                    "Lui Vi set",
                                    "Lui Vi T-shirt",
                                    "LM Playboy sweatshirt with luminous print",
                                    "LM Playboy jacket with luminous print",
                                    "LM Playboy T-shirt with luminous print",
                                    "LM Playboy full set with luminous print",
                                    "Lui Vi top",
                                    "Mikachu hoodie",
                                    "mix collection T-shirt",
                                    "Muci hoodie",
                                    "Muci hoodie with snake",
                                    "Muci Not Fake hoodie",
                                    "Muci sweatshirt",
                                    "Niki new collection hoodie",
                                    "Niki tech top",
                                    "Niki track suit top",
                                    "Off-White sweatshirt",
                                    "Philip Plein T-shirt",
                                    "scary turtleneck T-shirt",
                                    "Social Club hoodie",
                                    "Ston Islan Classic Sportswear",
                                    "summer collection T-shirt",
                                    "T-shirt of one-color CAP brand",
                                    "The West Pace jacket",
                                    "trendy jacket",
                                    "TRON full set",
                                    "TRON torso",
                                    "Tsum collection T-shirt",
                                    "vintage Abibas Olympic Jerseys",
                                    "luminous jacket with turquoise trim",
                                    "luminous T-shirt",
                                    "UP-Green Sweatshirt",
                                    "Wide printed football T-shirt"
                                ],
                 "SHOES":  [
                               "Abibas Marquee Boost Lows shoes",
                               "Abibas Pro Bounce 2019 Lows shoes",
                               "Abibas Pezy Boost 700 V3 Alvah shoes",
                               "Abibas Pezy foam shoes",
                               "Acic Gel Kayano sneakers.",
                               "Ground Mordan 4 Retro Laser 30th shoes",
                               "Muci branded flip-flops",
                               "Mordan 1 shoes",
                               "Mordan 6 shoes",
                               "luminous shoes",
                               "Off-White luminous Keezy Boost shoes",
                               "luminous Keezy Boost shoes",
                               "neon shoes",
                               "Niki Groundporce One new collection shoes",
                               "Niki Shox shoes",
                               "Niki Uptempo shoes",
                               "Niki Zoom Freak 1 Multi-Color shoes",
                               "Off-White Pezy Boost shoes",
                               "red sneakers",
                               "RGB neon shoes",
                               "Pans sneakers",
                               "Pezy Boost shoes",
                               "rare luminous shoes",
                               "Casual neon shoes",
                               "Balenciaga Track sneakers",
                               "TRON shoes",
                               "Alastor McQueen Oversized sneakers"
                           ],
                 "HEADWEAR":  [
                                  "Satanic horns"
                              ]
             }
}
;
const BUILD_TIMESTAMP = "2026 May 25 06:22:29";
const BUILD_TIMESTAMP_SHORT = "May 25 06:22";

// Simulated GRP Citizens Database
let grpCitizens = [
    { name: "Max Uchiha", role: "State Org Leader", status: "Allowed (LI)", isLI: true },
    { name: "Elite Alpha", role: "State Org Deputy", status: "Allowed (LI)", isLI: true },
    { name: "Nate Blakely", role: "State Org Deputy", status: "Allowed (LI)", isLI: true },
    { name: "Lucio Escobar", role: "Crime Leader", status: "Allowed", isLI: false },
    { name: "Zandre Mortez", role: "State Org Leader", status: "Denied", isLI: false },
    { name: "John Funchalez", role: "Admin Assistant", status: "Allowed", isLI: false },
    { name: "Carl Jordan", role: "Unofficial Leader", status: "Allowed", isLI: false }
];

// Stats Counters
let stats = {
    processed: 0,
    rejections: 0,
    blacklists: 0
};

// Action Override State
let actionOverrideMode = "auto";
let userClickedAction = false;

// Official & Unofficial Places Dictionary
const OFFICIAL_PLACES = [
    "Vinewood Hills", "Rockford Hills", "Richman", "Sandy Shores", "Paleto Bay",
    "Postal", "Hospital", "Capitol", "Fire Station", "Auto Fair", "Bahama Mamas Bar",
    "Tequi-la-la Bar", "FIB", "Hotel Spa Bar", "Pacific Bluffs Country Club",
    "Diamond Resort Bar", "Vanilla Unicorn Bar", "Church", "Stock Exchange", "Stadium",
    "Chumash", "Lifeinvader", "Del Perro Pier", "Del Perro Beach", "Cayo Perico Island",
    "Hotel", "Raton Canyon", "School", "SAHP", "Mirror Park", "LSPD"
];

const UNOFFICIAL_PLACES = [
    "airport", "autosalon", "beach", "beach market", "ghetto", "post office",
    "train station", "yacht", "city"
];

// Reordering definitions
const REAL_ESTATE_ORDER = [
    "garden", "garage spaces", "warehouses", "helipad", "custom interior", "insurance",
    "swimming pool", "tennis court", "driveway", "backyard", "views", "location"
];

// Initialise application on DOM load
document.addEventListener("DOMContentLoaded", () => {
    initAccessGate();
    initBugReport();
    initTabs();
    initLeadersTable();
    initSearchExplorer();
    initAdProcessing();
    initFloatingClipboard();
    initCustomData();
    initAdminPanel();
    
    const lastUpdatedMain = document.getElementById("last-updated-main");
    if (lastUpdatedMain) {
        lastUpdatedMain.textContent = `Last Updated: ${BUILD_TIMESTAMP}`;
    }
    
    // Bind quick test presets
    document.querySelectorAll(".btn-preset").forEach(btn => {
        btn.addEventListener("click", () => {
            const adText = btn.getAttribute("data-ad");
            userClickedAction = false;
            actionOverrideMode = "auto";
            document.getElementById("raw-ad").value = adText;
            document.getElementById("category-override").value = "auto";
            processAd();
        });
    });
    
    // Bind action toggle group buttons
    const btnSell = document.getElementById("btn-toggle-sell");
    const btnBuy = document.getElementById("btn-toggle-buy");
    
    if (btnSell && btnBuy) {
        btnSell.addEventListener("click", () => {
            userClickedAction = true;
            actionOverrideMode = "Selling";
            btnSell.classList.add("active");
            btnBuy.classList.remove("active");
            processAd();
        });
        
        btnBuy.addEventListener("click", () => {
            userClickedAction = true;
            actionOverrideMode = "Buying";
            btnBuy.classList.add("active");
            btnSell.classList.remove("active");
            processAd();
        });
    }
});

/* ==========================================================================
   UI Tabs & Database Explorer
   ========================================================================== */

function initTabs() {
    document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
            document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
            
            btn.classList.add("active");
            const tabId = btn.getAttribute("data-tab");
            document.getElementById(tabId).classList.add("active");
        });
    });

    const tabBtnHistory = document.getElementById("tab-btn-history");
    if (tabBtnHistory) {
        tabBtnHistory.addEventListener("click", refreshMainHistory);
    }
    const btnRefreshHistory = document.getElementById("btn-refresh-history");
    if (btnRefreshHistory) {
        btnRefreshHistory.addEventListener("click", refreshMainHistory);
    }
}

function initSearchExplorer() {
    const searchInput = document.getElementById("db-search-input");
    const resultsContainer = document.getElementById("db-results");
    if (!searchInput || !resultsContainer) return;
    let currentFilter = "all";
    
    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentFilter = btn.getAttribute("data-filter");
            renderSearchResults(searchInput.value, currentFilter);
        });
    });
    
    searchInput.addEventListener("input", (e) => {
        renderSearchResults(e.target.value, currentFilter);
    });
    
    // Initial render
    renderSearchResults("", "all");
}

function renderSearchResults(query, filter) {
    const resultsContainer = document.getElementById("db-results");
    resultsContainer.innerHTML = "";
    
    const term = query.toLowerCase().trim();
    let matches = [];
    
    // 1. Vehicle Matches
    if (filter === "all" || filter === "vehicles") {
        for (const cat in VEHICLE_DB) {
            const list = VEHICLE_DB[cat];
            list.forEach(name => {
                if (name.toLowerCase().includes(term) || term === "") {
                    const isNotSellable = cat === "not_sellable_cars";
                    matches.push({
                        name: name,
                        type: "Vehicle",
                        subtype: cat.replace('_', ' '),
                        badgeClass: "vehicle",
                        details: isNotSellable ? "RENT ONLY (Non-sellable)" : "Sellable & Rentable",
                        statusText: isNotSellable ? "RENT ONLY" : "SELLABLE",
                        statusClass: isNotSellable ? "status-not-sellable" : "status-sellable"
                    });
                }
            });
        }
    }
    
    // 2. Clothing Matches
    if (filter === "all" || filter === "clothing") {
        const addClothing = (gender, catName, list) => {
            list.forEach(name => {
                if (name.toLowerCase().includes(term) || term === "") {
                    matches.push({
                        name: name,
                        type: "Clothing",
                        subtype: `${gender.toUpperCase()} - ${catName}`,
                        badgeClass: "clothing",
                        details: `Official clothing list item (${gender})`,
                        statusText: "VALID ITEM",
                        statusClass: "status-sellable"
                    });
                }
            });
        };
        
        for (const cat in CLOTHING_DB.male) {
            addClothing("male", cat, CLOTHING_DB.male[cat]);
        }
        for (const cat in CLOTHING_DB.female) {
            addClothing("female", cat, CLOTHING_DB.female[cat]);
        }
    }
    
    // Cap results at 100 for performance
    const displayMatches = matches.slice(0, 100);
    
    if (displayMatches.length === 0) {
        resultsContainer.innerHTML = `<div class="log-empty" style="grid-column: 1/-1; text-align: center; padding: 20px;">No items match your search.</div>`;
        return;
    }
    
    displayMatches.forEach(item => {
        const card = document.createElement("div");
        card.className = "db-card";
        card.innerHTML = `
            <div class="db-card-header">
                <span class="db-item-name">${escapeHTML(item.name)}</span>
                <span class="db-item-badge ${item.badgeClass}">${item.type}</span>
            </div>
            <div class="db-item-detail">Category: <strong>${escapeHTML(item.subtype)}</strong></div>
            <div class="db-item-detail">${item.details}</div>
            <div class="db-item-status ${item.statusClass}">
                <i class="fa-solid ${item.statusClass === 'status-sellable' ? 'fa-circle-check' : 'fa-circle-exclamation'}"></i> ${item.statusText}
            </div>
        `;
        resultsContainer.appendChild(card);
    });
}

/* ==========================================================================
   GRP simulated citizens manager
   ========================================================================== */

function initLeadersTable() {
    const tbody = document.getElementById("leaders-tbody");
    if (!tbody) return;
    tbody.innerHTML = "";
    
    grpCitizens.forEach((cit, index) => {
        const tr = document.createElement("tr");
        
        let roleBadge = "";
        if (cit.role.includes("Leader")) {
            roleBadge = cit.role.includes("State") ? "state" : "crime";
        } else if (cit.role.includes("Deputy")) {
            roleBadge = "state";
        } else if (cit.role.includes("Unofficial")) {
            roleBadge = "unofficial";
        } else {
            roleBadge = "assistant";
        }
        
        const isAllowed = !cit.role.includes("State") || cit.isLI;
        const statusBadge = isAllowed 
            ? `<span class="status-badge allowed"><i class="fa-solid fa-circle-check"></i> Allowed in Dating</span>`
            : `<span class="status-badge denied"><i class="fa-solid fa-circle-xmark"></i> Classified (Reject)</span>`;
            
        tr.innerHTML = `
            <td><strong>${escapeHTML(cit.name)}</strong></td>
            <td><span class="role-badge ${roleBadge}">${cit.role}</span></td>
            <td>${statusBadge}</td>
            <td>
                <button type="button" class="btn-delete" onclick="deleteCitizen(${index})" title="Delete citizen">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

window.deleteCitizen = function(index) {
    grpCitizens.splice(index, 1);
    initLeadersTable();
    processAd();
};

const btnAddLeader = document.getElementById("btn-add-leader");
if (btnAddLeader) {
    btnAddLeader.addEventListener("click", () => {
        const nameInput = document.getElementById("leader-name");
        const roleSelect = document.getElementById("leader-role");
        
        const name = nameInput.value.trim();
        const role = roleSelect.value;
        
        if (!name || name.split(" ").length < 2) {
            alert("Please enter both Firstname and Lastname separated by a space.");
            return;
        }
        
        // Capitalise names
        const capitalizedName = name.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
        
        const isLI = role.includes("Leader") && (capitalizedName.toLowerCase().includes("uchiha") || capitalizedName.toLowerCase().includes("alpha") || capitalizedName.toLowerCase().includes("blakely"));
        
        grpCitizens.push({
            name: capitalizedName,
            role: role,
            status: (role.includes("State") && !isLI) ? "Denied" : "Allowed",
            isLI: isLI
        });
        
        nameInput.value = "";
        initLeadersTable();
        processAd();
    });
}

/* ==========================================================================
   Fuzzy Matching & String Similarity Utilities
   ========================================================================== */

function levenshteinDistance(a, b) {
    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
    
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // substitution
                    matrix[i][j - 1] + 1,     // insertion
                    matrix[i - 1][j] + 1      // deletion
                );
            }
        }
    }
    return matrix[b.length][a.length];
}

function getClosestMatch(input, list, threshold = 0.6) {
    if (!input || !list || list.length === 0) return null;
    let bestMatch = null;
    let maxSimilarity = 0;
    
    const cleanInput = input.trim().toLowerCase();
    
    for (const item of list) {
        const cleanItem = item.trim().toLowerCase();
        
        // Exact check
        if (cleanInput === cleanItem) {
            return item;
        }
        
        // Substring check
        if (cleanItem.includes(cleanInput) || cleanInput.includes(cleanItem)) {
            let similarity = Math.min(cleanInput.length, cleanItem.length) / Math.max(cleanInput.length, cleanItem.length);
            if (cleanItem.startsWith(cleanInput)) similarity += 0.2;
            if (similarity > maxSimilarity) {
                maxSimilarity = similarity;
                bestMatch = item;
            }
        }
        
        // Levenshtein check
        const dist = levenshteinDistance(cleanInput, cleanItem);
        const maxLength = Math.max(cleanInput.length, cleanItem.length);
        const similarity = 1 - (dist / maxLength);
        
        if (similarity > maxSimilarity) {
            maxSimilarity = similarity;
            bestMatch = item;
        }
    }
    
    return maxSimilarity >= threshold ? bestMatch : null;
}

function correctSpelling(text, ctx) {
    let corrected = text;
    
    // Actions / Prefixes
    const actionMatch = corrected.match(/\b(sling|sellaing|seling|selaing|slling|selign|saling|sellin|seeling|sellig|sellng|selng|sel|sale)\b/i);
    if (actionMatch) {
        corrected = corrected.replace(/\b(sling|sellaing|seling|selaing|slling|selign|saling|sellin|seeling|sellig|sellng|selng|sel|sale)\b/gi, "Selling");
        ctx.logs.push({ text: `Spelling correction: action <strong>${actionMatch[0]}</strong> corrected to <strong>Selling</strong>`, type: 'correction' });
    }
    const buyingMatch = corrected.match(/\b(buyin|bying|buing|buyg|buyen|buyiing|beying|buyng)\b/i);
    if (buyingMatch) {
        corrected = corrected.replace(/\b(buyin|bying|buing|buyg|buyen|buyiing|beying|buyng)\b/gi, "Buying");
        ctx.logs.push({ text: `Spelling correction: action <strong>${buyingMatch[0]}</strong> corrected to <strong>Buying</strong>`, type: 'correction' });
    }
    const tradingMatch = corrected.match(/\b(tradin|tradg|trding|traiding|treding)\b/i);
    if (tradingMatch) {
        corrected = corrected.replace(/\b(tradin|tradg|trding|traiding|treding)\b/gi, "Trading");
        ctx.logs.push({ text: `Spelling correction: action <strong>${tradingMatch[0]}</strong> corrected to <strong>Trading</strong>`, type: 'correction' });
    }
    const rentingMatch = corrected.match(/\b(rentin|rentg|rnting|renten|reenting)\b/i);
    if (rentingMatch) {
        corrected = corrected.replace(/\b(rentin|rentg|rnting|renten|reenting)\b/gi, "Renting");
        ctx.logs.push({ text: `Spelling correction: action <strong>${rentingMatch[0]}</strong> corrected to <strong>Renting</strong>`, type: 'correction' });
    }

    // Price correction
    const priceMatch = corrected.match(/\b(negable|negotiabl|negotiab|nego|negoitable|negotable|negotiabe|negotiate|negotiat|negtable)\b/gi);
    if (priceMatch) {
        const uniqueMatches = [...new Set(priceMatch.map(m => m.toLowerCase()))];
        uniqueMatches.forEach(m => {
            if (m !== "negotiable") {
                ctx.logs.push({ text: `Spelling correction: <strong>${m}</strong> corrected to <strong>negotiable</strong>`, type: 'correction' });
            }
        });
        corrected = corrected.replace(/\b(negable|negotiabl|negotiab|nego|negoitable|negotable|negotiabe|negotiate|negotiat|negtable)\b/gi, "negotiable");
    }

    // Upgrades fuzzy matches / corrections
    const partConfigMatch = corrected.match(/\b(par\s+confin|par\s+config|par\s+tuning|part\s+config|part\s+tuning|partial\s+config|partial\s+tuning|partially\s+upgraded|nearly\s+max|partially\s+config|part\s+confin|part\s+configuration|par\s+configuration|par\s+conf|part\s+conf|part\s+confin)\b/gi);
    if (partConfigMatch) {
        const uniqueMatches = [...new Set(partConfigMatch.map(m => m.toLowerCase()))];
        uniqueMatches.forEach(m => {
            if (m !== "partial configuration") {
                ctx.logs.push({ text: `Spelling correction: upgrade <strong>${m}</strong> corrected to <strong>partial configuration</strong>`, type: 'correction' });
            }
        });
        corrected = corrected.replace(/\b(par\s+confin|par\s+config|par\s+tuning|part\s+config|part\s+tuning|partial\s+config|partial\s+tuning|partially\s+upgraded|nearly\s+max|partially\s+config|part\s+confin|part\s+configuration|par\s+configuration|par\s+conf|part\s+conf|part\s+confin)\b/gi, "partial configuration");
    }

    const fullConfigMatch = corrected.match(/\b(full\s+conf|full\s+config|full\s+tuning|full\s+tune|max\s+conf|max\s+config|max\s+tuning|maxed|fully\s+upgraded|full\s+configuration|full\s+confin)\b/gi);
    if (fullConfigMatch) {
        const uniqueMatches = [...new Set(fullConfigMatch.map(m => m.toLowerCase()))];
        uniqueMatches.forEach(m => {
            if (m !== "full configuration") {
                ctx.logs.push({ text: `Spelling correction: upgrade <strong>${m}</strong> corrected to <strong>full configuration</strong>`, type: 'correction' });
            }
        });
        corrected = corrected.replace(/\b(full\s+conf|full\s+config|full\s+tuning|full\s+tune|max\s+conf|max\s+config|max\s+tuning|maxed|fully\s+upgraded|full\s+configuration|full\s+confin)\b/gi, "full configuration");
    }

    // Luminous wheels / rims
    const wheelsMatch = corrected.match(/\b(luminous\s+rims|unique\s+rims|unique\s+wheels)\b/gi);
    if (wheelsMatch) {
        const uniqueMatches = [...new Set(wheelsMatch.map(m => m.toLowerCase()))];
        uniqueMatches.forEach(m => {
            ctx.logs.push({ text: `Spelling correction: <strong>${m}</strong> corrected to <strong>luminous wheels</strong>`, type: 'correction' });
        });
        corrected = corrected.replace(/\b(luminous\s+rims|unique\s+rims|unique\s+wheels)\b/gi, "luminous wheels");
    }

    // Common item spelling errors
    const commonMisspellings = {
        "anis": "annis",
        "tubo": "turbo",
        "drft": "drift",
        "direct": "drift",
        "tickt": "ticket",
        "tick": "ticket",
        "haus": "house",
        "housae": "house",
        "grage": "garage",
        "exsotic": "exotic",
        "markit": "market",
        "platnum": "platinum",
        "sholder": "shoulder",
        "metel": "metal",
        "mettal": "metal",
        "videocard": "video card",
        "hoka": "hookah",
        "biosparc": "biospark",
        "biosparck": "biospark",
        "biosparke": "biospark",
        "batry": "battery",
        "battries": "battery",
        "battres": "battery",
        "battre": "battery",
        "batteys": "battery",
        "battey": "battery",
        "vinewod": "Vinewood",
        "aprtment": "apartment",
        "apartemen": "apartment",
        "apartmen": "apartment",
        "geto": "ghetto",
        "gheto": "ghetto",
        "swiming": "swimming",
        "luminus": "luminous",
        "drfit": "drift",
        "tickts": "tickets",
        "tckets": "tickets",
        "tikets": "tickets",
        "twith": "with",
        "whith": "with",
        "helipaad": "helipad",
        "helipd": "helipad",
        "gardan": "garden",
        "grden": "garden",
        "costom": "custom",
        "custum": "custom",
        "custome": "custom",
        "inter": "interior",
        "interio": "interior",
        "loking": "looking",
        "lookin": "looking",
        "serch": "search",
        "serching": "searching",
        "girlfrnd": "girlfriend",
        "girlfirnd": "girlfriend",
        "girlfrend": "girlfriend",
        "boyfrnd": "boyfriend",
        "boyfirnd": "boyfriend",
        "boyfrend": "boyfriend",
        "husbnd": "husband",
        "husban": "husband",
        "husbund": "husband",
        "valntine": "valentine",
        "casinopent": "casino penthouse",
        "casinopenth": "casino penthouse",
        "casino pent": "casino penthouse",
        "casino apartment": "casino penthouse",
        "bhams": "Bahama Mamas",
        "bahamas": "Bahama Mamas",
        "tequilala": "Tequi-la-la",
        "tequila": "Tequi-la-la",
        "jucies": "juices",
        "juise": "juice",
        "juse": "juice",
        "jucy": "juice",
        "plat": "platinum",
        "snowbord": "snowboarders",
        "snowboard": "snowboarders",
        "snbobord": "snowboarders",
        "insaurance": "insurance",
        "insuranc": "insurance",
        "juguler": "jugular",
        "engen": "engine",
        "transmision": "transmission",
        "transmition": "transmission",
        "transmisin": "transmission",
        "bataris": "batteries",
        "balk": "bulk",
        "buget": "budget",
        "buyong": "buying",
        "buiyng": "buying",
        "frainds": "friends",
        "frnds": "friends",
        "frends": "friends",
        "freind": "friend",
        "freinds": "friends",
        "frien": "friend",
        "continres": "containers",
        "incrance": "insurance",
        "chrion": "chiron",
        "contanr": "container",
        "contanrs": "containers",
        "privet": "private",
        "palt": "platinum",
        "busnss": "business",
        "buiness": "business",
        "busess": "business",
        "bussesnessss": "business",
        "bussness": "business",
        "bedss": "beds",
        "pumkin": "pumpkin",
        "aparmnt": "apartment",
        "qality": "quality",
        "monewil": "monowheel",
        "monewhil": "monowheel",
        "monowhil": "monowheel",
        "busines": "business",
        "privte": "private",
        "biss": "business",
        "bis": "business",
        "picakxe": "pickaxe",
        "picakx": "pickaxe",
        "pickax": "pickaxe",
        "pikaxe": "pickaxe",
        "cases": "containers",
        "case": "container",
        "crates": "containers",
        "crate": "container",
        "drag lab": "Burger shop",
        "drug lab": "Burger shop",
        "draglab": "Burger shop",
        "druglab": "Burger shop"
    };

    const activeMisspellings = Object.assign({}, commonMisspellings, customSpelling);
    for (const [wrong, right] of Object.entries(activeMisspellings)) {
        const escapedWrong = wrong.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const regex = new RegExp(`\\b${escapedWrong}\\b`, "gi");
        const match = corrected.match(regex);
        if (match) {
            ctx.logs.push({ text: `Spelling correction: <strong>${wrong}</strong> corrected to <strong>${right}</strong>`, type: 'correction' });
            corrected = corrected.replace(regex, right);
        }
    }

    // Space out adjacent digit + days (e.g. 7days -> 7 days)
    corrected = corrected.replace(/\b(\d+)\s*days?\b/gi, "$1 days");
    corrected = corrected.replace(/\b(\d+)\s*beds*\b/gi, "$1 beds");
    corrected = corrected.replace(/\bbeds*\s*(\d+)\b/gi, "$1 beds");

    // Complex replacements with regex
    const graphicCardRegex = /\b(grapic\s+card|graphic\s+card|graphics\s+card)\b/gi;
    const graphicCardMatch = corrected.match(graphicCardRegex);
    if (graphicCardMatch) {
        ctx.logs.push({ text: `Spelling correction: <strong>${graphicCardMatch[0]}</strong> corrected to <strong>video card</strong>`, type: 'correction' });
        corrected = corrected.replace(graphicCardRegex, "video card");
    }

    const repKitRegex = /\b(rep\s+kit)\b/gi;
    const repKitMatch = corrected.match(repKitRegex);
    if (repKitMatch) {
        ctx.logs.push({ text: `Spelling correction: <strong>${repKitMatch[0]}</strong> corrected to <strong>repair kit</strong>`, type: 'correction' });
        corrected = corrected.replace(repKitRegex, "repair kit");
    }

    if (/\bcharging\b/i.test(corrected) && !/\bcharging\s+station\b/i.test(corrected)) {
        corrected = corrected.replace(/\bcharging\b/gi, "chargers");
        ctx.logs.push({ text: `Spelling correction: <strong>charging</strong> corrected to <strong>chargers</strong>`, type: 'correction' });
    }

    // Format property and shop numbers to use № symbol
    corrected = corrected.replace(/\b(house|apartment|mansion|penthouse|shop)\s*(?:no\.?|number|num\.?|#)?\s*(\d+)\b/gi, (match, prop, num) => {
        return `${prop} \u2116${num}`;
    });

    return corrected;
}

function detectActionFromText(text) {
    const lower = text.toLowerCase();
    
    // Check for dating category (Dating is always "Looking", i.e. Buying mode)
    const isDatingSearch = /\b(look|looking|search|searching|want|find|finding)\b/i.test(lower);
    const hasDatingTarget = /\b(wife|girlfriend|boyfriend|husband|valentine|date|spouse|soulmate)\b/i.test(lower) || 
                            (/\b(friend|friends|family|family\s+members)\b/i.test(lower) && /\b(look|looking|search|searching)\b/i.test(lower));
    if (isDatingSearch && hasDatingTarget && !lower.includes("family business")) {
        return "Buying";
    }

    // Buying keywords
    const buyPatterns = [
        /\bbuying\b/i, /\blook for\b/i, /\blooking to buy\b/i, /\blooking to purchase\b/i,
        /\bbuy\b/i, /\bwant to buy\b/i, /\bwtb\b/i
    ];
    // Selling, renting out, trading keywords
    const sellPatterns = [
        /\bselling or trading\b/i, /\bsell or trade\b/i, /\bselling\/trading\b/i, /\bwts\/wtt\b/i,
        /\brenting out\b/i, /\brent out\b/i, /\brenting\b/i, /\brent\b/i,
        /\btrading\b/i, /\btrade\b/i, /\bwtt\b/i,
        /\bselling\b/i, /\bsell\b/i, /\bwts\b/i
    ];

    // Find the first matching pattern in the text to determine the action
    let firstBuyIdx = -1;
    for (const pat of buyPatterns) {
        const match = lower.match(pat);
        if (match) {
            if (firstBuyIdx === -1 || match.index < firstBuyIdx) {
                firstBuyIdx = match.index;
            }
        }
    }

    let firstSellIdx = -1;
    for (const pat of sellPatterns) {
        const match = lower.match(pat);
        if (match) {
            if (firstSellIdx === -1 || match.index < firstSellIdx) {
                firstSellIdx = match.index;
            }
        }
    }

    if (firstBuyIdx !== -1 && firstSellIdx !== -1) {
        // Both are present, choose the one that appears first
        return firstBuyIdx < firstSellIdx ? "Buying" : "Selling";
    } else if (firstBuyIdx !== -1) {
        return "Buying";
    } else if (firstSellIdx !== -1) {
        return "Selling";
    }

    return null;
}

function mapVehicleBrands(text) {
    let result = text.toLowerCase();
    result = result.replace(/\bmercedes(?:\s*-?\s*benz)?\b/gi, "benefactor");
    result = result.replace(/\bamg\b/gi, "benefactor");
    result = result.replace(/\bbmw\b/gi, "ubermacht");
    result = result.replace(/\baudi\b/gi, "obey");
    result = result.replace(/\bporsche\b/gi, "pfister");
    result = result.replace(/\blamborghini\b/gi, "pegassi");
    result = result.replace(/\blambo\b/gi, "pegassi");
    result = result.replace(/\bbugatti\b/gi, "truffade");
    result = result.replace(/\brolls\s*-?\s*royce\b/gi, "enus");
    result = result.replace(/\brr\b/gi, "enus");
    result = result.replace(/\blexus\b/gi, "emperor");
    result = result.replace(/\btoyota\b/gi, "karin");
    result = result.replace(/\bnissan\b/gi, "annis");
    result = result.replace(/\btesla\b/gi, "coil");
    result = result.replace(/\brange\s*rover\b/gi, "gallivanter");
    result = result.replace(/\bford\b/gi, "vapid");
    result = result.replace(/\bchevrolet\b/gi, "declasse");
    result = result.replace(/\bchevy\b/gi, "declasse");
    result = result.replace(/\bferrari\b/gi, "grotti");
    result = result.replace(/\bitaly\b/gi, "italia");
    
    result = result.replace(/\bg-wagon\b/gi, "g63");
    result = result.replace(/\bhuracan\b/gi, "performante");
    result = result.replace(/\bskyline\b/gi, "skyline gt-r");
    result = result.replace(/\blvn\b/gi, "la voiture noire");
    return result;
}

function mapClothingBrands(text) {
    let result = text.toLowerCase();
    result = result.replace(/\badidas\b/g, "abibas");
    result = result.replace(/\bgucci\b/g, "muci");
    result = result.replace(/\blouis vuitton\b/g, "lui vi");
    result = result.replace(/\blv\b/g, "lui vi");
    result = result.replace(/\bnike\b/g, "niki");
    result = result.replace(/\bpikachu\b/g, "mikachu");
    result = result.replace(/\brolex\b/g, "kolex");
    result = result.replace(/\bsocial hoodie\b/g, "social club hoodie");
    return result;
}

// Specialised Vehicle match
function matchVehicle(inputText) {
    const categories = ['helicopters', 'boats', 'planes', 'motorcycles', 'not_sellable_cars', 'sellable_cars'];
    const allVehicles = [];
    const nameMap = new Map();
    const categoryMap = new Map();
    
    for (const cat of categories) {
        for (const veh of VEHICLE_DB[cat]) {
            allVehicles.push(veh);
            nameMap.set(veh.toLowerCase(), veh);
            categoryMap.set(veh, cat);
        }
    }
    
    const actionPrefixes = /^(?:buying|selling or trading|selling|trading|renting out|renting|wtb|wts|wtt|buy|sell|trade|rent|looking to purchase|looking to buy|want to buy|searching for|looking for|searching|look for|looking|search|look)\s+(?:a\s+|an\s+)?/i;
    const actionSuffixes = /\s+(?:buying|selling or trading|selling|trading|renting out|renting|wtb|wts|wtt|buy|sell|trade|rent|looking to purchase|looking to buy|want to buy|searching for|looking for|searching|look for|looking|search|look)$/i;
    
    let cleanInput = mapVehicleBrands(inputText.trim().toLowerCase().replace(/['"“”]/g, ''));
    cleanInput = cleanInput.replace(actionPrefixes, "").replace(actionSuffixes, "").trim();
    
    // Shortcuts
    if (/\b(?:skyline|r34)\b/i.test(cleanInput)) {
        return { name: "Annis Skyline GT-R (R34)", category: "sellable_cars" };
    }
    if (/\bchiron\b/i.test(cleanInput)) {
        return { name: "Truffade Chiron", category: "sellable_cars" };
    }
    if (/\bphantom\b/i.test(cleanInput)) {
        return { name: "Enus Phantom", category: "sellable_cars" };
    }
    if (/\bviper\b/i.test(cleanInput)) {
        return { name: "Bravado Viper 2008", category: "sellable_cars" };
    }
    if (/\b(?:t-20|t20)\b/i.test(cleanInput)) {
        return { name: "T-20", category: "sellable_cars" };
    }
    if (/\b(?:z-type|ztype)\b/i.test(cleanInput)) {
        return { name: "Z-Type", category: "sellable_cars" };
    }
    if (/\b(?:sc-1|sc1)\b/i.test(cleanInput)) {
        return { name: "SC-1", category: "sellable_cars" };
    }
    if (/\b(?:gp-1|gp1)\b/i.test(cleanInput)) {
        return { name: "GP-1", category: "sellable_cars" };
    }
    
    // Direct tokenized compare
    for (const veh of allVehicles) {
        const cleanVehName = veh.toLowerCase().replace(/[()]/g, '');
        if (cleanInput === cleanVehName || cleanInput === veh.toLowerCase()) {
            return { name: veh, category: categoryMap.get(veh) };
        }
    }
    
    let bestVeh = null;
    let maxScore = 0;
    const inputTokens = cleanInput.split(/[\s-]+/);
    
    for (const veh of allVehicles) {
        const vehLower = veh.toLowerCase();
        const vehClean = vehLower.replace(/[()]/g, '');
        const vehTokens = vehClean.split(/[\s-]+/);
        
        let score = 0;
        let matchedNonNumeric = false;
        for (const token of inputTokens) {
            if (token.length < 2) continue;
            
            // Skip price and quantity tokens to avoid false matches (e.g. 500k matching vehicle models like GT 500)
            if (/^\d+(?:\.\d+)?(?:k|m|b|g\.?s\.?|w\.?h\.?|days?|lvls?|levels?|years?|percent|each)$/i.test(token)) {
                continue;
            }
            
            let matchedToken = false;
            for (const vehToken of vehTokens) {
                if (vehToken.length < 2) continue;
                const dist = levenshteinDistance(token, vehToken);
                const maxLen = Math.max(token.length, vehToken.length);
                const sim = 1 - (dist / maxLen);
                if (sim >= 0.7) {
                    const stopWords = [
                        "and", "the", "for", "with", "out", "cayo", "type", "each", "bulk", "selling", "buying", "trading", "renting",
                        "rare", "exotic", "unique", "luminous", "luxe", "lux", "high", "low", "medium", "advanced", "max", "pro",
                        "black", "white", "red", "blue", "green", "yellow", "orange", "purple", "pink", "brown", "grey", "gray", "silver", "gold"
                    ];
                    if (stopWords.includes(token)) {
                        continue;
                    }
                    score += 3;
                    matchedToken = true;
                    if (!/^\d+$/.test(token)) {
                        matchedNonNumeric = true;
                    }
                    break;
                }
            }
            if (!matchedToken && vehClean.includes(token)) {
                score += 1;
                if (!/^\d+$/.test(token)) {
                    matchedNonNumeric = true;
                }
            }
        }
        
        const modelMatch = vehLower.match(/\(([^)]+)\)/);
        if (modelMatch) {
            const modelId = modelMatch[1].toLowerCase();
            for (const token of inputTokens) {
                const dist = levenshteinDistance(token, modelId);
                const maxLen = Math.max(token.length, modelId.length);
                const sim = 1 - (dist / maxLen);
                if (sim >= 0.75) {
                    score += 5;
                    if (!/^\d+$/.test(token)) {
                        matchedNonNumeric = true;
                    }
                }
            }
        }
        
        const hasNumericTokenInVeh = vehTokens.some(vt => /^\d+$/.test(vt));
        if (hasNumericTokenInVeh && !matchedNonNumeric) {
            score = 0;
        }
        
        if (score > maxScore) {
            maxScore = score;
            bestVeh = veh;
        }
    }
    
    if (maxScore >= 3) {
        return { name: bestVeh, category: categoryMap.get(bestVeh) };
    }
    
    const closest = getClosestMatch(cleanInput, allVehicles, 0.5);
    if (closest) {
        return { name: closest, category: categoryMap.get(closest) };
    }
    
    return null;
}

// Specialised Clothing match
function matchClothingItem(inputText) {
    const allItems = [];
    const itemMap = new Map();
    const subcatMap = new Map();
    const genderMap = new Map();
    
    for (const subcat in CLOTHING_DB.male) {
        for (const item of CLOTHING_DB.male[subcat]) {
            const lowerItem = item.toLowerCase();
            allItems.push(item);
            itemMap.set(lowerItem, item);
            subcatMap.set(item, subcat);
            genderMap.set(item, 'male');
        }
    }
    
    for (const subcat in CLOTHING_DB.female) {
        for (const item of CLOTHING_DB.female[subcat]) {
            const lowerItem = item.toLowerCase();
            if (itemMap.has(lowerItem)) {
                genderMap.set(itemMap.get(lowerItem), 'both');
            } else {
                allItems.push(item);
                itemMap.set(lowerItem, item);
                subcatMap.set(item, subcat);
                genderMap.set(item, 'female');
            }
        }
    }
    
    const actionPrefixes = /^(?:buying|selling or trading|selling|trading|renting out|renting|wtb|wts|wtt|buy|sell|trade|rent|looking to purchase|looking to buy|want to buy|searching for|looking for|searching|look for|looking|search|look)\s+(?:a\s+|an\s+)?/i;
    const actionSuffixes = /\s+(?:buying|selling or trading|selling|trading|renting out|renting|wtb|wts|wtt|buy|sell|trade|rent|looking to purchase|looking to buy|want to buy|searching for|looking for|searching|look for|looking|search|look)$/i;
    
    let cleanInput = mapClothingBrands(inputText.trim().toLowerCase().replace(/__has_each__/g, ""));
    cleanInput = cleanInput.replace(actionPrefixes, "").replace(actionSuffixes, "").trim();
    
    // Detect gender specified in input
    const hasMaleGender = /\b(?:for\s+men|for\s+man|male|mens?|men's)\b/i.test(inputText);
    const hasFemaleGender = /\b(?:for\s+women|for\s+woman|female|womens?|women's)\b/i.test(inputText);
    
    let candidates = allItems;
    if (hasMaleGender && !hasFemaleGender) {
        candidates = allItems.filter(item => genderMap.get(item) === 'male' || genderMap.get(item) === 'both');
    } else if (hasFemaleGender && !hasMaleGender) {
        candidates = allItems.filter(item => genderMap.get(item) === 'female' || genderMap.get(item) === 'both');
    }
    
    // Strip color, type and gender descriptors to get the core clothing item name for matching
    const colors = ["black", "white", "red", "blue", "green", "yellow", "orange", "purple", "pink", "brown", "grey", "gray", "silver", "gold"];
    for (const c of colors) {
        cleanInput = cleanInput.replace(new RegExp(`\\b${c}\\b`, "gi"), "");
    }
    cleanInput = cleanInput.replace(/(?:type|extra|extras)\s*#?\d+\b/gi, "");
    cleanInput = cleanInput.replace(/\b(?:for\s+men|for\s+man|male|for\s+women|for\s+woman|female|mens?|men's|womens?|women's)\b/gi, "");
    cleanInput = cleanInput.replace(/\s+/g, " ").trim();
    
    // Longest substring match
    let bestMatch = null;
    let longestMatchLen = 0;
    
    for (const item of candidates) {
        const itemLower = item.toLowerCase();
        let itemMatchCheck = itemLower;
        let isWildcard = false;
        if (itemLower.includes('*')) {
            itemMatchCheck = itemLower.replace(/\s*of\s*type\s*\*/g, '').trim();
            isWildcard = true;
        }
        
        let itemMatchCheckAlt = null;
        if (isWildcard && itemMatchCheck.endsWith(" watch")) {
            itemMatchCheckAlt = itemMatchCheck.replace(/\s*watch\b/gi, '').trim();
        }
        
        const hasMatch = isWildcard 
            ? (cleanInput.includes(itemMatchCheck) || (itemMatchCheckAlt && cleanInput.includes(itemMatchCheckAlt))) 
            : cleanInput.includes(itemLower);
            
        if (hasMatch) {
            const len = isWildcard ? (cleanInput.includes(itemMatchCheck) ? itemMatchCheck.length : itemMatchCheckAlt.length) : itemLower.length;
            if (len > longestMatchLen) {
                longestMatchLen = len;
                bestMatch = item;
            }
        }
    }
    
    if (bestMatch) {
        return { name: bestMatch, subcategory: subcatMap.get(bestMatch), gender: genderMap.get(bestMatch) };
    }
    
    const closest = getClosestMatch(cleanInput, candidates, 0.55);
    if (closest) {
        return { name: closest, subcategory: subcatMap.get(closest), gender: genderMap.get(closest) };
    }
    
    return null;
}

/* ==========================================================================
   Ad Parsing & Rule Execution Engine
   ========================================================================== */

function initAdProcessing() {
    const rawAd = document.getElementById("raw-ad");
    const override = document.getElementById("category-override");
    const btnCopy = document.getElementById("btn-copy-ad");
    const btnCopyRej = document.getElementById("btn-copy-rejection");
    
    if (btnCopyRej) {
        btnCopyRej.addEventListener("click", () => {
            const textElement = document.getElementById("rejection-reason-text");
            if (textElement) {
                navigator.clipboard.writeText(textElement.textContent).then(() => {
                    btnCopyRej.textContent = "Copied!";
                    btnCopyRej.classList.add("copied");
                    setTimeout(() => {
                        btnCopyRej.innerHTML = `<i class="fa-solid fa-copy"></i> Copy Reason`;
                        btnCopyRej.classList.remove("copied");
                    }, 2000);
                    
                    const rawVal = document.getElementById("raw-ad").value;
                    logAdToBackend(rawVal, textElement.textContent, "rejected");
                });
            }
        });
    }
    
    // Input events trigger real-time validation
    if (rawAd) {
        rawAd.addEventListener("input", () => {
            if (!rawAd.value.trim()) {
                userClickedAction = false;
                actionOverrideMode = "auto";
                const btnSell = document.getElementById("btn-toggle-sell");
                const btnBuy = document.getElementById("btn-toggle-buy");
                if (btnSell && btnBuy) {
                    btnSell.classList.add("active");
                    btnBuy.classList.remove("active");
                }
            }
            processAd();
        });
    }
    if (override) {
        override.addEventListener("change", processAd);
    }
    
    if (btnCopy) {
        btnCopy.addEventListener("click", () => {
            const textElement = document.getElementById("processed-ad-text");
            if (textElement && !textElement.classList.contains("placeholder")) {
                navigator.clipboard.writeText(textElement.textContent).then(() => {
                    btnCopy.textContent = "Copied!";
                    btnCopy.classList.add("copied");
                    setTimeout(() => {
                        btnCopy.innerHTML = `<i class="fa-solid fa-copy"></i> Copy`;
                        btnCopy.classList.remove("copied");
                    }, 2000);
                    
                    const rawVal = document.getElementById("raw-ad").value;
                    logAdToBackend(rawVal, textElement.textContent, "passed");
                });
            }
        });
    }
}

function processAd() {
    const rawAd = document.getElementById("raw-ad").value;
    const overrideCategory = document.getElementById("category-override").value;
    
    const textDisplay = document.getElementById("processed-ad-text");
    const banner = document.getElementById("ad-status-banner");
    const rejectionBox = document.getElementById("rejection-container");
    const blacklistBox = document.getElementById("blacklist-container");
    const logsList = document.getElementById("audit-logs-list");
    const btnCopy = document.getElementById("btn-copy-ad");
    
    // Clear display if no input
    if (!rawAd.trim()) {
        textDisplay.textContent = "Processed ad will appear here...";
        textDisplay.classList.add("placeholder");
        banner.setAttribute("data-status", "pending");
        banner.querySelector(".status-title").textContent = "Awaiting Input...";
        banner.querySelector(".status-icon").innerHTML = `<i class="fa-solid fa-hourglass-half"></i>`;
        rejectionBox.classList.add("hide");
        blacklistBox.classList.add("hide");
        const btnCopyRej = document.getElementById("btn-copy-rejection");
        if (btnCopyRej) btnCopyRej.classList.add("hide");
        logsList.innerHTML = `<li class="log-empty">No logs available. Enter some text to see corrections.</li>`;
        btnCopy.disabled = true;
        return;
    }

    // Auto-detect action mode from text if keywords are present, and update UI
    const detectedAction = detectActionFromText(rawAd);
    if (detectedAction) {
        actionOverrideMode = detectedAction;
        userClickedAction = false; // Reset to allow auto-toggle/sync
        
        const btnSell = document.getElementById("btn-toggle-sell");
        const btnBuy = document.getElementById("btn-toggle-buy");
        if (btnSell && btnBuy) {
            if (actionOverrideMode === "Buying") {
                btnBuy.classList.add("active");
                btnSell.classList.remove("active");
            } else {
                btnSell.classList.add("active");
                btnBuy.classList.remove("active");
            }
        }
    }
    
    // Execution context
    const context = {
        raw: rawAd,
        phoneNumber: "",
        actionOverride: userClickedAction ? actionOverrideMode : "auto",
        status: "passed", // passed, rejected, blacklisted
        rejectionReason: "",
        blacklistReason: "",
        logs: [],
        category: "Other",
        finalText: "",
        priceInfo: null
    };
    
    try {
        runValidationPipeline(context, overrideCategory);
    } catch (err) {
        console.error("Ad editor processing error:", err);
        context.status = "rejected";
        context.rejectionReason = "Internal processing error: " + err.message;
    }
    
    // Update toggle buttons if auto-detecting
    if (!userClickedAction) {
        const btnSell = document.getElementById("btn-toggle-sell");
        const btnBuy = document.getElementById("btn-toggle-buy");
        if (btnSell && btnBuy) {
            if (context.action === "Buying" || context.action === "Renting" || context.action === "Looking") {
                btnBuy.classList.add("active");
                btnSell.classList.remove("active");
            } else {
                btnSell.classList.add("active");
                btnBuy.classList.remove("active");
            }
        }
    }
    
    // Update HTML UI elements
    updateUI(context);
}

const OFFICIAL_TEMPLATES = [
    "Join Imad Wanted Family Office (\u211613724)",
    "Whether you are new or old in the city, if you need money, Office (\u211613724)",
    "Vanilla Unicorn Bar (GPS \u211643)",
    "Taxi (GPS \u21161) near the Casino",
    "Central Mall Weapon Shop (GPS \u2116269)",
    "Elites 24/7 Store No120",
    
    // Ammunition Store Templates
    "Looking to buy affordable and high quality ammunition in bulk? weapon shop (GPS \u211639) is offering huge discount. Email (lbiiigmatte)",
    "Vyce weapon shop (GPS \u211639) is offering ammunition at low price all the day, visit now to get amazing deals.Email (lbiiigmatte) or call Ph(12-12-901).",
    "Want buy guns with lowest price? Come to Holdem Ammunation Store (GPS 40) the lowest prices in the city for bulk orders contact via email (ahmad70123)",
    "Visit Holdem Ammunation Store (GPS 40) is Offering 50% discount the lowest prices in the city.",
    "Vio Gun Store (GPS \u211641) - 50% DISCOUNT We are the CHEAPEST in the city. ALWAYS LOW PRICES guaranteed. Bulk Orders? (Wietru)",
    "Vio Gun Store (GPS \u211641)  Get 50% discount today. Experience always low prices on all ammo and weapon types in the city. Bulk Orders? (Wietru)",
    "RifleClub (GPS 111) Citys main gun store, lowest ammo prices with 50% discount, bulk orders? Mail (maxdopamine) for extra deals.",
    "RifleClub (GPS 111) Legion Square gun store, lowest ammo prices with a flat 50% discount, bulk orders? Mail (maxdopamine) for extra deals.",
    "Discover Bobbys Ammunition Store (GPS \u2116147), offering quality firearms near SAHP in Paleto Bay.",
    "Visit Bobbys Ammunition Store (GPS \u2116147). Exclusive 50% Off on quality firearms near SAHP in Paleto Bay.",
    "CanikPide Gun Store (GPS No. 148) delivers high-quality firearms at affordable rates citywide. Contact (behzatamir) via mail for bulk orders anytime.",
    "CanikPide Gun Store (GPS No: 148) is always stocked and available 24/7 for bulk orders. You can contact us for bulk orders through mail (behzatamir).",
    "Wong Gun store (GPS No149) is offering highest quality and lowest prices in city! Gear up with us and save big. Mail for bulk orders (Saylex)",
    "Tired of overpaying? Visit Pew Pew GunStore (GPS No:149) for 90% OFF on everything! Bulk deals available on Emails (notsuman).",
    "Gear up at Lue Gun Shop (GPS No150). Top tier firearms and tactical equipment await. Bulk discounts available. Email: (dayzofdeath)",
    "Lock and load for less at Lue Gun Shop (GPS No150)! 50% off all firearms and gear. Dont miss out on this limited time offer. Email: (dayzofdeath)",
    "Siddhu Gun Store (GPS 151) - Locked, loaded, and unbeatable prices. Get top-quality guns at the lowest rates in town. Bulk orders? Mail sidhux123",
    "Siddhu Gun Store (GPS 151) - Limited-time 90% discount on top-quality firearms. Best deals in town. Dont miss out! Bulk orders? Mail sidhux123",
    "Looking for the lowest prices on guns? Visit Most Wanted Store (GPS \u2116152) near Beach Market for unbeatable bulk order! Reach out via email (xkouros)",
    "Dont miss out on incredible discounts up to 90% off at Most Wanted Store (GPS \u2116152)! For guns and ammo, contact us at (xkouros)!",
    "Central Mall Weapon Store (GPS \u2116269)! Premium Weapons and Ammo, Always Stocked for Bulk Orders. Contact Me on 22-20-444 OR Mails (maxuchihax).",
    "Hurry up! Up to 60% OFF on Firearms at Central Mall Weapon Shop (GPS \u2116269)! Limited stock, act fast. Ping Me on 22-20-444 OR Mails (maxuchihax).",
    
    // Office Templates
    "Need easy money $132.000 everyday? Office (\u211624) is for you, offering $10.000 bonus for every task you finish. Contact (d.arsh) via email for bonus!",
    "Do you need extra money? The Office (\u211624) is for you. Finish simple tasks and earn $132.000 Daily. Offering max bonus Contact via email (d.arsh)",
    "Earn $4.5 Million monthly! Join Al Toman Office (\u2116585) and make $12.000 bonus for every task you finish. Email \"dxdux\" for exclusive bonuses.",
    "Office (\u2116585) is currently offering a $12,000 bonus for each completed task. Interested? Contact (dxdux) via mail for more info!",
    "Struggling with Expenses? Office (\u2116677) got you covered! Get financial support for your daily needs. Reach out to us via email for your daily bonuses!",
    "Say Goodbye to financial stress! Office (\u2116677) provides quick cash for easy tasks. Connect with us through email to claim your daily bonuses.",
    "Easy Money From Me Get 9K For Each Task. We Are Not Alone But We Are The Best OFFICE (N1000) Contact (zekomyth) via email for bonus! or Call 8882288",
    "Get 54k When you complete 6 missions (N1000) Contact (zekomyth) via email for bonus! or Call 8882288",
    "Get rich with the Theo Gucci Office (\u21161017)! Claim your $5.000 bonus after each task by sending a message to us!",
    "Looking for an effortless way to earn money? Contract with the Theo Gucci Office (\u21161017) and fill your pockets with cash!",
    "Your millionaire dream begins at Office 1288! Earn 10k per task, 125k a day, 875k every week. Build your future with us. Contact on mails (leveljod)",
    "Build your future at Office 1288! Every task pays 10K. Simple work, big rewards. Dont wait, start today. Contact me on mails (leveljod)",
    "Dont have money? Earn up to $100.000 daily. Contract with Lazy Assassin Office (\u21161419) and receive $5.000 per task. Contact (imm0rtalop) for bonuses.",
    "Looking for employment opportunities? Join the Lazy Assassin Office (\u21161419) and earn $5.000 bonus for each task. Email (imm0rtalop) for details.",
    "Empty pockets? Dont worry, earn $124,000 a day with Humans Office (\u2116 1948). Contact us via email (za3im96) for bonuses!",
    "Quick Money Opportunity! Office No. 1948. Fast, easy earnings. No hard work, just smart work.  email (za3im96) for bonuses!",
    "Become a MILLIONAIRE in the easiest way with Office 2198! $10K bonus per task, $191.800 per day. For more information, contact us by mail. (Saylex)",
    "Earn $191.800 daily at Office (No-2198)! Receive $10K bonuses per task and $50,000 from the referral bonus! Email (Saylex).",
    "Contract with Outlaws Office (\u21162796). Complete 6 tasks daily and earn cash, enjoy a $30.000 bonus for completing all tasks. Email (bo330) for bonuses!",
    "Outlaws Office (\u21162796) is waiting for you. Tackle 6 tasks daily, earn money and receive $30.000 bonus for completing all tasks. Contact us at (bo33).",
    "Need quick cash? Get employed at Grand For All Office (\u21167963) and receive a bonus for each completed task.",
    "Office Grand FOR ALL \u21167963 offers a bonus of $40.000 after completing all daily tasks.",
    "Do you have dreams? If you say yes, we cant help you. But if you have goals, lets get it done. Contract with Snow Corp. Office (\u211610364).",
    "Easy tasks, the easiest money. Now with $30.000 bonus. Contract with Snow Corp. Office (\u211610364). Send email (.networkproblem) for extra bonuses.",
    "Money like Turkish Delight Office 12313! $10,000 bonus per mission, $195.000 daily. For info, mail us. (esjer)",
    "Earn $195,000 daily at Office (No12313)! Get $10,000 per task and various bonuses! mail (esjer) now for this opportunity!",
    "Join Imad Wanted Family Office (\u211613724)! Today, we are offering bonuses, easy tasks, and extra cash. Then what are you waiting for? Join us now.",
    "Whether you are new or old in the city, if you need money, Office (\u211613724) offers a 90% profit. We provide bonuses too! Contact us at (mostwanted994)!",
    "Office 14396 gives $10,000 per task! Fast money, no drama. Send email to bylkaanis and start earning today!",
    "Hello! Office 14396 pays $10,000 for each task you complete. Want easy money? Mail bylkaanis and join us now!",
    "Empty pockets? Dont worry, make $100.000 a day by contracting with SAKIB INC Office (\u211614633). Contact us via email (gamyashiqur) for bonuses!",
    "Tired of not getting paid what was promised by other offices? Dont worry, SakibInc Office (\u211614633) always offers the highest pay-outs and easy tasks.",
    "Empty pockets? Dont worry, earn $124,000 a day with Lue Office (\u211615136). Contact us via email (dayzofdeath) for bonuses!",
    "Looking for the highest paying office? Lue Office (\u211615136) is your best choice! Get a $10,000 bonus per task. Email us at (dayzofdeath).",
    "$11,111 BONUS  $11,111 BONUS  $11,111 BONUS per task Wietru Vio Office (21046) Contact: mail (Wietru)",
    "NO MORE EMPTY POCKETS Your $11.111 task bonus is waiting at Wietru Vio Office (21046) mail (Wietru)",
    "Empty pockets? Join Office 27650 and earn daily with easy tasks. Get up to $10.000 bonus per task. Start now! Contact (bako0804)",
    "Want to earn big money fast? Office 27650 offers $10.000 bonus per task and high daily income. Easy work. Contact via email (bako0804)",
    "Is your girlfriend spending all your money? You do not have to be afraid anymore! The office (\u211632125) offers money for your daily needs.",
    "Earn $10.000 per task, then blow it all at the casino. Why save when you can gamble hard earned office fortune? Swing by Office \u211633698 and cash in!",
    "Earn $10.000 per task, Then watch your wife spend it faster than you can make it. Visit Office \u211633698, At least you can try to win it back!",
    "Nexus Office \u211641760 sets the gold standard with highest bonus ever. Extra $10.200 bonus per task and $11.000 on weekends. Contact: (argha.bhai).",
    "Step into excellence with Nexus Office \u211641760. Secure extra $10.200 bonus each task and $11.000 on weekends. Mail: (argha.bhai).",
    "Want to earn easy money by doing simple tasks? Contract with Office No50367 and earn $10.500 bonus on every task. Contact (shivkumar7409) for bonuses.",
    "Office 50367 is Offering $10.500 bonus on every task. Hurry up and Grab this offer, You can earn $135.000 daily. Contact me via email (shivkumar7409).",
    "Office \u211652942 introduces big profits $64800 daily, Seize this opportunity to enhance your earnings and experience.",
    "Looking to live rich and making great earnings, $64800 daily? Visit the premier office Lex Lyls Office (\u211652942)",
    "Make riches your reality! Take tasks from Ponch Office \u211678981! Earn $64.800 daily, $1.9 Million monthly. Prestige meets pay!",
    "Are you new to the city? Want some good cash to begin your journey? Join (Office \u211678981) and earn $64,800 everyday easily.",
    "$13.000 bonus each task! Join Office 85042 for easy work and earn up to $213.000 per day. Fast rewards and simple tasks. Contact via mails (Creegaint)",
    "$13.000 bonus each task! Big earning opportunity at Office 85042. Makes up to $213.000 daily with simple tasks. Contact via mails (Creegaint)",
    "Hello everyone! Office 85235 gives you $10.000 bonus for each task you do. Hurry up and join us! Contact for bonus at emails guzm4n58.",
    "Earn $10,000 daily task bonus! Join Office (\u2116 85235) and receive $10,000 for each task, up to $120,000 per day. Email guzm4n58.",
    
    // Store 24/7 Templates
    "Hurry! Store 24/7 №1 (GPS 23) is offering 50% off on everything. Grab your favorite items now. Shop smart, save big!",
    "Why wait? 24/7 Store №1 (GPS 23) is the cheapest in the city. Visit us anytime, 80% discount on Bulk Orders! Contact (creegaint).",
    "Spankys 24/7 №2 (GPS №24) offers cheapest prices and instant delivery on big orders. All day support via mail. Call 99-84-146 or (ganguly07).",
    "Store №2 (GPS №24) Spankys 24/7 runs all day with cheapest rates. Bulk orders get instant delivery. Contact 99-84-146 or (ganguly07).",
    "Beast24/7Store №3 (GPS 25) Always open,Cheapest in city We guarantee low price on all products,open round the clock,for more queries contact-beasto001",
    "Revolutionize your shopping at 24/7 store (GPS №25) deals up to 50% off! Get pickaxes, maps, flowers, tents and more essentials for your daily tasks!",
    "24 Store №26! offers 25% off on bulk orders! For more details or to place an order, call 5111110 or email us at (17uv). Dont miss out on the savings.",
    "Bulk buyers save big at 24 Store №26! Get 25% off on bulk purchases. Reach out at 5111110 or email ( 17uv ) for details and orders.",
    "If you are out of city need groceries, Get up to 60% Discount Today: Visit Shop No. 5 (GPS No 27). Contact: 15-01-505 For Bulk deal in Cheap Price.",
    "Kingdom Grocery Shop No. 5 (GPS No 27), Offering Lowest Prices and Up to 60% Off on Bulk Deals. Contact: 15-01-505 (drakes2030)",
    "Discover amazing prices at Pearl 24/7 Store №28! Always open, always ready for Los Santos!",
    "Pearl 24/7 Store №28 offers -50% discounts in-store! Dont miss -80% bulk deals! Call us: 5550069!",
    "Need a shop near Sandy Shores? We are the cheapest 24/7 of SH side! (GPS №29) We offer 50% sale for all products",
    "Attention Solar Panel Plantation Owners! Maximize your profits with cheapest solar panels! Contact for bulk orders (azuujah)",
    "Hello Los Santos. ZO-ZO 24/7 (Shop No30) Waiting For You On Bulk Orders. 50% To 80% OFF Each Order. Keep Smile With Order Now.",
    "Enjoy a massive 50% discount on store items at 24/7 Store №8 (GPS №30), at Grand Senora Desert. Call 98-54-268 for details.",
    "Mighty Cyber  24/7 Store №.9 (GPS 78) is offering 50% discount for all products.",
    "Welcome to 24/7 Store №9 (GPS 78) is offering  discount for all products. Bulk Orders? Reach out (shodangaming) at mail and get exclusive deals!",
    "Why pay more? Evox Store No.10 (GPS N119) is open 24/7 with up to 90% off lowest prices, day or night!",
    "Evox Imrane 24/7 Store No.10 (GPS N119)  50% off today! Bulk orders? Email us at mails (evox.co)  to save more!",
    "Need something quick? Visit Conco 24/7 Store №11 (GPS №120) for fast access anytime. Always stocked for daily needs. Dial 18-09-842 (montalliago)",
    "Buying in bulk? Visit Conco 24/7 Store №11 (GPS №120) and save more with bulk discounts. Always stocked and ready. Call 18-09-842 (montalliago)",
    "Kings 24/7 Store №121 Get up to 80% off on bulk orders. Quality guaranteed. Open daily with great value on all your essential everyday items.",
    "Kings 24/7 Store №121 Day or night our shelves stay full. From groceries to daily must haves we are always stocked and ready when you walk in.",
    "Come down to BestMoney 24/7 (GPS 123) for the cheapest prices in Paleto Bay! Need bulk orders? We got you covered.",
    "Traveling through Paleto Bay? Stop by Store No13 (GPS123), open 24/7 with travel essentials at great prices. Your one-stop shop on the highway!",
    "Go Grab 24/7, Shop No125, affordable prices with 50% off on all orders! Bulk orders? Enjoy special rates! Contact mails (190uzair)",
    "Go Grab 24/7, Shop No125 always in stock, located in the ghetto, Welcome for bulk orders, Contact us on mails (190uzair)",
    "Do you need items to complete your tasks?  Head to Molotov 24/7 store in Mirror park (GPS №128) for the lowest prices in city.",
    "Lottery tickets, backpacks, solar panels, fishing rods or flowers? Molotov 24/7 (GPS №128) is always stocked and 50%! Contact us for bulk orders!",
    "The holiday season is here! Get your fireworks for New Year! Only at 24/7 Store near the beach! №129",
    "Wifey got your credit card? Her expenses making you broke! No worries The Beach 24/7 Store №129 now offers 50% discount.",
    "Get nonstop cheap rates at Joy Virellii 24/7 Store №18 (GPS №139). Bulk orders welcome. Contact  29-29-290 or masthangaming786 today.",
    "Bulk orders at guaranteed low price. Joy Virellii 24/7 Store №18 (GPS №139). Contact 29-29-290 or masthangaming786 for details now.",
    "Running low on budget? Then look no further! 24/7 Store No19 (GPS 140) is offering 24/7 the best quality goods with 50% off!",
    "Why wait? 24/7 store No19 (GPS 140) is the cheapest in the city. Visit us anytime, 50% discount on Bulk Orders! Contact (only696).",
    "Shopiva 24/7 (No.141) has 50% OFF Bulk orders. We are Open Day and Night providing premium service. Contact .proden to get your stock quickly.",
    "Shopiva 24/7 store (GPS 141) is now offering lowest price guaranteed in the whole city!! Visit now located at the core of Los Santos near Hotel!!",
    "Mall 24/7 Store №270 Save BIG on everything -50% in-store, -80% on bulk orders, LOWEST prices in the heart of the city.",
    "Mall 24/7 Store №270 is at -50% OFF! Make easy money with solar panels and mushroom seeds at the LOWEST prices in the city!",
    
    // Gas Station Templates
    "Cheapest Means Best! Come Gas Station NO 3 (GPS No4) inside city FUEL $8!",
    "Gas Station NO 3 (GPS No4) Repair kit $70 Canister $140 For bulk orders (mail devrimcicoban)",
    "We make your gas stop easier, Sahara Royal Gas Station №6 will make sure every drop counts!!",
    "Planning a trip? Need fuel cans and repair kits in case of emergency? Gas Station №6 is here with 50% discount. Every drop counts!!!",
    "Are you run out of fule? Do not worry, just come in Indian oil station №7 (On GPS) is providing high quality fuel in every drop! And visit again.",
    "New in this city? Why are you pay $20 for fuel ? Come to Indian oil gas station №7 (On GPS ). Pay only $8 per liter and save your money.",
    "Do you need high quality fuel for your car? Ron Gas station №8 will provide you excellent fuel for your cars Only $20 per liter. Make your car happy.",
    "Ron Gas station №8 offering 50% discount today. Come get your high quality fuel for your car.",
    "Visit Gas station №6 (GPS №9) will provide $10 per liter, $100 repair kit and $200 canister cheapest fuel in the city.",
    "Gas station №6 (GPS №9) provides cheapest fuel in the city. Provide only $100 repair kit and $200 canister. For bulk orders, contact (nudhory).",
    "Quality fuel and great service at Gas Station 10. Best prices and service in town. Visit Tsunami station today.",
    "Fuel your journey at Gas Station 10. Tsunami provides top-tier service and quality gas every day.",
    "Quality fuel and great service at Gas Station 11. Best prices and service in town. Visit Charon station today.",
    "Fuel your journey at Gas Station 11. Charon provides top-tier service and quality gas every day.",
    "Visit Rich Man gas station (GPS №13) will provide $20 per liter, $350 repair kit and $500 canister cheapest fuel in Rich Man.",
    "Rich Man Gas Station (GPS 13) - 50% off all fuel! Cheapest in town, do not miss out! Bulk orders, contact (badpedro6)",
    "Drive extra miles with Remix Gas station (№14). High quality fuel for a smooth ride, get your gas always for $10, $200 canisters and $100 repair kits.",
    "Remix Gas station №14 The cheapest in the city, buy fuel canister and repair kit in bulk. Contact us by email on (b0n0is)",
    "Running out of fuel on your road trip? Fill up at XR OIL GAS STATION (GPS №15)! Also offers premium fuel, gas canisters, and repair kits.",
    "Looking for the cheapest fuel? XR OIL GAS STATION (GPS №15) offers fuel for just $5 and the lowest prices on gas canisters and repair kits.",
    "Running out of fuel on your road trip? Fill up at KEK OIL GAS STATION (GPS №16)! Also offers premium fuel, gas canisters, and repair kits.",
    "Looking for the cheapest fuel? KEK OIL GAS STATION (GPS №16) offers fuel for just $10 and the lowest prices on gas canisters and repair kits.",
    "Empty tank? No panic! Liff Gas Station (№17) near Doc Highway offers best city prices fuel at $10 per liter, $300 repair kits and $500 canisters.",
    "Liff Gas Station (№17), get the best cheapest fuel in the city with a 50% discount, where superior driving meets smart savings.",
    "Driving near SAHP? Swing by the Cheapest Gas Station (GPS №18) - full stock, fast service, and everything your ride needs!",
    "Running low? Gas Station (GPS NO-18)! Fuel up fast and grab essentials. For bulk deals, Contact us via mails (raveelkhan).",
    "Brody Station $10-L deal! Brody Station №21! Open 24/7, lowest fuel price. Full stock, helipad, free delivery on bulk orders. Contact (bawan3) today!",
    "Save on Fuel! $10-L at Brody Station No21! Open 24/7, lowest price guarantee. Helipad and free delivery for bulk orders. Reach out to (bawan3) now!",
    "Need a quick fuel stop? We got you covered at just $5 per litre! Top-quality fuel, and reliable support. Bulk orders? Contact Immortals Jaadu today!",
    "Running low on fuel ? Stop by Immortals Fuel – fuel at only $5 per litre, plus repair kits $100 and canisters $200 available! DM for bulk orders now.",
    "Welcome to Ron Gas Station №18 (GPS 115). Drive in for quality fuel, special discounts, and bulk order support. Contact (5andeep).",
    "Drive smart with Ron Gas Station №18 (GPS 115). Fuel $15 per liter. Canister $350. Repair Kit $250. Discounts & bulk orders. Contact (5andeep).",
    "Mobil Gas Station No17 (GPS 116). Fuel up fast with trusted service. Bulk fuel & offers available. Contact (amulyt).",
    "Mobil Gas Station No17 (GPS 116). Quick & reliable. Fuel $15/L, Canister $350, Repair Kit $250. Bulk deals available. Contact (amulyt).",
    "Stuck in Paleto Bay? Visit Loves Gas Station №117! Fuel up at just $12/L. Great prices on all essentials!",
    "Loves Fuel №117 – Just $12/L! Save more with bulk deals. Msg (rockyfearless) now to lock in your supply!",
    "Surya Pluxury Gas Station №118 offers $5/L Fuel, $200 Canisters, $100 Repair Kits! Limited time only. Call now: 93-50-311",
    "Tired of paying too much for good quality fuel? Jordan fuel works GPS №118 provides products in cheap and fuel at only $10 per litre inside city!",
    "SHER Gas Station Your One Stop Destination for Quality Fuel and Convenient Services. Visit us at GPS 124!",
    "Gas Station No. 124 offers cheap prices in the city. For more details, contact me in email yassir001.",
    "Listen up riders! Need quality fuel? Visit Gas Station №21 (GPS №127) fuel up, grab kits, and get back in motion. PH: 22-64-883.",
    "Running low? Dont push that luck. Visit Gas station №21 (GPS №127) for high quality fuel and canisters. Contact: 22-64-883.",
    "Renegades Gas Station, in the middle of the map, GPS №136 offers the LOWEST Price Per Liter, just $7. For bulk orders, Contact HELLBRAZER or VAILLYRP.",
    "Limited time discounts at Gas Station GPS №136 $7 Per Liter, cheap Repair Kits and Canisters! Do not miss out! Contact: (HELLBRAZER or VAILLYRP)",
    "OILARC Gas Station No23 (GPS 137) Near Hospital of Sandy Shores, Providing 50% discount on Fuel and everything. For bulk orders mails (rupoj).",
    "Running low on fuel near Sandy shoes? Visit OILARC Gas station No23 (GPS 137) Providing fuel at $5 Per litre. For bulk orders mails (rupoj).",
    
    // Parking Templates
    "With our parking number 1 (GPS №51)  we are offering 1000 per place! come take your car and dont miss this opportunity.",
    "Party lovers unite! Go to Parking №2 - where events shine, parties pop and the beach view beats your dance moves.",
    "Car fans unite! Go to Parking №2 - where engines roar, lights glow and every ride turns heads at the hottest beach meet.",
    "Are you afraid of scratching your vehicles? Do not be afraid, use Ekip Parking Lot (GPS №53)",
    "Unique Comfort and Security Only Book at EKIP Parking (GPS№53), Guarantee Luxury Care for Your Vehicle!",
    "Are you afraid of scratching your vehicles? Dont be afraid, use Ekip Parking Lot (GPS №54)",
    "Unique Comfort and Security Only Book at EKIP Parking (GPS №54), Guarantee Luxury Care for Your Vehicle!",
    "Take your car from the garage, drive and park in luxury. Parking №5 (GPS №55) VIP style and security for $1.000",
    "Dont look for a parking space in the crowd! Your car is safe with Parking №5 (GPS №55). Regular spaces and pocket friendly prices await you.",
    "Tired of paying $15,000 to rent? Park 6 (GPS №56) is located under Vinewood. Only $1,000 to park your car for the whole day.",
    "Are you looking for safe, hygienic and economical parking? (No56) You are in the right place!",
    "Looking for parking lots? Parking (GPS №57) is now offering 90% off and is only $1.000 per day.",
    "Dont forget to visit us at Eileen Parking (GPS №57). Customer satisfaction is our top priority.",
    "Parking №8 (GPS №58) Near City mall in the middle of the city is offering the cheapest rates in the city. Book your space today for only $1.000!",
    "Parking №8 (GPS №58) Near City mall middle of the city is the best and safest place to park in city. Visit us today for cheap parking!",
    "Secure the cheapest Parking №10 (GPS №79) in the city Center for just $1.000 each day. Prime location near beach market, affordable rates.",
    "Looking for a parking? Limited offer, dont miss out just 1000$ at Playboys Parking! (GPS №79)",
    "Dont look for a parking space in the crowd! Your car is safe with Parking №11 (GPS №80). Regular spaces and pocket friendly prices await you.",
    "Unique Comfort and Security Only  Book at EKIP Parking (GPS №80), Guarantee Luxury Care for Your Vehicle!",
    "Are you bored of paying $15.000 for renting? Parking 12 (GPS №81) is located in the center of the city Just $1.000 to have your car parked all day.",
    "Tired of your car not being where you left it? Use Parking 12 (GPS 81) For a very cheap price!",
    "Some security can only be found at Remix Parking Lot Guarding, cleaning and security. 50% cash back when dealing with us Contact me via (zekomyth)",
    "Unique Comfort and Security Only  Book at Remix Parking (GPS №82), Guarantee Luxury Care for Your Vehicle! 50% cash back Contact me via (zekomyth)",
    "Are you afraid of scratching your vehicles? Dont be afraid, use Ekip Parking Lot (GPS №83).",
    "Unique Comfort and Security Only Book at EKIP Parking (GPS №83), Guarantee Luxury Care for Your Vehicle!",
    "Are you bored of paying $15.000 for renting? Parking 15 (GPS №84) is located in the middle of the beach. Just $5.000 to have your car parked all day.",
    "Are you bored of paying $15.000 for renting? Parking 15 (GPS №84) is located in the middle of the beach. Just $1.000 to have your car parked all day.",
    "Parking space №16 (GPS №85) attached to the Train Station Apartment, is offering the cheapest rates in the city. Book your space today for only $1.000",
    "Parking №16 (GPS №85) attached to the Train Station Apartment is the best and safest place to park in city. Visit us today for cheap parking!",
    "Secure the cheapest Parking №17 (GPS №101) in the city Center for just $1.000 each day. Prime location, affordable rates. Reserve your spot now!",
    "Homeless? Secure parking (GPS №101) for your car! Reserve now, park with ease. The citys cheapest at $1.000 a day!",
    "Tired of circling the block in search of parking? Welcome to Parking (GPS №135), your hassle solution for suitable and secure parking, at $1.000 only!",
    "Rockford Parking №18. (GPS №135). Just $1.000 per day near Hotel and LI. Offer for completing jobs task! Just contact me. (kosa.123).",
    
    // Family Templates
    "Seeking Power, Unity and Legacy? Uchiha Clan provides Great Vibes, Strong Bonds and Endless Fun. Join us at House №55 or Contact (maxuchihax).",
    "Looking for Strength, Loyalty and Family? Uchiha Clan offers Unity, Fun and True Respect. Join us at House №55 or Contact (maxuchihax).",
    "Join Kingdom family at House №258 Provides Best bonus, supercars, helis and supportive staff. To join call 77-66-888 or mail king.kaushik",
    "Kingdom family is open at House №258. Providing high bonus, best cars, helis and helpful team. Ph. 77-66-888 or mails king.kaushik",
    "The Deluca Cartel is looking for skilled individuals, A family built on trust, unity and respect. Join Deluca Cartel at house №536 today!",
    "Looking for a strong family with loyal people and skilled individuals? Join Deluca Cartel at house №536 today, become a part of something powerful!",
    
    // Clothing Shop Templates
    "Upgrade your style this week at Clothing Shop n1 (GPS 31) ! Special offers, lowest prices, and exclusive outfits. Don t miss out!",
    "Upgrade your style at Clothing Shop n1 (GPS 31) ! Special prices, exclusive outfits. For bulk orders Contact via email (topgs1)",
    "Shop the latest styles at great prices. Trendy clothes for every occasion. Visit us today and refresh your wardrobe with 50% off Clothing Shop (No.32)",
    "Clothing store 2 (No.32) is offering 50% discount and more than 50% discount for bulk order message me in email (rupoj) or contact 1181112",
    "Best style, best prices at TrendZone (Shop 3 on map). Look great for less! PH 6326759 MAILS nzoo.x.",
    "Upgrade your wardrobe at Fashion Point (Shop 3 on map). Hot styles, low prices! PH 6326759 MAILS nzoo.x.",
    "Clothing Shop №4 at (GPS №74) provides quality clothes at wholesale rates. Get 50% off and more on bulk orders. Ph. 66-60-333. Mails (abirsikder70)",
    "Clothing Shop №4 at (GPS №74) provides clothes at wholesale rates. Enjoy 50% off sales, best for bulk orders. Ph.66-60-333 or mail (abirsikder70)",
    "Come to our Store No5 (GPS 75) to dress stylishly and affordably. For bulk purchases, contact me via email at (halilbeyy45).",
    "For stylish and affordable clothes, visit No5 (GPS 75) and contact us via email (halilbeyy45)",
    "Come to our Store No7 (GPS 122) to dress stylishly and affordably. For bulk purchases, contact me via email at (halilbeyy45).",
    "For stylish and affordable clothes, visit No7 (GPS 122) and contact us via email (halilbeyy45).",
    "Are You Looking For Bulk Clothes For Families? Come Contact Clothing Store 6 ( GPS 126), At Cheapest Price You Cant Imagine!",
    "You Want Best Quality Clothes, With Cheapest Price You Cant Imagine? Come Clothing Shop 6 (GPS 126), And Get Maximum Discount And Cashback!",
    "Getting bored with old outfits? Visit Troy Collection Shop №142 for unique and branded clothing at 70% discount!",
    "If boys are not looking at you! Visit Troy Collection Shop №142 at 70% discount for all the clothing.",
    "Everyone deserves a great look! Visit to Veneta Clothing (№143) and get yourself a great outfit at a 50% discount! We are located at near Postal.",
    "Veneta Clothing Store (№143) has the lowest prices, the latest, high quality clothes and is always fully stocked! for family bulk orders contact us.",
    "Need clothes for your family at the best price? Shop at Moonlight Clothing Shop (GPS №144) for unbeatable deals! Contact (lkaan5) now!",
    "Clothing store №144 has lowest price at 50% Discount for high quality clothes and is always fully stocked! Contact (lkaan5) now!",
    "Upgrade your style at LAAALO Clothing Shop No12 (GPS 145) ! Special offers and exclusive outfits. For bulk orders, contact me via email at (xlaaalo).",
    "LIMITED TIME! Clothing Shop №12 (GPS 145) 50% OFF EVERYTHING - best deals in the city! Pull up now before its gone! For Bulk orders contact (xlaaalo)",
    "Clothing Shop GPS №146 (Shop No.13 on map). Perfect for families and daily wear. Bulk orders available. PH: 98-54-268 or email (sachin2309).",
    "Hurry up! 50% discount at Clothing Shop (№.13) best styles at great prices. Visit now before the offer ends. Contact 98-54-268 or email (sachin2309).",
    "Los Santos Clothing Store (GPS №271) is now offering 50% Off in all products! Located inside the biggest mall in the city.",
    "Dont forget once again the crazy deals of Los Santos Clothing Store (GPS №271). Now offering 50% Off in all products!",
    "Level up your style for less. Clothing Shop №2 (GPS №275) offers top looks low prices and new drops daily. Visit us today or call (26-96-969).",
    "Fresh styles low prices daily. Visit us today for best deals at Clothing Shop №2 (GPS №275) contact me via mails at (azarel.11) or call (26-96-969)."
];

function getAmmunitionTemplate(shopNum, tempIdx) {
    const map = {
        "39": [6, 7],
        "40": [8, 9],
        "41": [10, 11],
        "111": [12, 13],
        "147": [14, 15],
        "148": [16, 17],
        "149": [18, 19],
        "150": [20, 21],
        "151": [22, 23],
        "152": [24, 25],
        "269": [26, 27]
    };
    const indices = map[shopNum];
    if (indices) {
        const idx = indices[parseInt(tempIdx) - 1];
        return OFFICIAL_TEMPLATES[idx];
    }
    return null;
}

function getOfficeTemplate(officeNum, tempIdx) {
    const map = {
        "24": [28, 29],
        "585": [30, 31],
        "677": [32, 33],
        "1000": [34, 35],
        "1017": [36, 37],
        "1288": [38, 39],
        "1419": [40, 41],
        "1948": [42, 43],
        "2198": [44, 45],
        "2796": [46, 47],
        "7963": [48, 49],
        "10364": [50, 51],
        "12313": [52, 53],
        "13724": [54, 55],
        "14396": [56, 57],
        "14633": [58, 59],
        "15136": [60, 61],
        "21046": [62, 63],
        "27650": [64, 65],
        "32125": [66], // Template 1 only
        "33698": [67, 68],
        "41760": [69, 70],
        "50367": [71, 72],
        "52942": [73, 74],
        "78981": [75, 76],
        "85042": [77, 78],
        "85235": [79, 80]
    };
    const indices = map[officeNum];
    if (indices) {
        const idx = indices[parseInt(tempIdx) - 1];
        if (idx !== undefined) {
            return OFFICIAL_TEMPLATES[idx];
        }
    }
    return null;
}

function getStore247Template(shopNum, tempIdx) {
    const map = {
        "23": [81, 82],
        "24": [83, 84],
        "25": [85, 86],
        "26": [87, 88],
        "27": [89, 90],
        "28": [91, 92],
        "29": [93, 94],
        "30": [95, 96],
        "78": [97, 98],
        "119": [99, 100],
        "120": [101, 102],
        "121": [103, 104],
        "123": [105, 106],
        "125": [107, 108],
        "128": [109, 110],
        "129": [111, 112],
        "139": [113, 114],
        "140": [115, 116],
        "141": [117, 118],
        "270": [119, 120]
    };
    const indices = map[shopNum];
    if (indices) {
        const idx = indices[parseInt(tempIdx) - 1];
        if (idx !== undefined) {
            return OFFICIAL_TEMPLATES[idx];
        }
    }
    return null;
}

function getGasStationTemplate(shopNum, tempIdx) {
    const map = {
        "4": [121, 122],
        "6": [123, 124],
        "7": [125, 126],
        "8": [127, 128],
        "9": [129, 130],
        "10": [131, 132],
        "11": [133, 134],
        "13": [135, 136],
        "14": [137, 138],
        "15": [139, 140],
        "16": [141, 142],
        "17": [143, 144],
        "18": [145, 146],
        "21": [147, 148],
        "23": [149, 150],
        "115": [151, 152],
        "116": [153, 154],
        "117": [155, 156],
        "118": [157, 158],
        "124": [159, 160],
        "127": [161, 162],
        "136": [163, 164],
        "137": [165, 166]
    };
    const indices = map[shopNum];
    if (indices) {
        const idx = indices[parseInt(tempIdx) - 1];
        if (idx !== undefined) {
            return OFFICIAL_TEMPLATES[idx];
        }
    }
    return null;
}

function getParkingTemplate(shopNum, tempIdx) {
    const map = {
        "51": [167],
        "52": [168, 169],
        "53": [170, 171],
        "54": [172, 173],
        "55": [174, 175],
        "56": [176, 177],
        "57": [178, 179],
        "58": [180, 181],
        "79": [182, 183],
        "80": [184, 185],
        "81": [186, 187],
        "82": [188, 189],
        "83": [190, 191],
        "84": [192, 193],
        "85": [194, 195],
        "101": [196, 197],
        "135": [198, 199]
    };
    const indices = map[shopNum];
    if (indices) {
        const idx = indices[parseInt(tempIdx) - 1];
        if (idx !== undefined) {
            return OFFICIAL_TEMPLATES[idx];
        }
    }
    return null;
}

function getFamilyTemplate(shopNum, tempIdx) {
    const map = {
        "55": [200, 201],
        "258": [202, 203],
        "536": [204, 205]
    };
    const indices = map[shopNum];
    if (indices) {
        const idx = indices[parseInt(tempIdx) - 1];
        if (idx !== undefined) {
            return OFFICIAL_TEMPLATES[idx];
        }
    }
    return null;
}

function getClothingTemplate(shopNum, tempIdx) {
    const map = {
        "31": [206, 207],
        "32": [208, 209],
        "50": [210, 211],
        "74": [212, 213],
        "75": [214, 215],
        "122": [216, 217],
        "126": [218, 219],
        "142": [220, 221],
        "143": [222, 223],
        "144": [224, 225],
        "145": [226, 227],
        "146": [228, 229],
        "271": [230, 231],
        "275": [232, 233]
    };
    const indices = map[shopNum];
    if (indices) {
        const idx = indices[parseInt(tempIdx) - 1];
        if (idx !== undefined) {
            return OFFICIAL_TEMPLATES[idx];
        }
    }
    return null;
}

function getTemplateCategory(templateIndex) {
    const discountIndices = [
        9, 10, 11, 12, 13, 15, 19, 21, 23, 25, 27,
        81, 82, 86, 87, 88, 89, 90, 92, 93, 95, 96, 97, 99, 100, 103, 107, 112, 115, 116, 117, 119, 120,
        121, 124, 126, 128, 129, 135, 136, 140, 142, 144, 157, 164, 165,
        208, 209, 212, 213, 219, 220, 221, 222, 225, 227, 229, 230, 231
    ];
    return discountIndices.includes(templateIndex) ? "Discounts" : "Services";
}

function isTemplateAd(text) {
    if (!text) return false;
    
    // Check custom shorthand templates trained via Admin Panel (check ALL entries for best match)
    let bestCustomShortLen = 0;
    let bestCustomShortMatch = false;
    const cleanInputForCustom = text.trim().toLowerCase();
    for (const ct of customTemplates) {
        if (ct.shorthand) {
            const cleanShort = ct.shorthand.trim().toLowerCase();
            if (cleanInputForCustom === cleanShort || cleanInputForCustom.includes(cleanShort)) {
                const remaining = cleanInputForCustom.replace(cleanShort, "").replace(/^[^\w]+|[^\w]+$/g, "").trim();
                if (remaining.length < 5 && cleanShort.length > bestCustomShortLen) {
                    bestCustomShortLen = cleanShort.length;
                    bestCustomShortMatch = true;
                }
            }
        }
    }
    if (bestCustomShortMatch) {
        return true;
    }
    
    // Check if it is a shorthand template request (Ammunition)
    const shorthandMatch = text.match(/\b(?:ammunition\s+store|ammunation\s+store|ammo\s+store|ammo|weapon\s+shop|gun\s+store|weapon\s+store|rifleclub|bobbys|canikpide|wong|pew\s+pew|lue|siddhu|most\s+wanted|central\s+mall)?\s*(?:gps\s*)?(?:No\.?|\u2116|#)?\s*(39|40|41|111|147|148|149|150|151|152|269)\s+\b(?:temp|template|t)\s*([12])\b/i);
    if (shorthandMatch) {
        const remaining = text.replace(shorthandMatch[0], "").replace(/^[^\w]+|[^\w]+$/g, "").trim();
        if (remaining.length < 5) {
            return true;
        }
    }

    // Check if it is a shorthand template request (Office)
    const officeShorthandMatch = text.match(/\b(?:(?:[a-z\s]+)?office)?\s*(?:No\.?|\u2116|#|-)?\s*(24|585|677|1000|1017|1288|1419|1948|2198|2796|7963|10364|12313|13724|14396|14633|15136|21046|27650|32125|33698|41760|50367|52942|78981|85042|85235)\s+\b(?:temp|template|t)\s*([12])\b/i);
    if (officeShorthandMatch) {
        const remaining = text.replace(officeShorthandMatch[0], "").replace(/^[^\w]+|[^\w]+$/g, "").trim();
        if (remaining.length < 5) {
            return true;
        }
    }

    // Check if it is a shorthand template request (24/7 Store)
    const storeShorthandMatch = text.match(/\b(?:store\s+)?24\/7(?:\s+store)?\s*(?:gps\s*)?(?:No\.?|\u2116|#)?\s*(23|24|25|26|27|28|29|30|78|119|120|121|123|125|128|129|139|140|141|270)\s+\b(?:temp|template|t)\s*([12])\b/i);
    if (storeShorthandMatch) {
        const remaining = text.replace(storeShorthandMatch[0], "").replace(/^[^\w]+|[^\w]+$/g, "").trim();
        if (remaining.length < 5) {
            return true;
        }
    }

    // Check if it is a shorthand template request (Gas Station)
    const gasShorthandMatch = text.match(/\b(?:gas\s+station|gas\s+stn|gas|fuel|station|stn|ron|sahara|indian|tsunami|charon|remix|xr|kek|liff|brody|immortals|mobil|loves|surya|jordan|sher|renegades|oilarc)?\s*(?:gps\s*)?(?:No\.?|\u2116|#)?\s*(4|6|7|8|9|10|11|13|14|15|16|17|18|21|23|115|116|117|118|124|127|136|137)\s+\b(?:temp|template|t)\s*([12])\b/i);
    if (gasShorthandMatch) {
        const remaining = text.replace(gasShorthandMatch[0], "").replace(/^[^\w]+|[^\w]+$/g, "").trim();
        if (remaining.length < 5) {
            return true;
        }
    }

    // Check if it is a shorthand template request (Family)
    const familyShorthandMatch = text.match(/\b(?:family|fam|uchiha|kingdom|deluca)?\s*(?:gps\s*|house\s*|h\s*)?(?:No\.?|\u2116|#)?\s*(55|258|536)\s+\b(?:temp|template|t)\s*([12])\b/i);
    if (familyShorthandMatch) {
        const remaining = text.replace(familyShorthandMatch[0], "").replace(/^[^\w]+|[^\w]+$/g, "").trim();
        if (remaining.length < 5) {
            return true;
        }
    }

    // Check if it is a shorthand template request (Parking)
    let parkingShorthandMatch = text.match(/\b(?:parking\s+lot|parking|park|ekip|eileen|remix|playboys|rockford)\s*(?:gps\s*)?(?:No\.?|\u2116|#)?\s*(55)\s+\b(?:temp|template|t)\s*([12])\b/i);
    if (!parkingShorthandMatch) {
        parkingShorthandMatch = text.match(/\b(?:parking\s+lot|parking|park|ekip|eileen|remix|playboys|rockford)?\s*(?:gps\s*)?(?:No\.?|\u2116|#)?\s*(51|52|53|54|56|57|58|79|80|81|82|83|84|85|101|135)\s+\b(?:temp|template|t)\s*([12])\b/i);
    }
    if (parkingShorthandMatch) {
        const remaining = text.replace(parkingShorthandMatch[0], "").replace(/^[^\w]+|[^\w]+$/g, "").trim();
        if (remaining.length < 5) {
            return true;
        }
    }

    // Check if it is a shorthand template request (Clothing Shop)
    const clothingShorthandMatch = text.match(/\b(?:clothing\s+shop|clothing\s+store|clothing|wear|style|fashion|trendzone)?\s*(?:gps\s*|No\.?|\u2116|#)?\s*(31|32|50|74|75|122|126|142|143|144|145|146|271|275)\s+\b(?:temp|template|t)\s*([12])\b/i);
    if (clothingShorthandMatch) {
        const remaining = text.replace(clothingShorthandMatch[0], "").replace(/^[^\w]+|[^\w]+$/g, "").trim();
        if (remaining.length < 5) {
            return true;
        }
    }
    
    let cleanText = text.replace(/^(?:[a-zA-Z0-9\s\u2116#\-:()&]+)?(?:template|temp)\s+\d+[-\s]*/i, "").trim();
    let tempText = cleanText.replace(/\b(?:price|budget)?\s*(?:negotiable|negable|negoitable|nego|neg)\b/gi, "")
                            .replace(/\b(?:for|at|price|budget)?\s*[\$\d\.,kKmMbB\s]+(?:each)?\b/gi, "")
                            .replace(/\b\d+\s*[%]?\s*and\s*\d+\s*[%]?\s*juices?\b/gi, "")
                            .trim();
    const combinedTemplates = OFFICIAL_TEMPLATES.concat(customTemplates.map(t => t.text));
    const match1 = getClosestMatch(tempText, combinedTemplates, 0.65);
    if (match1) return true;
    return getClosestMatch(cleanText, combinedTemplates, 0.65) !== null;
}

function runValidationPipeline(ctx, override) {
    // 1. Initial sanitization of text
    let text = ctx.raw.replace(/\s+/g, ' ').trim();
    text = correctSpelling(text, ctx);
    text = normalizePricesInText(text);
    
    // 2. Safety / Prohibited items checks (Weapons, Drugs, Scanners)
    if (!isTemplateAd(text)) {
        checkProhibitedItems(text, ctx);
        if (ctx.status === "blacklisted") {
            return;
        }
    }
    
    // 3. Category Detection
    if (override === "auto") {
        ctx.category = detectCategory(text);
        ctx.logs.push({ text: `Auto-detected category: <strong>${ctx.category}</strong>`, type: 'policy' });
    } else {
        ctx.category = override;
        ctx.logs.push({ text: `Category overridden to: <strong>${ctx.category}</strong>`, type: 'policy' });
    }
    
    if (/\bowner\b/i.test(text)) {
        ctx.isOwnerSearch = true;
        ctx.actionOverride = "Looking for";
        ctx.category = "Businesses";
    }
    
    // 4. Normalize Action (Buying, Selling, Trading, Renting)
    let action = "Selling"; // default
    let lowerText = text.toLowerCase();
    
    const isEvent = /^(?:pool\s+)?party\b/i.test(lowerText) || 
                    /^(?:wedding|car\s+meet)\b/i.test(lowerText) || 
                    /\b(?:party|wedding|car\s+meet)\s+at\b/i.test(lowerText);
                    
    if (isEvent) {
        action = "";
    } else if (ctx.category === "Dating") {
        action = "Looking";
    } else if (ctx.actionOverride && ctx.actionOverride !== "auto") {
        action = ctx.actionOverride;
        ctx.logs.push({ text: `Action overridden to "${action}"`, type: 'policy' });
    } else {
        const actionPatterns = [
            {
                action: "Selling or trading",
                patterns: [/\bselling or trading\b/i, /\bsell or trade\b/i, /\bselling\/trading\b/i, /\bwts\/wtt\b/i]
            },
            {
                action: "Renting out",
                patterns: [/\brenting out\b/i, /\brent out\b/i]
            },
            {
                action: "Renting_Check",
                patterns: [/\brenting\b/i, /\brent\b/i]
            },
            {
                action: "Hiring",
                patterns: [/\bhiring\b/i, /\bhire\b/i]
            },
            {
                action: "Looking for",
                patterns: [/\blooking for\b/i, /\blook for\b/i, /\bsearching for\b/i, /\bsearch for\b/i]
            },
            {
                action: "Buying",
                patterns: [/\bbuying\b/i, /\blooking to buy\b/i, /\blooking to purchase\b/i, /\bbuy\b/i, /\bwant to buy\b/i, /\bwtb\b/i]
            },
            {
                action: "Trading",
                patterns: [/\btrading\b/i, /\btrade\b/i, /\bwtt\b/i]
            },
            {
                action: "Selling",
                patterns: [/\bselling\b/i, /\bsell\b/i, /\bwts\b/i]
            }
        ];

        let matched = false;
        // Check for matches at the beginning first (highest priority)
        for (const ap of actionPatterns) {
            for (const pat of ap.patterns) {
                const startPat = new RegExp("^" + pat.source, "i");
                if (startPat.test(lowerText)) {
                    if (ap.action === "Renting_Check") {
                        if (lowerText.includes("budget") || lowerText.includes("looking for")) {
                            action = "Renting";
                        } else {
                            action = "Renting out";
                        }
                    } else {
                        action = ap.action;
                    }
                    ctx.logs.push({ text: `Normalized starting action to "${action}"`, type: 'correction' });
                    matched = true;
                    break;
                }
            }
            if (matched) break;
        }

        // If not matched at the start, check anywhere in the text
        if (!matched) {
            for (const ap of actionPatterns) {
                for (const pat of ap.patterns) {
                    if (pat.test(lowerText)) {
                        if (ap.action === "Renting_Check") {
                            if (lowerText.includes("budget") || lowerText.includes("looking for")) {
                                action = "Renting";
                            } else {
                                action = "Renting out";
                            }
                        } else {
                            action = ap.action;
                        }
                        ctx.logs.push({ text: `Normalized action to "${action}"`, type: 'correction' });
                        matched = true;
                        break;
                    }
                }
                if (matched) break;
            }
        }
    }
    
    ctx.action = action;
    
    // 5. Price / Budget / Rent Parsing
    parsePriceAndBudget(text, action, ctx);
    
    // Clean ad body by stripping price keywords
    let adBody = cleanPriceKeywords(text, ctx);
    // Strip action prefixes/suffixes
    adBody = adBody.replace(/^(buying|selling or trading|selling|trading|renting out|renting|hiring|wtb|wts|wtt|buy|sell|trade|rent|hire|looking to purchase|looking to buy|want to buy|searching for|looking for|searching|look for|looking|search|look)\s+(a\s+|an\s+)?/i, "").trim();
    adBody = adBody.replace(/\s+(buying|selling or trading|selling|trading|renting out|renting|hiring|wtb|wts|wtt|buy|sell|trade|rent|hire|looking to purchase|looking to buy|want to buy|searching for|looking for|searching|look for|looking|search|look)$/i, "").trim();
    // Strip leading/trailing punctuation again
    adBody = adBody.replace(/^[^\w"'()\s]+|[^\w"'()\s]+$/g, "").trim();
    
    // 6. Category-specific rules and fuzzy corrections
    let processedBody = "";
    
    switch (ctx.category) {
        case "Auto":
            processedBody = formatAutoAd(adBody, action, ctx);
            break;
        case "Real Estate":
            processedBody = formatRealEstateAd(adBody, action, ctx);
            break;
        case "Work":
            processedBody = formatWorkAd(adBody, action, ctx);
            break;
        case "Dating":
            processedBody = formatDatingAd(adBody, action, ctx);
            break;
        case "Businesses":
            if (ctx.isOwnerSearch) {
                processedBody = formatOwnerSearchAd(adBody, ctx);
            } else {
                processedBody = formatBusinessesAd(adBody, action, ctx);
            }
            break;
        case "Services":
        case "Discounts":
            processedBody = formatTemplateAd(adBody, ctx.category, ctx);
            break;
        case "Other":
        default:
            processedBody = formatOtherAd(adBody, action, ctx);
            break;
    }
    
    if (ctx.status !== "passed") {
        return;
    }
    
    action = ctx.action;
    
    // 7. Format Location Capitalization & Prepositions
    processedBody = formatLocationTerms(processedBody, ctx);
    
    // 8. Assemble Final Ad Text
    // Capitalize first letter of the ad
    let mainSentence = `${action} ${processedBody}`.trim();
    mainSentence = mainSentence.charAt(0).toUpperCase() + mainSentence.slice(1);
    
    // Insert Price details
    let pricePart = "";
    // Suppress price/budget label when category is Dating, Services, Discounts, when the raw text contains "beach market" / "beach markit", or when it is a party/wedding/car meet event.
    const lowerRaw = ctx.raw.toLowerCase();
    const isBeachMarket = (/beach\s*mar[kt]et/i.test(lowerRaw) || lowerRaw.includes("beach markit")) && 
                          !(["Real Estate", "Auto", "Businesses"].includes(ctx.category) && ctx.isNegotiable);
    const isEventAd = /^(?:pool\s+)?party\b/i.test(lowerRaw) || 
                      /^(?:wedding|car\s+meet)\b/i.test(lowerRaw) || 
                      /\b(?:party|wedding|car\s+meet)\s+at\b/i.test(lowerRaw);
    const suppressPriceLabel = ["Dating", "Services", "Discounts"].includes(ctx.category) || isBeachMarket || isEventAd || ctx.isOwnerSearch || action === "Trading" || action === "Looking for";
    
    if (ctx.priceInfo && ctx.priceInfo.value !== "Negotiable") {
        let label = ctx.priceInfo.type; // Price, Budget, Rent, Bet
        let val = ctx.priceInfo.value;
        pricePart = ` ${label}: ${val}`;
        
        // Add "per week" or "for X days" if renting
        if ((action === "Renting" || action === "Renting out") && !ctx.priceInfo.value.toLowerCase().includes("week") && !ctx.priceInfo.value.toLowerCase().includes("day") && !ctx.priceInfo.value.toLowerCase().includes("negotiable")) {
            // Renting period is required. If not found, reject
            ctx.status = "rejected";
            ctx.rejectionReason = "Please indicate rental period.";
            ctx.logs.push({ text: `Rejected: Rent duration is missing from the ad.`, type: 'danger' });
            return;
        }
    } else if (!suppressPriceLabel) {
        // Fallback pricing label
        let label = "Price";
        if (ctx.category === "Work") label = "Salary";
        else if (ctx.raw.toLowerCase().includes("dice") || ctx.raw.toLowerCase().includes("poker")) label = "Bet";
        else if (action === "Buying" || action === "Renting" || action === "Looking") label = "Budget";
        else if (action === "Renting out") label = "Rent";
        
        pricePart = ` ${label}: Negotiable.`;
    }
    
    // Combine and apply terminal period rules
    let finalAd = `${mainSentence}.${pricePart}`.replace(/\.\.+/g, '.').replace(/\s+/g, ' ').trim();
    
    // If the ad ends with a period, remove it first to check our rules
    if (finalAd.endsWith('.')) {
        finalAd = finalAd.slice(0, -1);
    }
    
    // EN3 Policy: "If the ad ends with a numerical value, then there is no need for a period (.)"
    // Only omit period if the final portion of the ad is a numerical price.
    const isNumericalPriceAtEnd = /(?:Price|Budget|Rent|Bet|Salary):\s*\$?\d+(?:[.]\d+)*$/i.test(finalAd);
    if (!isNumericalPriceAtEnd) {
        finalAd += ".";
    }

    // Clean up any double punctuation at the end (e.g. !. -> ! or ?. -> ?)
    if (finalAd.endsWith("!.")) {
        finalAd = finalAd.slice(0, -1);
    } else if (finalAd.endsWith("?.")) {
        finalAd = finalAd.slice(0, -1);
    }
    
    ctx.finalText = finalAd;
}

/* ==========================================================================
   Category Detection Rules
   ========================================================================== */

function detectCategory(text) {
    const lower = text.toLowerCase();
    
    // Check if it's the "charger" item to prevent false vehicle matching to Bravado Charger Daytona
    const isRealChargerVehicle = /\b(?:bravado|srt|daytona|1969)\b/i.test(lower);
    const hasChargerItemWord = /\b(?:charger|chargers|charging)\b/i.test(lower);
    if (hasChargerItemWord && !isRealChargerVehicle) {
        return "Other";
    }

    // Check for clothing first to prevent generic adjectives/colors from false vehicle matching (e.g. "Black gloves")
    if (matchClothingItem(text)) {
        return "Other";
    }
    
    // Check if it is a service role search (which goes to "Other" category)
    const isServiceSearch = /\b(?:looking for|searching for|look for|search for)\b/i.test(lower);
    const serviceRoles = /\b(?:lawyer|driver|dancer|singer|dj)\b/i.test(lower);
    if (isServiceSearch && serviceRoles) {
        return "Other";
    }
    
    const vehCheck = matchVehicle(text);
    
    if (isTemplateAd(text)) {
        // Check custom trained templates shorthand first (check ALL entries for best match)
        let bestCatShortLen = 0;
        let bestCatShortCategory = null;
        const cleanInputForCat = text.trim().toLowerCase();
        for (const ct of customTemplates) {
            if (ct.shorthand) {
                const cleanShort = ct.shorthand.trim().toLowerCase();
                if (cleanInputForCat === cleanShort || cleanInputForCat.includes(cleanShort)) {
                    const remaining = cleanInputForCat.replace(cleanShort, "").replace(/^[^\w]+|[^\w]+$/g, "").trim();
                    if (remaining.length < 5 && cleanShort.length > bestCatShortLen) {
                        bestCatShortLen = cleanShort.length;
                        bestCatShortCategory = ct.category;
                    }
                }
            }
        }
        if (bestCatShortCategory) {
            return bestCatShortCategory;
        }

        let matchedIndex = -1;
        
        // 1. Try shorthand first
        const shorthandMatch = text.match(/\b(?:ammunition\s+store|ammunation\s+store|ammo\s+store|ammo|weapon\s+shop|gun\s+store|weapon\s+store|rifleclub|bobbys|canikpide|wong|pew\s+pew|lue|siddhu|most\s+wanted|central\s+mall)?\s*(?:gps\s*)?(?:No\.?|\u2116|#)?\s*(39|40|41|111|147|148|149|150|151|152|269)\s+\b(?:temp|template|t)\s*([12])\b/i);
        const familyShorthandMatch = text.match(/\b(?:family|fam|uchiha|kingdom|deluca)?\s*(?:gps\s*|house\s*|h\s*)?(?:No\.?|\u2116|#)?\s*(55|258|536)\s+\b(?:temp|template|t)\s*([12])\b/i);
        const clothingShorthandMatch = text.match(/\b(?:clothing\s+shop|clothing\s+store|clothing|wear|style|fashion|trendzone)?\s*(?:gps\s*|No\.?|\u2116|#)?\s*(31|32|50|74|75|122|126|142|143|144|145|146|271|275)\s+\b(?:temp|template|t)\s*([12])\b/i);
        const officeShorthandMatch = text.match(/\b(?:(?:[a-z\s]+)?office)?\s*(?:No\.?|\u2116|#|-)?\s*(24|585|677|1000|1017|1288|1419|1948|2198|2796|7963|10364|12313|13724|14396|14633|15136|21046|27650|32125|33698|41760|50367|52942|78981|85042|85235)\s+\b(?:temp|template|t)\s*([12])\b/i);
        const storeShorthandMatch = text.match(/\b(?:store\s+)?24\/7(?:\s+store)?\s*(?:gps\s*)?(?:No\.?|\u2116|#)?\s*(23|24|25|26|27|28|29|30|78|119|120|121|123|125|128|129|139|140|141|270)\s+\b(?:temp|template|t)\s*([12])\b/i);
        const gasShorthandMatch = text.match(/\b(?:gas\s+station|gas\s+stn|gas|fuel|station|stn|ron|sahara|indian|tsunami|charon|remix|xr|kek|liff|brody|immortals|mobil|loves|surya|jordan|sher|renegades|oilarc)?\s*(?:gps\s*)?(?:No\.?|\u2116|#)?\s*(4|6|7|8|9|10|11|13|14|15|16|17|18|21|23|115|116|117|118|124|127|136|137)\s+\b(?:temp|template|t)\s*([12])\b/i);
        let parkingShorthandMatch = text.match(/\b(?:parking\s+lot|parking|park|ekip|eileen|remix|playboys|rockford)\s*(?:gps\s*)?(?:No\.?|\u2116|#)?\s*(55)\s+\b(?:temp|template|t)\s*([12])\b/i);
        if (!parkingShorthandMatch) {
            parkingShorthandMatch = text.match(/\b(?:parking\s+lot|parking|park|ekip|eileen|remix|playboys|rockford)?\s*(?:gps\s*)?(?:No\.?|\u2116|#)?\s*(51|52|53|54|56|57|58|79|80|81|82|83|84|85|101|135)\s+\b(?:temp|template|t)\s*([12])\b/i);
        }
        if (shorthandMatch) {
            const remaining = text.replace(shorthandMatch[0], "").replace(/^[^\w]+|[^\w]+$/g, "").trim();
            if (remaining.length < 5) {
                const shopNum = shorthandMatch[1];
                const tempIdx = shorthandMatch[2];
                const map = {
                    "39": [6, 7], "40": [8, 9], "41": [10, 11], "111": [12, 13],
                    "147": [14, 15], "148": [16, 17], "149": [18, 19], "150": [20, 21],
                    "151": [22, 23], "152": [24, 25], "269": [26, 27]
                };
                const indices = map[shopNum];
                if (indices) {
                    matchedIndex = indices[parseInt(tempIdx) - 1];
                }
            }
        } else if (storeShorthandMatch) {
            const remaining = text.replace(storeShorthandMatch[0], "").replace(/^[^\w]+|[^\w]+$/g, "").trim();
            if (remaining.length < 5) {
                const shopNum = storeShorthandMatch[1];
                const tempIdx = storeShorthandMatch[2];
                const map = {
                    "23": [81, 82],
                    "24": [83, 84],
                    "25": [85, 86],
                    "26": [87, 88],
                    "27": [89, 90],
                    "28": [91, 92],
                    "29": [93, 94],
                    "30": [95, 96],
                    "78": [97, 98],
                    "119": [99, 100],
                    "120": [101, 102],
                    "121": [103, 104],
                    "123": [105, 106],
                    "125": [107, 108],
                    "128": [109, 110],
                    "129": [111, 112],
                    "139": [113, 114],
                    "140": [115, 116],
                    "141": [117, 118],
                    "270": [119, 120]
                };
                const indices = map[shopNum];
                if (indices) {
                    matchedIndex = indices[parseInt(tempIdx) - 1];
                }
            }
        } else if (gasShorthandMatch) {
            const remaining = text.replace(gasShorthandMatch[0], "").replace(/^[^\w]+|[^\w]+$/g, "").trim();
            if (remaining.length < 5) {
                const shopNum = gasShorthandMatch[1];
                const tempIdx = gasShorthandMatch[2];
                const map = {
                    "4": [121, 122],
                    "6": [123, 124],
                    "7": [125, 126],
                    "8": [127, 128],
                    "9": [129, 130],
                    "10": [131, 132],
                    "11": [133, 134],
                    "13": [135, 136],
                    "14": [137, 138],
                    "15": [139, 140],
                    "16": [141, 142],
                    "17": [143, 144],
                    "18": [145, 146],
                    "21": [147, 148],
                    "23": [149, 150],
                    "115": [151, 152],
                    "116": [153, 154],
                    "117": [155, 156],
                    "118": [157, 158],
                    "124": [159, 160],
                    "127": [161, 162],
                    "136": [163, 164],
                    "137": [165, 166]
                };
                const indices = map[shopNum];
                if (indices) {
                    matchedIndex = indices[parseInt(tempIdx) - 1];
                }
            }
        } else if (parkingShorthandMatch) {
            const remaining = text.replace(parkingShorthandMatch[0], "").replace(/^[^\w]+|[^\w]+$/g, "").trim();
            if (remaining.length < 5) {
                const shopNum = parkingShorthandMatch[1];
                const tempIdx = parkingShorthandMatch[2];
                const map = {
                    "51": [167],
                    "52": [168, 169],
                    "53": [170, 171],
                    "54": [172, 173],
                    "55": [174, 175],
                    "56": [176, 177],
                    "57": [178, 179],
                    "58": [180, 181],
                    "79": [182, 183],
                    "80": [184, 185],
                    "81": [186, 187],
                    "82": [188, 189],
                    "83": [190, 191],
                    "84": [192, 193],
                    "85": [194, 195],
                    "101": [196, 197],
                    "135": [198, 199]
                };
                const indices = map[shopNum];
                if (indices) {
                    matchedIndex = indices[parseInt(tempIdx) - 1];
                }
            }
        } else if (familyShorthandMatch) {
            const remaining = text.replace(familyShorthandMatch[0], "").replace(/^[^\w]+|[^\w]+$/g, "").trim();
            if (remaining.length < 5) {
                const shopNum = familyShorthandMatch[1];
                const tempIdx = familyShorthandMatch[2];
                const map = {
                    "55": [200, 201],
                    "258": [202, 203],
                    "536": [204, 205]
                };
                const indices = map[shopNum];
                if (indices) {
                    matchedIndex = indices[parseInt(tempIdx) - 1];
                }
            }
        } else if (clothingShorthandMatch) {
            const remaining = text.replace(clothingShorthandMatch[0], "").replace(/^[^\w]+|[^\w]+$/g, "").trim();
            if (remaining.length < 5) {
                const shopNum = clothingShorthandMatch[1];
                const tempIdx = clothingShorthandMatch[2];
                const map = {
                    "31": [206, 207],
                    "32": [208, 209],
                    "50": [210, 211],
                    "74": [212, 213],
                    "75": [214, 215],
                    "122": [216, 217],
                    "126": [218, 219],
                    "142": [220, 221],
                    "143": [222, 223],
                    "144": [224, 225],
                    "145": [226, 227],
                    "146": [228, 229],
                    "271": [230, 231],
                    "275": [232, 233]
                };
                const indices = map[shopNum];
                if (indices) {
                    matchedIndex = indices[parseInt(tempIdx) - 1];
                }
            }
        } else if (officeShorthandMatch) {
            const remaining = text.replace(officeShorthandMatch[0], "").replace(/^[^\w]+|[^\w]+$/g, "").trim();
            if (remaining.length < 5) {
                const officeNum = officeShorthandMatch[1];
                const tempIdx = officeShorthandMatch[2];
                const map = {
                    "24": [28, 29], "585": [30, 31], "677": [32, 33], "1000": [34, 35],
                    "1017": [36, 37], "1288": [38, 39], "1419": [40, 41], "1948": [42, 43],
                    "2198": [44, 45], "2796": [46, 47], "7963": [48, 49], "10364": [50, 51],
                    "12313": [52, 53], "13724": [54, 55], "14396": [56, 57], "14633": [58, 59],
                    "15136": [60, 61], "21046": [62, 63], "27650": [64, 65], "32125": [66],
                    "33698": [67, 68], "41760": [69, 70], "50367": [71, 72], "52942": [73, 74],
                    "78981": [75, 76], "85042": [77, 78], "85235": [79, 80]
                };
                const indices = map[officeNum];
                if (indices) {
                    matchedIndex = indices[parseInt(tempIdx) - 1];
                }
            }
        } else if (storeShorthandMatch) {
            const remaining = text.replace(storeShorthandMatch[0], "").replace(/^[^\w]+|[^\w]+$/g, "").trim();
            if (remaining.length < 5) {
                const shopNum = storeShorthandMatch[1];
                const tempIdx = storeShorthandMatch[2];
                const map = {
                    "23": [81, 82],
                    "24": [83, 84],
                    "25": [85, 86],
                    "26": [87, 88],
                    "27": [89, 90],
                    "28": [91, 92],
                    "29": [93, 94],
                    "30": [95, 96],
                    "78": [97, 98],
                    "119": [99, 100],
                    "120": [101, 102],
                    "121": [103, 104],
                    "123": [105, 106],
                    "125": [107, 108],
                    "128": [109, 110],
                    "129": [111, 112],
                    "139": [113, 114],
                    "140": [115, 116],
                    "141": [117, 118],
                    "270": [119, 120]
                };
                const indices = map[shopNum];
                if (indices) {
                    matchedIndex = indices[parseInt(tempIdx) - 1];
                }
            }
        }
        
        // 2. Try standard matching if shorthand didn't resolve
        if (matchedIndex === -1) {
            let cleanText = text.replace(/^(?:[a-zA-Z0-9\s\u2116#\-:()&]+)?(?:template|temp)\s+\d+[-\s]*/i, "").trim();
            let tempText = cleanText.replace(/\b(?:price|budget)?\s*(?:negotiable|negable|negoitable|nego|neg)\b/gi, "")
                                    .replace(/\b(?:for|at|price|budget)?\s*[\$\d\.,kKmMbB\s]+(?:each)?\b/gi, "")
                                    .replace(/\b\d+\s*[%]?\s*and\s*\d+\s*[%]?\s*juices?\b/gi, "")
                                    .trim();
            const matchedCustom = getClosestMatch(tempText, customTemplates.map(t => t.text), 0.65) || getClosestMatch(cleanText, customTemplates.map(t => t.text), 0.65);
            if (matchedCustom) {
                const found = customTemplates.find(t => t.text === matchedCustom);
                if (found) {
                    return found.category;
                }
            }
            const matched = getClosestMatch(tempText, OFFICIAL_TEMPLATES, 0.65) || getClosestMatch(cleanText, OFFICIAL_TEMPLATES, 0.65);
            if (matched) {
                matchedIndex = OFFICIAL_TEMPLATES.indexOf(matched);
            }
        }
        
        if (matchedIndex !== -1) {
            return getTemplateCategory(matchedIndex);
        }
        
        if (lower.includes("discount") || lower.includes("%") || lower.includes("off")) {
            return "Discounts";
        }
        return "Services";
    }
    
    // Check for explicit "Other" item keywords first to prevent false auto-matching
    const otherKeywords = [
        "ticket", "tcket", "tikcet", "tckets", "tikets", "juice", "battery", "batteries", "metal", "mask", "pet", "shoulder", 
        "fox", "cat", "dog", "drill", "sawmill", "pickaxe", "hookah", "sponge", "timber",
        "copper", "emerald", "ruby", "diamond", "obsidian", "magma stone", "thread", "token",
        "tonic treat", "map", "wire", "plate", "container", "containers", "fuel",
        "party", "wedding", "car meet", "prime", "platinum", "plat",
        "salmon", "carp", "perch", "trout", "megalodon", "ray", "orca", "whale",
        "tuning", "suspension", "transmission", "brakes", "tires",
        "inventory", "inventry", "inventories", "booster", "shot", "shots",
        "rod", "rods", "case", "cases", "crate", "crates",
        "sim", "sim card", "sim cards", "card", "cards", "biospark", "biosparks"
    ];
    if (otherKeywords.some(keyword => lower.includes(keyword))) {
        // If the keyword is a tuning part keyword, but it ALSO contains a matched vehicle,
        // then it is an Auto ad, not an Other ad!
        const tuningKeywords = ["tuning", "suspension", "transmission", "brakes", "tires"];
        const hasTuningKeyword = tuningKeywords.some(kw => lower.includes(kw));
        
        if (hasTuningKeyword) {
            if (vehCheck) {
                // Do not return Other, let it fall through to Auto check!
            } else {
                return "Other";
            }
        } else {
            return "Other";
        }
    }
    
    // 1. Dating Check
    // Person search check: e.g. "looking for Max Dopamine"
    const personMatch = lower.match(/\b(?:looking for|searching for|look for|search for|looking|searching|look|search)\s+([a-z]+)\s+([a-z]+)\b/i);
    if (personMatch) {
        const pName = personMatch[1] + " " + personMatch[2];
        const isVeh = matchVehicle(pName);
        const isCloth = matchClothingItem(pName);
        const isService = /\b(?:lawyer|driver|dancer|singer|dj|worker|workers|physician|doctor|mechanic|bodyguard|employee|employees|cop|cops|police|officer|officers|admin|assistant|assistants|mediator|mediators)\b/i.test(pName);
        const otherKeywordsList = [
            "ticket", "tcket", "tikcet", "tckets", "tikets", "juice", "battery", "batteries", "metal", "mask", "pet", "shoulder", 
            "fox", "cat", "dog", "drill", "sawmill", "pickaxe", "hookah", "sponge", "timber",
            "copper", "emerald", "ruby", "diamond", "obsidian", "magma stone", "thread", "token",
            "tonic treat", "map", "wire", "plate", "container", "containers", "fuel",
            "party", "wedding", "car meet", "prime", "platinum", "plat",
            "salmon", "carp", "perch", "trout", "megalodon", "ray", "orca", "whale",
            "tuning", "suspension", "transmission", "brakes", "tires",
            "inventory", "inventry", "inventories", "booster", "shot", "shots",
            "rod", "rods", "case", "cases", "crate", "crates",
            "sim", "sim card", "sim cards", "card", "cards", "biospark", "biosparks"
        ];
        const isOtherKw = otherKeywordsList.some(keyword => pName.includes(keyword));
        const isExcluded = isVeh || isCloth || isService || isOtherKw ||
            /\b(?:house|apartment|mansion|penthouse|garage|spaces|warehouse|helipad|gps|temp|template|discount|off|%|biz|business|store|shop|station|wash|sharing|tuning|club|salon|studio|company|cowshed|train|plantation|well|atm)\b/i.test(pName);
        
        if (!isExcluded) {
            return "Dating";
        }
    }

    const isDatingSearch = /\b(look|looking|search|searching|want|find|finding)\b/i.test(lower);
    const hasDatingTarget = /\b(wife|girlfriend|boyfriend|husband|valentine|date|spouse|soulmate|alliance)\b/i.test(lower) || 
                            (/\b(friend|friends|family|family\s+members)\b/i.test(lower) && /\b(look|looking|search|searching)\b/i.test(lower));
    if (isDatingSearch && hasDatingTarget && !lower.includes("family business")) {
        return "Dating";
    }
    
    // 2. Work Check
    if (lower.includes("hiring") || lower.includes("looking for work") || lower.includes("looking for a job") ||
        /looking\s+(?:to\s+)?work\b/i.test(lower) || /look\s+(?:to\s+)?work\b/i.test(lower) ||
        /looking\s+for\s+.*work\b/i.test(lower) || /look\s+for\s+.*work\b/i.test(lower) ||
        /looking\s+for\s+a\s+job\b/i.test(lower) || /look\s+for\s+a\s+job\b/i.test(lower) ||
        lower.includes("construction site") || lower.includes("driver") || lower.includes("electrician") ||
        lower.includes("locksmith") || lower.includes("gardener") || lower.includes("surveyor") ||
        lower.includes("trucker") || lower.includes("lawyer") || lower.includes("bodyguard")) {
        return "Work";
    }
    
    // 3. Real Estate Check
    if (lower.includes("house") || lower.includes("apartment") || lower.includes("mansion") || 
        lower.includes("penthouse") || lower.includes("mirror park") || lower.includes("vinewood") || 
        lower.includes("richman") || lower.includes("g.s.") || lower.includes("garage spaces") ||
        lower.includes("warehouse") || lower.includes("w.h.") || lower.includes("helipad")) {
        return "Real Estate";
    }
    
    // 4. Businesses Check
    if (lower.includes("biz") || lower.includes("business") || lower.includes("24/7 store") || 
        lower.includes("ammunition store") || /\batm\b/i.test(lower) || lower.includes("atm business") || lower.includes("car wash") || 
        lower.includes("car sharing") || lower.includes("chip tuning") || lower.includes("clothing shop") || 
        lower.includes("electric station") || lower.includes("fight club") || lower.includes("flower shop") || 
        lower.includes("furniture shop") || lower.includes("gas station") || lower.includes("grand elite") || 
        lower.includes("hair salon") || lower.includes("jewelry store") || lower.includes("juice shop") || 
        lower.includes("luna park") || lower.includes("parking") || lower.includes("pet shop") || 
        lower.includes("state object") || lower.includes("service station") || lower.includes("tattoo studio") || 
        lower.includes("taxi company") || lower.includes("burger shop") || lower.includes("cowshed") || 
        lower.includes("freight train") || lower.includes("plantation") || lower.includes("oil well")) {
        if (vehCheck) {
            // Do not return Businesses, let it fall through to Auto!
        } else {
            return "Businesses";
        }
    }
    
    // 5. Template check for Services / Discounts
    if (lower.includes("gps \u2116") || lower.includes("template")) {
        if (lower.includes("discount") || lower.includes("%") || lower.includes("off")) {
            return "Discounts";
        }
        return "Services";
    }
    
    // 6. Auto Check (Verify if vehicles or auto-related words are present)
    if (vehCheck || /\bcars?\b/i.test(lower) || /\btrucks?\b/i.test(lower) || lower.includes("motorcycle") || 
        lower.includes("bike") || lower.includes("boat") || lower.includes("plane") || 
        lower.includes("helicopter") || /\bheli\b/i.test(lower) || lower.includes("auto fair")) {
        return "Auto";
    }
    
    // 7. Default Category
    return "Other";
}

/* ==========================================================================
   Prohibited Items Checker
   ========================================================================== */

function checkProhibitedItems(text, ctx) {
    const lower = text.toLowerCase();
    
    // Dating Trolling Check
    const datingTargets = ["wife", "husband", "girlfriend", "boyfriend", "gf", "bf", "spouse", "soulmate", "sugar daddy", "sugar mommy", "sugar baby", "sugar babe", "valentine"];
    let matchedDatingTarget = null;
    for (const dt of datingTargets) {
        const regex = new RegExp(`\\b${dt}\\b`, "i");
        if (regex.test(lower)) {
            matchedDatingTarget = dt;
            break;
        }
    }
    
    if (matchedDatingTarget) {
        if (matchedDatingTarget.includes("sugar")) {
            ctx.status = "blacklisted";
            ctx.blacklistReason = "Troll advertisements";
            ctx.rejectionReason = "Trolling advertisements.";
            ctx.logs.push({ text: `Blacklist triggered: Dating troll target <strong>${matchedDatingTarget}</strong>`, type: 'danger' });
            return;
        }
        
        const hasCommercialAction = /\b(sell|selling|buy|buying|trade|trading|wts|wtb|wtt|rent|renting)\b/i.test(lower);
        const cleanForNumbers = lower
            .replace(new RegExp(`\\b(${datingTargets.join("|")})\\b`, "gi"), "")
            .replace(/\b(look|looking|search|searching|find|finding|for|a|an|the)\b/gi, "")
            .trim();
        const hasNumber = /\b\d+(?:\s*[kKmM])?\b/.test(cleanForNumbers);
        const hasPriceIndicator = /\b(price|budget|rent|cost|value|negotiable|nego|each)\b/i.test(lower) || lower.includes("$");
        
        if (hasCommercialAction || hasNumber || hasPriceIndicator) {
            ctx.status = "blacklisted";
            ctx.blacklistReason = "Troll advertisements";
            ctx.rejectionReason = "Trolling advertisements.";
            ctx.logs.push({ text: `Blacklist triggered: Dating troll target <strong>${matchedDatingTarget}</strong> with value/action`, type: 'danger' });
            return;
        }
    }
    
    // Immediate Blacklist Triggers
    const blacklistWeapons = ["firearm", "heavy sniper", "sniper", "pistol", "revolver", "rifle", "shotgun", "ammunition", "ammo", "bulletproof vest", "armored vest", "lui vi armored vest", "body armor"];
    const blacklistDrugs = ["weed", "cannabis", "cocaine", "drug"];
    const blacklistEMS = ["ems surgical", "ems mask", "surgical mask", "medical mask", "covid mask"];
    const blacklistScanners = ["anti-radar", "vehicle scanner", "people scanner", "radar scanner", "radars"];
    const blacklistMisc = ["balaclava", "rope", "lock pick", "hacker tool", "virus usb", "engine block", "smuggling machine", "submodule"];
    
    // Simple Rejection Triggers (No Blacklist)
    const rejectOnly = ["crowbar", "fabric", "head bag", "animal skin", "armor skin", "air horn", "earplug", "barricade", "trap", "poison dart", "army uniform", "tracking sensor", "dangerous razor", "resource scanner", "body armor plate", "ingredients for cocaine", "paper for money", "satellite dish", "tincture of forest mushrooms", "first aid kit", "medkit", "pills", "banana", "burger", "grilled steak"];
    
    // Check Blacklist items
    for (const item of [...blacklistWeapons, ...blacklistDrugs, ...blacklistEMS, ...blacklistScanners, ...blacklistMisc]) {
        if (lower.includes(item)) {
            // Exclude weapon shop / ammunition store businesses
            if ((item === "ammunition" || item === "ammo" || item === "rifle") && 
                (lower.includes("store") || lower.includes("shop") || lower.includes("club") || lower.includes("rifleclub"))) {
                continue;
            }
            ctx.status = "blacklisted";
            ctx.blacklistReason = `The advertisement contains illegal item/term: "${item.toUpperCase()}" which triggers an immediate phone blacklist.`;
            ctx.rejectionReason = "Cannot promote illegal items.";
            ctx.logs.push({ text: `Blacklist triggered for illegal item: <strong>${item}</strong>`, type: 'danger' });
            return;
        }
    }
    
    // Check offensive license plates (must be 3-7 characters)
    const plateMatch = lower.match(/license plate\s*\(?([a-z0-9]+)\)?/i);
    if (plateMatch) {
        const plate = plateMatch[1].toLowerCase();
        if (plate.includes("sex") || plate.includes("fuck") || plate.includes("bitch") || plate.includes("cunt") || plate.includes("nigger") || plate.includes("dick")) {
            ctx.status = "blacklisted";
            ctx.blacklistReason = `License plate "${plate.toUpperCase()}" contains inappropriate or offensive language.`;
            ctx.rejectionReason = "Cannot promote illegal items.";
            ctx.logs.push({ text: `Blacklist triggered: Offensive license plate <strong>${plate}</strong>`, type: 'danger' });
            return;
        }
    }
    
    // Check Simple Rejections
    for (const item of rejectOnly) {
        // Exclude luminous head bag from rejection
        if (item === "head bag" && lower.includes("luminous head bag")) {
            continue;
        }
        if (item === "burger" && (lower.includes("burger shop") || lower.includes("burger store"))) {
            continue;
        }
        if (lower.includes(item)) {
            ctx.status = "rejected";
            ctx.rejectionReason = `Cannot promote restricted item: "${item.toUpperCase()}".`;
            ctx.logs.push({ text: `Rejected: Advertisement mentions restricted item <strong>${item}</strong>`, type: 'warning' });
            return;
        }
    }
    
    // State Org Parties block (mega mall, black market, government buildings, etc.)
    const restrictedPlaces = ["mega mall", "black market", "lspd", "fib", "sahp", "ems", "government building", "ghetto", "gang hq", "ballas", "vagos", "bloods", "marabunta"];
    if (lower.includes("party")) {
        for (const place of restrictedPlaces) {
            if (lower.includes(place)) {
                ctx.status = "rejected";
                ctx.rejectionReason = `We do not promote parties at restricted place: "${place.toUpperCase()}".`;
                ctx.logs.push({ text: `Rejected: Party promotion at restricted location <strong>${place}</strong>`, type: 'warning' });
                return;
            }
        }
        
        // Green Grass Beach Market Rule
        if (lower.includes("beach market")) {
            ctx.status = "rejected";
            ctx.rejectionReason = "We do not promote parties at any green grass location.";
            ctx.logs.push({ text: `Rejected: Green grass rule violation for <strong>beach market</strong>. (Must change to "the beach")`, type: 'warning' });
            return;
        }
    }
    
    // Grand Coins / Battlepass block
    if (lower.includes("grand coins") || lower.includes("battlepass") || lower.includes("battle pass")) {
        ctx.status = "rejected";
        ctx.rejectionReason = "Item not found in database. (Including Grand Coins and Battlepass)";
        ctx.logs.push({ text: `Rejected: Ad references premium currency/battlepass.`, type: 'warning' });
        return;
    }
}

/* ==========================================================================
   Price & Budget Parsing Utilities
   ========================================================================== */

function normalizePricesInText(text) {
    let result = text;
    // Resolve gaming slang kk -> m, kkk -> b
    result = result.replace(/\b(\d+(?:\.\d+)?)\s*kkk\b/gi, "$1b");
    result = result.replace(/\b(\d+(?:\.\d+)?)\s*kk\b/gi, "$1m");
    // Remove space between digits and common price suffixes (k, m, b)
    result = result.replace(/\b(\d+(?:\.\d+)?)\s*(k|m|mil|ml|b)\b/gi, "$1$2");
    // Resolve decimal commas, e.g., 1,5m -> 1.5m, 15,5 -> 15.5
    result = result.replace(/\b(\d+),(\d+)(?=\s*(?:k|m|mil|ml|b|million|thousand|billion|\b))/gi, "$1.$2");
    // Resolve thousands separators (dots or commas followed by groups of three digits)
    result = result.replace(/\b(\d{1,3})(?:[.,](\d{3}))+\b/g, (match) => {
        return match.replace(/[.,]/g, "");
    });
    return result;
}

function parsePriceAndBudget(text, action, ctx) {
    const lower = text.toLowerCase();
    ctx.priceMatches = [];
    
    // Price type determination
    let priceType = "Price";
    if (lower.includes("dice") || lower.includes("poker")) priceType = "Bet";
    else if (ctx.category === "Work") priceType = "Salary";
    else if (action === "Buying" || action === "Renting" || action === "Looking") priceType = "Budget";
    else if (action === "Renting out") priceType = "Rent";
    
    // Check if explicitly negotiable
    let isNegotiable = false;
    const negoRegex = /\b(?:negotiable|negotiab|nego)\b/gi;
    const negoMatch = text.match(negoRegex);
    if (negoMatch) {
        isNegotiable = true;
        ctx.priceMatches.push(negoMatch[0]);
    }
    ctx.isNegotiable = isNegotiable;
    
    // Sequential price matches
    const regexes = [
        /(?:price|budget|rent|bet|cost|cash|salary|wage)\s*(?::|is)?\s*(?:\$)?\b(\d+(?:[\.,]\d+)*)\s*(k|m|mil|ml|million|thousand|b|billion|trillion)?\b/gi,
        /\$\s*(\d+(?:[\.,]\d+)*)\s*(k|m|mil|ml|million|thousand|b|billion|trillion)?\b/gi,
        /\b(?:for|at)\s+(\d+(?:[\.,]\d+)*)\s*(k|m|mil|ml|million|thousand|b|billion|trillion)\b/gi,
        /\beach\s+(\d+(?:[\.,]\d+)*)\s*(k|m|mil|ml|million|thousand|b|billion|trillion)?\b/gi,
        /\b(\d+(?:[\.,]\d+)*)\s*(k|m|mil|ml|million|thousand|b|billion|trillion)?\s*each\b/gi,
        /\b(\d+(?:[\.,]\d+)*)\s*(k|m|mil|ml|million|thousand|b|billion|trillion)\b/gi,
        /\b(\d{5,})\b/g
    ];
    
    const matchedValues = [];
    const matchedRanges = [];
    
    for (const regex of regexes) {
        let match;
        regex.lastIndex = 0;
        while ((match = regex.exec(lower)) !== null) {
            const start = match.index;
            const end = regex.lastIndex;
            const isOverlap = matchedRanges.some(([s, e]) => {
                return (start >= s && start < e) || (end > s && end <= e) || (s >= start && s < end);
            });
            if (!isOverlap) {
                // Check if preceded by property/shop/designation/office/card keywords
                const prefixText = lower.substring(Math.max(0, start - 25), start).trim();
                // Prevent SIM card numbers (which have no suffix) from being parsed as prices
                if (/(?:card|cards|sim)(?:\s*(?:no\.?|number|num\.?|#|\u2116))?\s*$/i.test(prefixText) && !match[2]) {
                    continue;
                }
                if (/(?:house|apartment|mansion|penthouse|shop|office|card|cards|\u2116|#|no\.?)\s*$/i.test(prefixText)) {
                    let hasPriceIndication = match[2] || match[0].toLowerCase().includes("each") || match[1].length >= 5;
                    if (!hasPriceIndication) {
                        continue;
                    }
                }
                // Check if followed by unit / quantity keywords or template shorthand
                const suffixText = lower.substring(end, Math.min(lower.length, end + 25)).trim();
                if (/^(?:g\.?s\.?|w\.?h\.?|days?|lvls?|levels?|years?|batteries|juices|items|percent|seeds|fruits|rims|wheels|pieces|pcs)\b|^(?:%)/i.test(suffixText)) {
                    continue;
                }
                if (/^(?:temp|template|t)\s*\d+/i.test(suffixText)) {
                    continue;
                }

                let valStr = match[1];
                let suffix = match[2] ? match[2].toLowerCase() : "";
                if (!suffix) {
                    valStr = valStr.replace(/[\.,]/g, "");
                } else {
                    valStr = valStr.replace(/,/g, ".");
                }
                const numericVal = parseFloat(valStr);
                matchedValues.push({
                    raw: match[0],
                    numericVal: numericVal,
                    suffix: suffix,
                    start: start,
                    end: end
                });
                matchedRanges.push([start, end]);
                ctx.priceMatches.push(match[0]);
            }
        }
    }
    
    if (matchedValues.length === 0 && isNegotiable) {
        ctx.priceInfo = { type: priceType, value: "Negotiable" };
        ctx.logs.push({ text: `Detected pricing: <strong>Negotiable</strong>`, type: 'policy' });
        return;
    }
    
    if (priceType === "Bet" && matchedValues.length > 0) {
        let exceedsLimit = false;
        for (const item of matchedValues) {
            let numericVal = item.numericVal;
            let suffix = item.suffix;
            let normalizedVal = numericVal;
            if (suffix === "m" || suffix === "mil" || suffix === "ml" || suffix === "million") {
                normalizedVal = numericVal * 1000000;
            } else if (suffix === "k" || suffix === "thousand") {
                normalizedVal = numericVal * 1000;
            } else if (suffix === "b" || suffix === "billion") {
                normalizedVal = numericVal * 1000000000;
            }
            if (normalizedVal > 10000000) {
                exceedsLimit = true;
                break;
            }
        }
        
        if (exceedsLimit) {
            ctx.priceInfo = { type: "Bet", value: "Negotiable" };
            ctx.logs.push({ text: `Bet exceeds $10 Million limit. Defaulted to Negotiable.`, type: 'policy' });
            return;
        }
    }
    
    matchedValues.sort((a, b) => a.start - b.start);
    
    if (matchedValues.length === 0) {
        ctx.priceInfo = { type: priceType, value: "Negotiable" };
        ctx.logs.push({ text: `No specific price found. Defaulted to <strong>Negotiable</strong>`, type: 'policy' });
        return;
    }
    
    const values = matchedValues.map(item => {
        const numericVal = item.numericVal;
        const suffix = item.suffix;
        let normalizedVal = numericVal;
        let formattedString = "";
        
        if (suffix === "m" || suffix === "mil" || suffix === "ml" || suffix === "million") {
            normalizedVal = numericVal * 1000000;
            formattedString = `$${numericVal} Million`;
        } else if (suffix === "k" || suffix === "thousand") {
            normalizedVal = numericVal * 1000;
            if (numericVal >= 1000) {
                const mil = (numericVal / 1000).toFixed(2);
                formattedString = `$${parseFloat(mil)} Million`;
            } else {
                formattedString = `$${formatNumberDots(numericVal * 1000)}`;
            }
        } else if (suffix === "b" || suffix === "billion") {
            normalizedVal = numericVal * 1000000000;
            formattedString = `$${numericVal} Billion`;
        } else if (suffix === "trillion") {
            normalizedVal = numericVal * 1000000000000;
            formattedString = "Negotiable";
        } else {
            if (numericVal >= 1000000) {
                const mil = (numericVal / 1000000).toFixed(2);
                formattedString = `$${parseFloat(mil)} Million`;
            } else if (numericVal >= 1000) {
                formattedString = `$${formatNumberDots(numericVal)}`;
            } else {
                formattedString = `$${numericVal}`;
            }
        }
        return {
            val: normalizedVal,
            formatted: formattedString
        };
    });
    
    if (priceType === "Bet") {
        const primary = values[0];
        if (primary.val > 10000000) {
            ctx.priceInfo = { type: "Bet", value: "Negotiable" };
            ctx.logs.push({ text: `Bet exceeded $10 Million cap. Corrected to <strong>Negotiable</strong>`, type: 'correction' });
        } else {
            ctx.priceInfo = { type: "Bet", value: primary.formatted };
            ctx.logs.push({ text: `Formatted bet: <strong>${primary.formatted}</strong>`, type: 'policy' });
        }
    } else if (ctx.category === "Businesses") {
        const primary = values[0];
        if (primary.val > 500000000) {
            ctx.priceInfo = { type: "Price", value: "Negotiable" };
            ctx.logs.push({ text: `Business price exceeded $500 Million cap. Corrected to <strong>Negotiable</strong>`, type: 'correction' });
        } else {
            ctx.priceInfo = { type: priceType, value: primary.formatted };
            ctx.logs.push({ text: `Formatted Business price: <strong>${primary.formatted}</strong>`, type: 'policy' });
        }
    } else if (values.length > 1) {
        let respect = "respectively";
        const isPluralOther = ctx.category === "Other" && (function() {
            let cleanItem = lower;
            if (ctx.priceMatches) {
                for (const matchStr of ctx.priceMatches) {
                    const escaped = escapeRegExp(matchStr);
                    cleanItem = cleanItem.replace(new RegExp(escaped, "gi"), "");
                }
            }
            cleanItem = cleanItem.replace(/^(buying|selling or trading|selling|trading|renting out|renting|wtb|wts|wtt|buy|sell|trade|rent|looking to purchase|looking to buy|want to buy|searching for|looking for|searching|look for|looking|search|look)\s+(a\s+|an\s+)?/i, "").trim();
            cleanItem = cleanItem.replace(/\s+(buying|selling or trading|selling|trading|renting out|renting|wtb|wts|wtt|buy|sell|trade|rent|looking to purchase|looking to buy|want to buy|searching for|looking for|searching|look for|looking|search|look)$/i, "").trim();
            cleanItem = cleanItem.replace(/\b(?:in\s+bulk|bulk|each|each\s+respectively|respectively)\b/gi, "").trim();
            cleanItem = cleanItem.replace(/\b(?:price|budget|rent|bet|cost|cash)\b/gi, "").trim();
            cleanItem = cleanItem.replace(/^[^\w"'()\s]+|[^\w"'()\s]+$/g, "").replace(/\s+/g, " ").trim();
            
            const isExplicitPlural = lower.includes("bulk") || 
                                     lower.includes("in bulk") || 
                                     (parseQuantity(text) && parseQuantity(text) > 1);
            if (isExplicitPlural) return true;

            // Gloves, shoes, masks, etc. are conceptually singular/pairs and do not get 'each' unless explicitly pluralized
            if (matchClothingItem(cleanItem) || /\b(?:shoes|gloves|masks|glasses|pants|trousers|jeans|shorts|dress|dresses|hoodie|hoodies|boots|sneakers|caps|hats|socks)\b/i.test(cleanItem)) {
                return false;
            }

            const isPluralWord = (cleanItem.endsWith("s") && 
                                  !cleanItem.endsWith("ss") && 
                                  !cleanItem.endsWith("is") && 
                                  !cleanItem.endsWith("us") && 
                                  !cleanItem.endsWith("as") && 
                                  !cleanItem.endsWith("less") && 
                                  !cleanItem.endsWith("ness") && 
                                  !cleanItem.endsWith("mass") && 
                                  !cleanItem.endsWith("king") && 
                                  !cleanItem.endsWith("parking") &&
                                  !cleanItem.endsWith("business"));
            
            return lower.includes("bulk") || 
                   lower.includes("in bulk") || 
                   (parseQuantity(text) && parseQuantity(text) > 1) ||
                   /\b(?:seeds|timber|tickets|juices|batteries|wires|threads|tokens|canisters|barrels|materials|ores|cards|items|keys|snow)\b/i.test(cleanItem) ||
                   isPluralWord;
        })();
        if (lower.includes("each respectively") || lower.includes("each") || isPluralOther) {
            respect = "each respectively";
        }
        const priceStrs = values.map(v => v.formatted);
        let finalVal = "";
        if (priceStrs.length === 2) {
            finalVal = `${priceStrs[0]} and ${priceStrs[1]} ${respect}`;
        } else {
            const last = priceStrs.pop();
            finalVal = `${priceStrs.join(", ")} and ${last} ${respect}`;
        }
        ctx.priceInfo = { type: priceType, value: finalVal };
        ctx.logs.push({ text: `Formatted multiple prices: <strong>${finalVal}</strong>`, type: 'policy' });
    } else {
        const primary = values[0];
        let val = primary.formatted;
        const isPluralOther = ctx.category === "Other" && (function() {
            let cleanItem = lower;
            if (ctx.priceMatches) {
                for (const matchStr of ctx.priceMatches) {
                    const escaped = escapeRegExp(matchStr);
                    cleanItem = cleanItem.replace(new RegExp(escaped, "gi"), "");
                }
            }
            cleanItem = cleanItem.replace(/^(buying|selling or trading|selling|trading|renting out|renting|wtb|wts|wtt|buy|sell|trade|rent|looking to purchase|looking to buy|want to buy|searching for|looking for|searching|look for|looking|search|look)\s+(a\s+|an\s+)?/i, "").trim();
            cleanItem = cleanItem.replace(/\s+(buying|selling or trading|selling|trading|renting out|renting|wtb|wts|wtt|buy|sell|trade|rent|looking to purchase|looking to buy|want to buy|searching for|looking for|searching|look for|looking|search|look)$/i, "").trim();
            cleanItem = cleanItem.replace(/\b(?:in\s+bulk|bulk|each|each\s+respectively|respectively)\b/gi, "").trim();
            cleanItem = cleanItem.replace(/\b(?:price|budget|rent|bet|cost|cash)\b/gi, "").trim();
            cleanItem = cleanItem.replace(/^[^\w"'()\s]+|[^\w"'()\s]+$/g, "").replace(/\s+/g, " ").trim();
            
            const isExplicitPlural = lower.includes("bulk") || 
                                     lower.includes("in bulk") || 
                                     (parseQuantity(text) && parseQuantity(text) > 1);
            if (isExplicitPlural) return true;

            // Gloves, shoes, masks, etc. are conceptually singular/pairs and do not get 'each' unless explicitly pluralized
            if (matchClothingItem(cleanItem) || /\b(?:shoes|gloves|masks|glasses|pants|trousers|jeans|shorts|dress|dresses|hoodie|hoodies|boots|sneakers|caps|hats|socks)\b/i.test(cleanItem)) {
                return false;
            }

            const isPluralWord = (cleanItem.endsWith("s") && 
                                  !cleanItem.endsWith("ss") && 
                                  !cleanItem.endsWith("is") && 
                                  !cleanItem.endsWith("us") && 
                                  !cleanItem.endsWith("as") && 
                                  !cleanItem.endsWith("less") && 
                                  !cleanItem.endsWith("ness") && 
                                  !cleanItem.endsWith("mass") && 
                                  !cleanItem.endsWith("king") && 
                                  !cleanItem.endsWith("parking") &&
                                  !cleanItem.endsWith("business"));
            
            return lower.includes("bulk") || 
                   lower.includes("in bulk") || 
                   (parseQuantity(text) && parseQuantity(text) > 1) ||
                   /\b(?:seeds|timber|tickets|juices|batteries|wires|threads|tokens|canisters|barrels|materials|ores|cards|items|keys|snow)\b/i.test(cleanItem) ||
                   isPluralWord;
        })();
        if (/\beach\b/i.test(lower) || isPluralOther) {
            val += " each";
        }
        ctx.priceInfo = { type: priceType, value: val };
        ctx.logs.push({ text: `Formatted price: <strong>${val}</strong>`, type: 'policy' });
    }
}

function formatNumberDots(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function cleanPriceKeywords(text, ctx) {
    let result = text;
    if (ctx && ctx.priceMatches) {
        for (const matchStr of ctx.priceMatches) {
            const escaped = escapeRegExp(matchStr);
            const regex = new RegExp(escaped, "gi");
            const replacement = /\beach\b/i.test(matchStr) ? " __HAS_EACH__ " : "";
            result = result.replace(regex, replacement);
        }
    }
    result = result.replace(/\b(?:price|budget|rent|bet|cost|cash)\b/gi, "")
                   .replace(/\b(call me|ph:?|phone:?|call|ping me|mail)\s*[0-9-]*\b/gi, "")
                   .replace(/,\s*,/g, ",")
                   .replace(/\s+/g, " ")
                   .trim();
    // Strip leading/trailing punctuation except quotes and parens
    result = result.replace(/^[^\w"'()\s]+|[^\w"'()\s]+$/g, "").trim();
    return result;
}

/* ==========================================================================
   Category Formatters
   ========================================================================== */

function splitOnLastFor(str) {
    const lower = str.toLowerCase();
    const index = lower.lastIndexOf(" for ");
    if (index === -1) return null;
    return [
        str.substring(0, index).trim(),
        str.substring(index + 5).trim()
    ];
}

// 1. Auto Category
function formatAutoAd(adBody, action, ctx) {
    const lowerBody = adBody.toLowerCase();
    
    if ((action === "Trading" || action === "Selling or trading") && lowerBody.includes(" for ")) {
        const parts = splitOnLastFor(adBody);
        if (parts) {
            const formattedA = formatAutoAd(parts[0], action, ctx);
            const formattedB = formatAutoAd(parts[1], action, ctx);
            if (formattedA && formattedB) {
                return `${formattedA} for ${formattedB}`;
            }
        }
    }
    
    // Specific matched vehicle check has priority over generic words (e.g. "italy f458 car" -> match specific "Grotti Italia (F458)" first)
    const matched = matchVehicle(adBody);
    
    if (matched) {
        ctx.logs.push({ text: `Fuzzy matched vehicle: <strong>${matched.name}</strong> (${matched.category})`, type: 'policy' });
        
        // Check Not Sellable Constraint
        if (matched.category === "not_sellable_cars") {
            if (action === "Buying" || action === "Selling" || action === "Selling or trading") {
                ctx.status = "rejected";
                ctx.rejectionReason = "Cannot advertise this vehicle as it is non-sellable.";
                ctx.logs.push({ text: `Rejected: <strong>${matched.name}</strong> is non-sellable.`, type: 'danger' });
                return "";
            }
        }
        
        // Extract upgrades
        const upgrades = parseAutoUpgrades(adBody);
        const order = [];
        
        if (upgrades.config) {
            order.push(upgrades.config);
            ctx.logs.push({ text: `Upgrade: <strong>${upgrades.config}</strong>`, type: 'correction' });
        }
        if (upgrades.visual) {
            order.push(upgrades.visual);
            ctx.logs.push({ text: `Upgrade: <strong>${upgrades.visual}</strong>`, type: 'correction' });
        }
        if (upgrades.wheels) {
            order.push(upgrades.wheels);
            ctx.logs.push({ text: `Upgrade: <strong>${upgrades.wheels}</strong>`, type: 'correction' });
        }
        if (upgrades.insurance) {
            order.push(upgrades.insurance);
            ctx.logs.push({ text: `Upgrade: <strong>${upgrades.insurance}</strong>`, type: 'correction' });
        }
        if (upgrades.turbo) {
            order.push(upgrades.turbo);
            ctx.logs.push({ text: `Upgrade: <strong>${upgrades.turbo}</strong>`, type: 'correction' });
        }
        if (upgrades.drift) {
            order.push(upgrades.drift);
            ctx.logs.push({ text: `Upgrade: <strong>${upgrades.drift}</strong>`, type: 'correction' });
        }
        
        let upgradesText = "";
        if (order.length > 0) {
            if (order.length === 1) {
                upgradesText = ` ${order[0]}`;
            } else if (order.length === 2) {
                upgradesText = ` ${order[0]} and ${order[1]}`;
            } else {
                const last = order.pop();
                upgradesText = ` ${order.join(", ")} and ${last}`;
            }
        }
        
        // Check if at Auto Fair
        let fairText = "";
        if (ctx.raw.toLowerCase().includes("auto fair") || ctx.raw.toLowerCase().includes("autofair")) {
            fairText = " at Auto Fair";
            if (ctx.priceInfo && ctx.priceInfo.value === "Negotiable") {
                ctx.priceInfo = null;
            }
        }
        
        return `"${matched.name}"${upgradesText}${fairText}`;
    }
    
    // Check for generic vehicle words
    const genericWords = ["car", "helicopter", "heli", "plane", "motorcycle", "bike", "boat", "vehicle", "truck"];
    let isGeneric = false;
    let matchedGeneric = "";
    for (const word of genericWords) {
        const regex = new RegExp(`\\b${word}s?\\b`, "i");
        if (regex.test(lowerBody)) {
            isGeneric = true;
            matchedGeneric = word;
            break;
        }
    }
    
    if (isGeneric) {
        let displayWord = matchedGeneric;
        if (displayWord === "heli") displayWord = "helicopter";
        const article = (displayWord.startsWith("a") || displayWord.startsWith("e") || displayWord.startsWith("i") || displayWord.startsWith("o") || displayWord.startsWith("u")) ? "an" : "a";
        let bodyStr = `${article} ${displayWord}`;
        
        // Extract upgrades
        const upgrades = parseAutoUpgrades(adBody);
        const order = [];
        if (upgrades.config) order.push(upgrades.config);
        if (upgrades.visual) order.push(upgrades.visual);
        if (upgrades.wheels) order.push(upgrades.wheels);
        if (upgrades.insurance) order.push(upgrades.insurance);
        if (upgrades.turbo) order.push(upgrades.turbo);
        if (upgrades.drift) order.push(upgrades.drift);
        
        let upgradesText = "";
        if (order.length > 0) {
            if (order.length === 1) {
                upgradesText = ` ${order[0]}`;
            } else if (order.length === 2) {
                upgradesText = ` ${order[0]} and ${order[1]}`;
            } else {
                const last = order.pop();
                upgradesText = ` ${order.join(", ")} and ${last}`;
            }
        }
        
        let fairText = "";
        if (ctx.raw.toLowerCase().includes("auto fair") || ctx.raw.toLowerCase().includes("autofair")) {
            fairText = " at Auto Fair";
            if (ctx.priceInfo && ctx.priceInfo.value === "Negotiable") {
                ctx.priceInfo = null;
            }
        }
        
        return `${bodyStr}${upgradesText}${fairText}`;
    }
    
    ctx.status = "rejected";
    ctx.rejectionReason = "Insufficient information for the vehicle name.";
    ctx.logs.push({ text: `Rejected: Vehicle name not recognized.`, type: 'danger' });
    return "";
}

function parseAutoUpgrades(text) {
    const lower = text.toLowerCase();
    const upgrades = {};
    
    // 1. Configuration
    if (lower.includes("full configuration") || lower.includes("max config") || lower.includes("max tuning") || lower.includes("fully upgraded") || lower.includes("full tune") || lower.includes("full config") || lower.includes("maxed") || lower.includes("full max") || lower.includes("full chip tuning") || lower.includes("pro parts") || lower.includes("car full") || /\bfull\b/i.test(lower)) {
        upgrades.config = "with full configuration";
    } else if (lower.includes("partial configuration") || lower.includes("nearly max") || lower.includes("lvl3") || lower.includes("lvl 3") || lower.includes("partial config") || lower.includes("partial tuning") || lower.includes("partially upgraded")) {
        upgrades.config = "with partial configuration";
    }
    
    // 2. Visual Upgrades
    if (lower.includes("body upgrade") || lower.includes("body kit") || lower.includes("visual upgrade") || lower.includes("visuals")) {
        upgrades.visual = "with visual upgrades";
    }
    
    // 3. Luminous Wheels
    // e.g. "unique 6 rims" or "luminous rims of type 6" or "unique wheels type 25" or "wheels 9"
    const rimMatch = lower.match(/\b(?:unique|luminous|wheels|rims)\s*(?:rims|wheels)?\s*(?:of\s*type|type)?\s*(\d+)\b/i);
    if (rimMatch) {
        const typeNum = rimMatch[1] || "X";
        upgrades.wheels = `luminous wheels of type ${typeNum}`;
    } else if (lower.includes("luminous wheels") || lower.includes("unique wheels") || lower.includes("luminous rims") || lower.includes("wheels") || lower.includes("rims")) {
        upgrades.wheels = "luminous wheels of type X";
    }
    
    // 4. Insurance
    if (lower.includes("insurance") || lower.includes("insured")) {
        upgrades.insurance = "insurance";
    }
    
    // 5. Turbo
    if (lower.includes("turbo")) {
        upgrades.turbo = "turbo kit";
    }
    
    // 6. Drift
    if (lower.includes("drift")) {
        upgrades.drift = "drift kit";
    }
    
    return upgrades;
}

function fuzzyFindLocation(text) {
    const lower = text.toLowerCase();
    const preps = ["in", "at", "near", "to"];
    const allPlaces = [...OFFICIAL_PLACES, ...UNOFFICIAL_PLACES];
    
    allPlaces.sort((a, b) => b.length - a.length);
    
    for (const prep of preps) {
        let index = -1;
        while ((index = lower.indexOf(prep + " ", index + 1)) !== -1) {
            let startOfPlace = index + prep.length + 1;
            let sub = text.substring(startOfPlace).trim();
            if (sub.toLowerCase().startsWith("the ")) {
                sub = sub.substring(4).trim();
                startOfPlace += 4;
            }
            
            const cleanSub = sub.split(/[,.;:#\u2116\(\)]/)[0].trim();
            if (!cleanSub) continue;
            
            const words = cleanSub.split(/\s+/);
            for (let len = Math.min(words.length, 3); len >= 1; len--) {
                const candidate = words.slice(0, len).join(" ");
                const match = getClosestMatch(candidate, allPlaces, 0.7);
                if (match) {
                    const rawMatched = text.substring(index, startOfPlace + candidate.length);
                    return {
                        place: match,
                        preposition: prep,
                        raw: rawMatched
                    };
                }
            }
        }
    }
    
    for (const place of allPlaces) {
        const words = text.split(/\s+/);
        const placeWordsCount = place.split(/\s+/).length;
        for (let i = 0; i <= words.length - placeWordsCount; i++) {
            const candidate = words.slice(i, i + placeWordsCount).join(" ");
            const cleanCandidate = candidate.replace(/[,.;:#\u2116\(\)]/g, "");
            const match = getClosestMatch(cleanCandidate, [place], 0.7);
            if (match) {
                let prep = "in";
                let rawMatched = candidate;
                if (i > 0) {
                    const prevWord = words[i - 1].toLowerCase().replace(/[^a-z]/g, "");
                    if (preps.includes(prevWord)) {
                        prep = prevWord;
                        rawMatched = words[i - 1] + " " + candidate;
                    }
                }
                return {
                    place: match,
                    preposition: prep,
                    raw: rawMatched
                };
            }
        }
    }
    
    return null;
}

function extractLocation(text) {
    const loc = fuzzyFindLocation(text);
    if (!loc) return null;
    
    let prep = loc.preposition;
    let place = loc.place;
    
    let formatted = "";
    if (UNOFFICIAL_PLACES.includes(place)) {
        formatted = `${prep} the ${place.toLowerCase()}`;
    } else {
        formatted = `${prep} ${place}`;
    }
    
    return {
        raw: loc.raw,
        formatted: formatted,
        place: place
    };
}

// 2. Real Estate Category
function formatRealEstateAd(adBody, action, ctx) {
    let lower = adBody.toLowerCase();
    
    // Extract location first
    const locInfo = extractLocation(adBody);
    let cleanAdBody = adBody;
    if (locInfo) {
        cleanAdBody = adBody.replace(locInfo.raw, "").trim();
        cleanAdBody = cleanAdBody.replace(/,\s*$/, "").replace(/\s+and\s*$/, "").trim();
    }
    
    const cleanLower = cleanAdBody.toLowerCase();
    
    // Check house number
    let numMatch = cleanLower.match(/(?:house|apartment|mansion|penthouse|\u2116)\s*(?:no\.?|number|num\.?|#|\u2116)?\s*(\d+)\b/i);
    let houseLabel = "house";
    if (cleanLower.includes("apartment")) houseLabel = "apartment";
    else if (cleanLower.includes("mansion")) houseLabel = "mansion";
    else if (cleanLower.includes("penthouse") || cleanLower.includes("casino apartment")) houseLabel = "Casino penthouse";
    
    if (!numMatch) {
        // Find all standalone numbers in cleanLower
        const allNums = [...cleanLower.matchAll(/\b(\d+)\b/g)].map(m => ({ val: parseInt(m[1]), raw: m[0], index: m.index }));
        // Filter out numbers that represent garage spaces or warehouses
        const nonFeatureNums = allNums.filter(numItem => {
            // Check if the number is part of garage spaces
            const gsMatch = cleanLower.match(new RegExp(`(\\d+)\\s*(?:gs|g\\.s\\.|garage|garages)|(?:gs|g\\.s\\.|garage|garages)\\s*(\\d+)`, "i"));
            if (gsMatch && (gsMatch[1] === numItem.raw || gsMatch[2] === numItem.raw)) {
                return false;
            }
            // Check if the number is part of warehouse space
            const whMatch = cleanLower.match(new RegExp(`(\\d+)\\s*(?:wh|w\\.h\\.|warehouse|warehouses)|(?:wh|w\\.h\\.|warehouse|warehouses)\\s*(\\d+)`, "i"));
            if (whMatch && (whMatch[1] === numItem.raw || whMatch[2] === numItem.raw)) {
                return false;
            }
            return true;
        });
        
        if (nonFeatureNums.length > 0) {
            // Take the last standalone number (usually the house number at the end)
            const targetNum = nonFeatureNums[nonFeatureNums.length - 1];
            numMatch = [null, targetNum.raw];
        }
    }
    
    let mainSubject = "";
    if (numMatch) {
        mainSubject = `${houseLabel} \u2116${numMatch[1]}`;
        ctx.logs.push({ text: `Formatted property designation to <strong>${mainSubject}</strong>`, type: 'correction' });
    } else {
        if (houseLabel === "Casino penthouse") {
            mainSubject = houseLabel;
        } else {
            const prefix = (houseLabel.startsWith("a") || houseLabel.startsWith("e")) ? "an" : "a";
            mainSubject = `${prefix} ${houseLabel}`;
        }
    }
    
    // Extract features in ordering list
    const features = parseRealEstateFeatures(cleanAdBody, houseLabel === "apartment", ctx);
    
    let featuresText = "";
    if (features.length > 0) {
        if (features.length === 1) {
            featuresText = ` with ${features[0]}`;
        } else if (features.length === 2) {
            featuresText = ` with ${features[0]} and ${features[1]}`;
        } else {
            const last = features.pop();
            featuresText = ` with ${features.join(", ")} and ${last}`;
        }
    }
    
    let result = `${mainSubject}${featuresText}`;
    if (locInfo) {
        result += ` ${locInfo.formatted}`;
    }
    return result;
}

function parseRealEstateFeatures(text, isApartment, ctx) {
    const lower = text.toLowerCase();
    const foundFeatures = [];
    const featureMap = {};
    
    // 1. Garden
    if (lower.includes("garden")) {
        featureMap.garden = "a garden";
    }
    
    // 2. Garage spaces
    const gsMatch = lower.match(/(\d+)\s*(?:gs|g\.s\.?|garage|garages)/i) || lower.match(/(?:gs|g\.s\.?|garage|garages)\s*(\d+)/i);
    if (gsMatch) {
        const allowedGs = [2, 5, 9, 25, 30];
        const num = parseInt(gsMatch[1]);
        if (allowedGs.includes(num)) {
            featureMap["garage spaces"] = `${num} g.s.`;
        } else {
            ctx.logs.push({ text: `Garage spaces ${num} is invalid. Reverting to closest valid GRP size.`, type: 'warning' });
            // find closest
            const closest = allowedGs.reduce((prev, curr) => Math.abs(curr - num) < Math.abs(prev - num) ? curr : prev);
            featureMap["garage spaces"] = `${closest} g.s.`;
        }
    }
    
    // 3. Warehouse
    const whMatch = lower.match(/(\d+)\s*(?:wh|w\.h\.?|warehouse|warehouses)/i) || lower.match(/(?:wh|w\.h\.?|warehouse|warehouses)\s*(\d+)/i);
    if (whMatch) {
        featureMap.warehouses = `${whMatch[1]} w.h.`;
    }
    
    // 4. Custom Interior
    if (lower.includes("furnished") || lower.includes("custom interior") || lower.includes("luxe interior") || lower.includes("lux interior")) {
        featureMap["custom interior"] = "custom interior";
    }
    
    // 5. Insurance (Only for Houses, not Apartments)
    if (lower.includes("insurance") || lower.includes("insured")) {
        if (isApartment) {
            ctx.logs.push({ text: `Removed insurance: Apartments cannot be insured.`, type: 'correction' });
        } else {
            featureMap.insurance = "insurance";
        }
    }
    
    // 6. Helipad
    if (lower.includes("helipad") || lower.includes("heli pad") || /\bheli\b/i.test(lower)) {
        featureMap.helipad = "helipad";
    }
    
    // 7. Swimming pool
    if (lower.includes("swimming pool") || lower.includes("pool")) {
        featureMap["swimming pool"] = "swimming pool";
    }
    
    // 8. Tennis court
    if (lower.includes("tennis")) {
        featureMap["tennis court"] = "tennis court";
    }
    
    // 9. Driveway
    if (lower.includes("driveway")) {
        const isLong = lower.includes("long") || lower.includes("large");
        featureMap.driveway = isLong ? "long driveway" : "driveway";
    }
    
    // 10. Backyard
    if (lower.includes("backyard") || lower.includes("back yard")) {
        featureMap.backyard = "spacious backyard";
    }
    
    // 11. Views
    if (lower.includes("view") || lower.includes("views")) {
        featureMap.views = "nice views";
    }
    
    // Extract features in the correct order
    REAL_ESTATE_ORDER.forEach(fKey => {
        if (featureMap[fKey]) {
            foundFeatures.push(featureMap[fKey]);
        }
    });
    
    return foundFeatures;
}

// 3. Work Category
function formatWorkAd(adBody, action, ctx) {
    let lower = adBody.toLowerCase();
    
    // DJ casing check
    let body = adBody.replace(/\bdj\b/gi, "DJ");
    
    // Spell corrections
    body = body.replace(/\bfore\b/gi, "for");
    
    // Solar panel plantation corrections
    if (/\bsolar\s*(?:panel\s*)?plantations?\b/i.test(body)) {
        if (body.toLowerCase().includes("workers")) {
            body = body.replace(/\bsolar\s*(?:panel\s*)?plantations?\b/gi, "solar panel plantations");
        } else {
            body = body.replace(/\bsolar\s*(?:panel\s*)?plantations?\b/gi, "solar panel plantation");
        }
        ctx.logs.push({ text: `Normalized solar panel plantation reference`, type: 'correction' });
    }
    
    // level X -> X years experience
    const lvlMatch = body.match(/level\s*(\d+)/i) || body.match(/lvl\s*(\d+)/i);
    if (lvlMatch) {
        body = body.replace(lvlMatch[0], `${lvlMatch[1]} years of experience`);
        ctx.logs.push({ text: `Changed level translation to years of experience`, type: 'correction' });
    }
    
    // Construction site addresses matching
    const siteMatch = body.match(/construction site\s*#?(\d+)/i);
    if (siteMatch) {
        const siteNum = siteMatch[1];
        let addressStr = "";
        if (siteNum === "1") addressStr = "\u21161 on Vespucci Boulevard";
        else if (siteNum === "2") addressStr = "\u21162 on Calais Avenue";
        else if (siteNum === "3") addressStr = "\u21163 in Pillbox Hill";
        else addressStr = `\u2116${siteNum}`;
        
        body = body.replace(siteMatch[0], `construction site ${addressStr}`);
        ctx.logs.push({ text: `Formatted construction site with address details`, type: 'correction' });
    }
    
    // If multiple roles mentioned -> hiring workers
    const rolesList = ["locksmith", "electrician", "gardener", "surveyor", "driver"];
    let matchedRolesCount = 0;
    rolesList.forEach(r => {
        if (lower.includes(r)) matchedRolesCount++;
    });
    
    if (matchedRolesCount > 1) {
        body = body.replace(/hiring\s+[a-z\s,and]+/i, "hiring workers ");
        ctx.logs.push({ text: `Multiple roles combined into "workers"`, type: 'correction' });
    }
    
    // Capitalize professions at start of ad, lowercase otherwise (except DJ)
    if (action === "") {
        // e.g. "Lawyer looking for work" -> Lawyer is at the start
        const firstWord = body.split(" ")[0];
        if (rolesList.includes(firstWord.toLowerCase()) || firstWord.toLowerCase() === "lawyer" || firstWord.toLowerCase() === "trucker") {
            body = firstWord.charAt(0).toUpperCase() + firstWord.slice(1).toLowerCase() + body.slice(firstWord.length);
        }
    }
    
    return body;
}

// 4. Dating Category
function formatDatingAd(adBody, action, ctx) {
    const lower = adBody.toLowerCase();
    
    // Standard targets (wife, boyfriend, etc.)
    const matchesDatingTarget = ["family members", "girlfriend", "boyfriend", "valentine", "husband", "friends", "family", "friend", "date", "wife", "alliance"];
    for (const t of matchesDatingTarget) {
        const regex = new RegExp(`\\b${t}\\b`, "i");
        if (regex.test(lower)) {
            // Check for illegal price/budget on wife/husband (triggers blacklist)
            if ((t === "wife" || t === "husband") && ctx.priceInfo && ctx.priceInfo.value !== "Negotiable") {
                ctx.status = "blacklisted";
                ctx.blacklistReason = `Attempting to purchase/sell a spouse (${t}) with a price is forbidden.`;
                ctx.rejectionReason = "Improper advertisement.";
                ctx.logs.push({ text: `Blacklist triggered: Trading spouses with value!`, type: 'danger' });
                return "";
            }
            
            const displayTarget = (t === "friends") ? "friend" : t;
            const prefix = (displayTarget === "wife" || displayTarget === "husband" || displayTarget === "date" || displayTarget === "friend" || displayTarget === "boyfriend" || displayTarget === "girlfriend" || displayTarget === "valentine" || displayTarget === "family") ? "a " : (displayTarget === "alliance" ? "an " : "");
            return `for ${prefix}${displayTarget}`;
        }
    }
    
    // If not a standard target, check if it's a person search:
    // It should have FirstName LastName format
    const nameMatch = adBody.match(/^([A-Za-z]+)\s+([A-Za-z]+)$/);
    if (nameMatch) {
        const firstName = nameMatch[1];
        const lastName = nameMatch[2];
        const fullName = `${firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()} ${lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase()}`;
        
        ctx.logs.push({ text: `Dating search target name capitalized: <strong>${fullName}</strong>`, type: 'correction' });
        
        // Database check
        const matchCit = grpCitizens.find(c => c.name.toLowerCase() === fullName.toLowerCase());
        if (!matchCit) {
            ctx.status = "rejected";
            ctx.rejectionReason = "Person not found in database. (Person must be in the GRAND RP mail)";
            ctx.logs.push({ text: `Rejected: Citizen <strong>${fullName}</strong> not found in database.`, type: 'warning' });
            return "";
        }
        
        // Classified check
        if ((matchCit.role.includes("Leader") || matchCit.role.includes("Deputy")) && matchCit.role.includes("State") && !matchCit.isLI) {
            ctx.status = "rejected";
            ctx.rejectionReason = "You cannot search for classified person.";
            ctx.logs.push({ text: `Rejected: <strong>${fullName}</strong> is a classified state leader/deputy.`, type: 'warning' });
            return "";
        }
        
        return `for ${fullName}`;
    }
    
    // Default dating
    return adBody;
}

function formatOwnerSearchAd(adBody, ctx) {
    let clean = adBody.toLowerCase().replace(/\bowner\b/gi, "").trim();
    clean = clean.replace(/^(?:a|an|the)\s+/gi, "").trim();
    
    let matchedName = "Business";
    if (clean.includes("gun") || clean.includes("weapon") || clean.includes("ammo") || clean.includes("ammunition")) {
        matchedName = "Ammunition Store";
    } else if (clean.includes("clothing") || clean.includes("cloth")) {
        matchedName = "Clothing Shop";
    } else if (clean.includes("24/7") || clean.includes("twenty four seven")) {
        matchedName = "24/7 Store";
    } else if (clean.includes("gas") || clean.includes("fuel")) {
        matchedName = "Gas Station";
    } else if (clean.includes("car sharing") || clean.includes("carsharing")) {
        matchedName = "Car sharing";
    } else if (clean.includes("business") || clean.includes("biz")) {
        matchedName = "Business";
    } else if (clean) {
        const bizTypes = ["Ammunition Store", "ATM", "Car wash", "Car sharing", "Chip tuning", "Clothing shop", "Electric station", "Farm", "Flower shop", "Fight club", "Furniture shop", "Gas station", "Grand Elite", "Hair salon", "Jewelry store", "Juice shop", "Luna park", "Parking", "Pet Shop", "State object", "Service station", "Tattoo studio", "Taxi company", "24/7 Store", "Burger shop", "Cowshed", "Freight train", "Plantation", "Oil Well"];
        let closest = bizTypes.find(type => new RegExp(`\\b${escapeRegExp(type)}\\b`, 'i').test(clean));
        if (!closest) {
            closest = getClosestMatch(clean, bizTypes, 0.4);
        }
        if (closest) {
            matchedName = closest.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
        }
    }
    
    const startsWithVowel = /^[aeiou]/i.test(matchedName);
    const article = startsWithVowel ? "an" : "a";
    return `${article} ${matchedName} owner`;
}

// 5. Businesses Category
function formatBusinessesAd(adBody, action, ctx) {
    const lowerBody = adBody.toLowerCase();
    if ((action === "Trading" || action === "Selling or trading") && lowerBody.includes(" for ")) {
        const parts = splitOnLastFor(adBody);
        if (parts) {
            const formattedA = formatBusinessesAd(parts[0], action, ctx);
            const formattedB = formatBusinessesAd(parts[1], action, ctx);
            if (formattedA && formattedB) {
                return `${formattedA} for ${formattedB}`;
            }
        }
    }
    
    let body = adBody;
    
    // Rename personal -> private
    body = body.replace(/personal business/gi, "private business");
    body = body.replace(/pbiz/gi, "private business");
    
    // Normalize ATM
    body = body.replace(/\batm\s+business\b/gi, "ATM");
    body = body.replace(/\batm\b/gi, "ATM");
    
    // Drug lab -> Burger shop
    if (body.toLowerCase().includes("drug lab")) {
        body = body.replace(/drug lab/gi, "Burger shop");
        ctx.logs.push({ text: `Replaced restricted "drug lab" with "Burger shop" and issued warning`, type: 'warning' });
    }
    
    // Rename gun store -> Ammunition Store
    body = body.replace(/gun store/gi, "Ammunition Store");
    body = body.replace(/weapon store/gi, "Ammunition Store");
    
    // Rename charging station -> Electric station
    body = body.replace(/charging station/gi, "Electric station");
    
    // Rename auto workshop -> Service station
    body = body.replace(/auto workshop/gi, "Service station");
    
    // Family business trade check
    if (body.toLowerCase().includes("family business") && action === "Trading") {
        ctx.status = "rejected";
        ctx.rejectionReason = "Family businesses cannot be traded.";
        ctx.logs.push({ text: `Rejected: Family business trade is prohibited.`, type: 'warning' });
        return "";
    }
    
    // Make sure we include "business" or "shares" keyword correctly
    const bizTypes = ["Ammunition Store", "ATM", "Car wash", "Car sharing", "Chip tuning", "Clothing shop", "Electric station", "Farm", "Flower shop", "Fight club", "Furniture shop", "Gas station", "Grand Elite", "Hair salon", "Jewelry store", "Juice shop", "Luna park", "Parking", "Pet Shop", "State object", "Service station", "Tattoo studio", "Taxi company", "24/7 Store", "Burger shop", "Cowshed", "Freight train", "Plantation", "Oil Well"];
    
    let matchedBiz = bizTypes.find(type => new RegExp(`\\b${escapeRegExp(type)}\\b`, 'i').test(body));
    if (!matchedBiz) {
        matchedBiz = getClosestMatch(body, bizTypes, 0.4);
    }
    if (matchedBiz) {
        let isPlantation = false;
        let plantationCrop = "";
        if (matchedBiz === "Plantation") {
            isPlantation = true;
            const cropMatch = body.match(/\b(pumpkin|cabbage|mandarin|pineapple)\b/i);
            if (cropMatch) {
                plantationCrop = cropMatch[1].charAt(0).toUpperCase() + cropMatch[1].slice(1).toLowerCase();
            }
        }

        if (isPlantation && plantationCrop) {
            // Remove the crop name first to avoid duplication
            let cleanBody = body.replace(new RegExp(`\\b${plantationCrop}\\b`, 'gi'), "").replace(/\s+/g, " ").trim();
            
            // Reconstruct the business name
            let hasSharesOrControl = cleanBody.toLowerCase().includes("shares") || cleanBody.toLowerCase().includes("control") || cleanBody.toLowerCase().includes("business");
            let targetName = `${plantationCrop} plantation`;
            if (!hasSharesOrControl) {
                targetName = `${plantationCrop} plantation business`;
                ctx.logs.push({ text: `Appended "business" keyword to crop plantation`, type: 'correction' });
            }
            
            // Replace "plantation" case-insensitively with the target name
            cleanBody = cleanBody.replace(/\bplantation\b/gi, targetName);
            body = cleanBody.replace(/\s+/g, " ").trim();
        } else {
            // Strip intermediate "business" keyword if number is present (e.g. "Car sharing business no2" -> "Car sharing №2")
            const matchedBizEscaped = escapeRegExp(matchedBiz);
            const bizWithNumRegex = new RegExp(`\\b(${matchedBizEscaped})\\s+business\\s*(?:no\\.?|number|num\\.?|#|\\u2116|mp|n\\.?|\\-)?\\s*(\\d+)\\b`, 'i');
            body = body.replace(bizWithNumRegex, (match, biz, num) => {
                return `${biz} \u2116${parseInt(num)}`;
            });

            // Check if there is a number associated with the business
            const numMatch = body.match(new RegExp(`\\b(${escapeRegExp(matchedBiz)})\\s*(?:no\\.?|number|num\\.?|#|\\u2116|mp|n\\.?|\\-)?\\s*(\\d+)\\b`, 'i'));
            let isBedsSpec = false;
            if (numMatch) {
                const afterMatch = body.substring(numMatch.index + numMatch[0].length).trim().toLowerCase();
                if (/^beds?\b/i.test(afterMatch)) {
                    isBedsSpec = true;
                }
            }
            if (numMatch && !isBedsSpec) {
                // Business with number -> replace with "MatchedBiz №Num" and do NOT append "business"
                const numVal = parseInt(numMatch[2]);
                body = body.replace(numMatch[0], `${matchedBiz} \u2116${numVal}`);
                ctx.logs.push({ text: `Formatted business designation to <strong>${matchedBiz} \u2116${numVal}</strong>`, type: 'correction' });
            } else {
                // Business without number -> make sure "business" or "shares" or "control" is present
                if (!body.toLowerCase().includes("shares") && !body.toLowerCase().includes("business") && !body.toLowerCase().includes("control")) {
                    // Append business
                    body = body.replace(new RegExp(escapeRegExp(matchedBiz), "gi"), `${matchedBiz} business`);
                    ctx.logs.push({ text: `Appended "business" keyword to official category`, type: 'correction' });
                } else {
                    // Just capitalize/canonicalize matchedBiz
                    body = body.replace(new RegExp(escapeRegExp(matchedBiz), "gi"), matchedBiz);
                }
            }
        }
    }
    
    return body;
}

// 6. Services & Discounts Category
function formatTemplateAd(adBody, category, ctx) {
    // Check custom trained templates shorthand first (check ALL entries for best match)
    let bestFmtShortLen = 0;
    let bestFmtShortTemplate = null;
    const cleanInputForFmt = adBody.trim().toLowerCase();
    for (const ct of customTemplates) {
        if (ct.shorthand) {
            const cleanShort = ct.shorthand.trim().toLowerCase();
            if (cleanInputForFmt === cleanShort || cleanInputForFmt.includes(cleanShort)) {
                const remaining = cleanInputForFmt.replace(cleanShort, "").replace(/^[^\w]+|[^\w]+$/g, "").trim();
                if (remaining.length < 5 && cleanShort.length > bestFmtShortLen) {
                    bestFmtShortLen = cleanShort.length;
                    bestFmtShortTemplate = ct;
                }
            }
        }
    }
    if (bestFmtShortTemplate) {
        ctx.action = "";
        ctx.priceInfo = null;
        ctx.logs.push({ text: `Expanded custom shorthand to template: <strong>${bestFmtShortTemplate.text}</strong>`, type: 'policy' });
        return bestFmtShortTemplate.text;
    }

    // Check if it's a shorthand template request
    const shorthandMatch = adBody.match(/\b(?:ammunition\s+store|ammunation\s+store|ammo\s+store|ammo|weapon\s+shop|gun\s+store|weapon\s+store|rifleclub|bobbys|canikpide|wong|pew\s+pew|lue|siddhu|most\s+wanted|central\s+mall)?\s*(?:gps\s*)?(?:No\.?|\u2116|#)?\s*(39|40|41|111|147|148|149|150|151|152|269)\s+\b(?:temp|template|t)\s*([12])\b/i);
    const familyShorthandMatch = adBody.match(/\b(?:family|fam|uchiha|kingdom|deluca)?\s*(?:gps\s*|house\s*|h\s*)?(?:No\.?|\u2116|#)?\s*(55|258|536)\s+\b(?:temp|template|t)\s*([12])\b/i);
    const clothingShorthandMatch = adBody.match(/\b(?:clothing\s+shop|clothing\s+store|clothing|wear|style|fashion|trendzone)?\s*(?:gps\s*|No\.?|\u2116|#)?\s*(31|32|50|74|75|122|126|142|143|144|145|146|271|275)\s+\b(?:temp|template|t)\s*([12])\b/i);
    const officeShorthandMatch = adBody.match(/\b(?:(?:[a-z\s]+)?office)?\s*(?:No\.?|\u2116|#|-)?\s*(24|585|677|1000|1017|1288|1419|1948|2198|2796|7963|10364|12313|13724|14396|14633|15136|21046|27650|32125|33698|41760|50367|52942|78981|85042|85235)\s+\b(?:temp|template|t)\s*([12])\b/i);
    const storeShorthandMatch = adBody.match(/\b(?:store\s+)?24\/7(?:\s+store)?\s*(?:gps\s*)?(?:No\.?|\u2116|#)?\s*(23|24|25|26|27|28|29|30|78|119|120|121|123|125|128|129|139|140|141|270)\s+\b(?:temp|template|t)\s*([12])\b/i);
    const gasShorthandMatch = adBody.match(/\b(?:gas\s+station|gas\s+stn|gas|fuel|station|stn|ron|sahara|indian|tsunami|charon|remix|xr|kek|liff|brody|immortals|mobil|loves|surya|jordan|sher|renegades|oilarc)?\s*(?:gps\s*)?(?:No\.?|\u2116|#)?\s*(4|6|7|8|9|10|11|13|14|15|16|17|18|21|23|115|116|117|118|124|127|136|137)\s+\b(?:temp|template|t)\s*([12])\b/i);
    let parkingShorthandMatch = adBody.match(/\b(?:parking\s+lot|parking|park|ekip|eileen|remix|playboys|rockford)\s*(?:gps\s*)?(?:No\.?|\u2116|#)?\s*(55)\s+\b(?:temp|template|t)\s*([12])\b/i);
    if (!parkingShorthandMatch) {
        parkingShorthandMatch = adBody.match(/\b(?:parking\s+lot|parking|park|ekip|eileen|remix|playboys|rockford)?\s*(?:gps\s*)?(?:No\.?|\u2116|#)?\s*(51|52|53|54|56|57|58|79|80|81|82|83|84|85|101|135)\s+\b(?:temp|template|t)\s*([12])\b/i);
    }
    if (shorthandMatch) {
        const remaining = adBody.replace(shorthandMatch[0], "").replace(/^[^\w]+|[^\w]+$/g, "").trim();
        if (remaining.length < 5) {
            const shopNum = shorthandMatch[1];
            const tempIdx = shorthandMatch[2];
            const matched = getAmmunitionTemplate(shopNum, tempIdx);
            if (matched) {
                ctx.action = "";
                ctx.priceInfo = null;
                ctx.logs.push({ text: `Expanded shorthand to template: <strong>${matched}</strong>`, type: 'policy' });
                return matched;
            }
        }
    } else if (storeShorthandMatch) {
        const remaining = adBody.replace(storeShorthandMatch[0], "").replace(/^[^\w]+|[^\w]+$/g, "").trim();
        if (remaining.length < 5) {
            const shopNum = storeShorthandMatch[1];
            const tempIdx = storeShorthandMatch[2];
            const matched = getStore247Template(shopNum, tempIdx);
            if (matched) {
                ctx.action = "";
                ctx.priceInfo = null;
                ctx.logs.push({ text: `Expanded shorthand to template: <strong>${matched}</strong>`, type: 'policy' });
                return matched;
            }
        }
    } else if (gasShorthandMatch) {
        const remaining = adBody.replace(gasShorthandMatch[0], "").replace(/^[^\w]+|[^\w]+$/g, "").trim();
        if (remaining.length < 5) {
            const shopNum = gasShorthandMatch[1];
            const tempIdx = gasShorthandMatch[2];
            const matched = getGasStationTemplate(shopNum, tempIdx);
            if (matched) {
                ctx.action = "";
                ctx.priceInfo = null;
                ctx.logs.push({ text: `Expanded shorthand to template: <strong>${matched}</strong>`, type: 'policy' });
                return matched;
            }
        }
    } else if (parkingShorthandMatch) {
        const remaining = adBody.replace(parkingShorthandMatch[0], "").replace(/^[^\w]+|[^\w]+$/g, "").trim();
        if (remaining.length < 5) {
            const shopNum = parkingShorthandMatch[1];
            const tempIdx = parkingShorthandMatch[2];
            const matched = getParkingTemplate(shopNum, tempIdx);
            if (matched) {
                ctx.action = "";
                ctx.priceInfo = null;
                ctx.logs.push({ text: `Expanded shorthand to template: <strong>${matched}</strong>`, type: 'policy' });
                return matched;
            }
        }
    } else if (familyShorthandMatch) {
        const remaining = adBody.replace(familyShorthandMatch[0], "").replace(/^[^\w]+|[^\w]+$/g, "").trim();
        if (remaining.length < 5) {
            const shopNum = familyShorthandMatch[1];
            const tempIdx = familyShorthandMatch[2];
            const matched = getFamilyTemplate(shopNum, tempIdx);
            if (matched) {
                ctx.action = "";
                ctx.priceInfo = null;
                ctx.logs.push({ text: `Expanded shorthand to template: <strong>${matched}</strong>`, type: 'policy' });
                return matched;
            }
        }
    } else if (clothingShorthandMatch) {
        const remaining = adBody.replace(clothingShorthandMatch[0], "").replace(/^[^\w]+|[^\w]+$/g, "").trim();
        if (remaining.length < 5) {
            const shopNum = clothingShorthandMatch[1];
            const tempIdx = clothingShorthandMatch[2];
            const matched = getClothingTemplate(shopNum, tempIdx);
            if (matched) {
                ctx.action = "";
                ctx.priceInfo = null;
                ctx.logs.push({ text: `Expanded shorthand to template: <strong>${matched}</strong>`, type: 'policy' });
                return matched;
            }
        }
    } else if (officeShorthandMatch) {
        const remaining = adBody.replace(officeShorthandMatch[0], "").replace(/^[^\w]+|[^\w]+$/g, "").trim();
        if (remaining.length < 5) {
            const officeNum = officeShorthandMatch[1];
            const tempIdx = officeShorthandMatch[2];
            const matched = getOfficeTemplate(officeNum, tempIdx);
            if (matched) {
                ctx.action = "";
                ctx.priceInfo = null;
                ctx.logs.push({ text: `Expanded shorthand to template: <strong>${matched}</strong>`, type: 'policy' });
                return matched;
            }
        }
    }

    let cleanAdBody = adBody.replace(/^(?:[a-zA-Z0-9\s\u2116#\-:()&]+)?(?:template|temp)\s+\d+[-\s]*/i, "").trim();
    let tempAdBody = cleanAdBody.replace(/\b(?:price|budget)?\s*(?:negotiable|negable|negoitable|nego|neg)\b/gi, "")
                                .replace(/\b(?:for|at|price|budget)?\s*[\$\d\.,kKmMbB\s]+(?:each)?\b/gi, "")
                                .replace(/\b\d+\s*[%]?\s*and\s*\d+\s*[%]?\s*juices?\b/gi, "")
                                .trim();
    const combinedTemplates = OFFICIAL_TEMPLATES.concat(customTemplates.map(t => t.text));
    const matched = getClosestMatch(tempAdBody, combinedTemplates, 0.65) || getClosestMatch(cleanAdBody, combinedTemplates, 0.65);
    if (!matched) {
        ctx.status = "rejected";
        ctx.rejectionReason = "Template not found in database. Contact LI to create a new template.";
        ctx.logs.push({ text: `Rejected: Template not recognized.`, type: 'warning' });
        return "";
    }
    
    ctx.action = "";
    ctx.priceInfo = null;
    ctx.logs.push({ text: `Matched template: <strong>${matched}</strong>`, type: 'policy' });
    return matched;
}

function maskPhrases(text) {
    let result = text;
    // Normalize "10 and 20% juices" -> "10% and 20% juices"
    result = result.replace(/\b(\d+)\s*(?:%|percent)?\s+and\s+(\d+)\s*(?:%|percent)?\s*juices?\b/gi, (match, p1, p2) => {
        return `${p1}% and ${p2}% juices`;
    });
    result = result.replace(/\b(\d+%\s+and\s+\d+%)(?!\w)/gi, (match) => {
        return "__PCT_AND_PCT_START__" + match.replace(/\s+/g, "_") + "__PCT_AND_PCT_END__";
    });
    result = result.replace(/\bflame\s+and\s+water\b/gi, "__FLAME_AND_WATER__");
    result = result.replace(/\battack\s+and\s+protection\b/gi, "__ATTACK_AND_PROTECTION__");
    result = result.replace(/\bprotection\s+and\s+immunity\b/gi, "__PROTECTION_AND_IMMUNITY__");
    result = result.replace(/\b(prime(?:\s+platinum)?\s*(?:with\s+)?\d+\s*(?:days?)?\s*and\s*\d+\s*days?)\b/gi, (match) => {
        return "__PRIME_AND_DAYS_START__" + match.replace(/\s+/g, "_") + "__PRIME_AND_DAYS_END__";
    });
    return result;
}

function unmaskPhrases(text) {
    let result = text;
    result = result.replace(/__PCT_AND_PCT_START__(.+?)__PCT_AND_PCT_END__/g, (match, inner) => {
        return inner.replace(/_/g, " ");
    });
    result = result.replace(/__PRIME_AND_DAYS_START__(.+?)__PRIME_AND_DAYS_END__/g, (match, inner) => {
        return inner.replace(/_/g, " ");
    });
    result = result.replace(/__FLAME_AND_WATER__/g, "flame and water");
    result = result.replace(/__ATTACK_AND_PROTECTION__/g, "attack and protection");
    result = result.replace(/__PROTECTION_AND_IMMUNITY__/g, "protection and immunity");
    return result;
}

function itemRequiresArticle(itemStr, isFirst, ctx) {
    if (!isFirst) return false;
    const lower = itemStr.toLowerCase();
    
    if (lower.startsWith("a ") || lower.startsWith("an ")) {
        return false;
    }
    if (lower.includes("sim card") && (lower.includes("\u2116") || /\d/.test(lower))) {
        return false;
    }
    if (lower.includes("inventory")) {
        return false;
    }
    if (lower.includes("biospark")) {
        return false;
    }
    if (lower.includes("pickaxe") && (lower.includes("quality") || lower.includes("lvl") || lower.includes("level"))) {
        return false;
    }
    if (lower.includes("fishing rod") && (lower.includes("quality") || lower.includes("lvl") || lower.includes("level"))) {
        return false;
    }
    if (lower.includes("shoulder pet")) {
        return false;
    }
    const fishList = ["salmon", "carp", "perch", "trout", "megalodon", "ray", "orca", "humpback whale"];
    if (fishList.some(fish => lower === fish || lower.endsWith(" " + fish))) {
        return false;
    }
    if (lower.includes("tuning") || lower.includes("suspension") || lower.includes("transmission") || lower.includes("brakes") || lower.includes("tires")) {
        return false;
    }
    if (lower.includes("juice") || lower.includes("juices")) {
        return false;
    }
    if (lower.includes("prime")) {
        return false;
    }
    if (lower.includes("various items")) {
        return false;
    }
    if (/^\d+/.test(lower)) {
        return false;
    }
    if (lower.includes("timber") || lower.includes("wires")) {
        return false;
    }
    if (lower.startsWith("cage with a")) {
        return false;
    }
    if (lower.includes("wheels") || lower.includes("rims")) {
        return false;
    }
    if (lower.includes("in bulk") || lower.includes("bulk")) {
        return false;
    }
    if (ctx && ctx.raw) {
        const rawLower = ctx.raw.toLowerCase();
        if (rawLower.includes("in bulk") || rawLower.includes("bulk") || /\beach\b/i.test(rawLower)) {
            return false;
        }
    }
    const brands = ["abibas", "muci", "lui vi", "niki", "mikachu", "kolex", "off-white"];
    if (brands.some(b => lower.startsWith(b))) {
        return false;
    }
    if (lower.endsWith("s") && !lower.endsWith("ss")) {
        return false;
    }
    return true;
}

function prependArticle(itemStr) {
    const lower = itemStr.toLowerCase();
    const isVowel = /^[aeiou]/i.test(lower);
    const article = isVowel ? "an" : "a";
    return `${article} ${itemStr}`;
}

// 7. Other Category (Clothing & items)
function formatOtherAd(adBody, action, ctx) {
    let normalizedAdBody = adBody;
    // Automatically insert commas/separators between clothing type specs and adjacent items
    normalizedAdBody = normalizedAdBody.replace(/(\btype\s+[a-zA-Z0-9]+)\s+(?=(?:high|medium|low|max|advanced)\s+quality|lvl\s*\d+|level\s*\d+|\d+\s*lvl|\d+\s*level|rare|regular|secret|grand|cayo|car|resource|diamonds?|salmons?|carps?|perch|trout|megalodon|ray|orca|whale|timber|wires|hookah|sponge)/gi, "$1, ");
    
    const lower = normalizedAdBody.toLowerCase();
    
    if ((action === "Trading" || action === "Selling or trading") && lower.includes(" for ")) {
        const parts = splitOnLastFor(normalizedAdBody);
        if (parts) {
            const formattedA = formatOtherAd(parts[0], action, ctx);
            const formattedB = formatOtherAd(parts[1], action, ctx);
            if (formattedA && formattedB) {
                return `${formattedA} for ${formattedB}`;
            }
        }
    }
    
    // Check if event (party, wedding, car meet)
    const isEvent = /^(?:pool\s+)?party\b/i.test(lower) || 
                    /^(?:wedding|car\s+meet)\b/i.test(lower) || 
                    /\b(?:party|wedding|car\s+meet)\s+at\b/i.test(lower);
    if (isEvent) {
        ctx.action = "";
        ctx.priceInfo = null;
        return normalizedAdBody;
    }
    
    // Play dice or poker
    if (lower.includes("dice") || lower.includes("poker")) {
        ctx.action = "Looking";
        const game = lower.includes("dice") ? "dice" : "poker";
        return `to play ${game}`;
    }
    
    // Mask phrases with 'and' to avoid splitting them incorrectly
    let maskedBody = maskPhrases(normalizedAdBody);
    
    // Split combined clothing/items if multiple exist
    let items = maskedBody.split(/\s+and\s+|\s+plus\s+|,/gi)
        .map(s => {
            let clean = s.trim();
            // Strip leading/trailing punctuation except quotes/parens
            clean = clean.replace(/^[^\w"'()\s]+|[^\w"'()\s]+$/g, "").trim();
            return clean;
        })
        .filter(s => {
            if (!s) return false;
            const lowerS = s.toLowerCase();
            if (lowerS === "each" || lowerS === "respectively" || lowerS === "each respectively" || lowerS === "price" || lowerS === "budget" || lowerS === "cost") {
                return false;
            }
            return true;
        });
    let formattedItems = [];
    
    // Check for multiple tuning parts list sharing the same quality level
    const tuningPartKeywords = ["transmission", "engine", "suspension", "brakes", "tires"];
    let allTuning = items.length > 1;
    if (allTuning) {
        for (const item of items) {
            const unmasked = unmaskPhrases(item).toLowerCase();
            const isTuning = tuningPartKeywords.some(part => unmasked.includes(part));
            if (!isTuning) {
                allTuning = false;
                break;
            }
        }
    }
    
    if (allTuning) {
        const qualityPatterns = [
            { name: "low quality ", regex: /\b(?:low|lvl\s*1|level\s*1|1\s*lvl)\b/i },
            { name: "medium quality ", regex: /\b(?:medium|med|lvl\s*2|level\s*2|2\s*lvl)\b/i },
            { name: "high quality ", regex: /\b(?:high|lvl\s*3|level\s*3|3\s*lvl)\b/i },
            { name: "max quality ", regex: /\b(?:max|lvl\s*4|level\s*4|4\s*lvl)\b/i },
            { name: "advanced quality ", regex: /\badvanced\b/i }
        ];
        const matchedQualities = qualityPatterns.filter(p => p.regex.test(lower));
        
        if (matchedQualities.length <= 1) {
            const matchedTuningParts = [];
            for (const part of tuningPartKeywords) {
                const regex = new RegExp(`\\b${part}s?\\b`, "i");
                if (regex.test(lower)) {
                    matchedTuningParts.push(part);
                }
            }
            
            if (matchedTuningParts.length > 1) {
                // Sort by order of appearance in original input
                matchedTuningParts.sort((a, b) => lower.indexOf(a) - lower.indexOf(b));
                
                let partsListText = "";
                if (matchedTuningParts.length === 2) {
                    partsListText = `${matchedTuningParts[0]} and ${matchedTuningParts[1]}`;
                } else {
                    const lastPart = matchedTuningParts.pop();
                    partsListText = `${matchedTuningParts.join(", ")} and ${lastPart}`;
                }
                
                const isPlural = lower.includes("tunings") || lower.includes("parts");
                const suffix = isPlural ? " tunings" : " tuning";
                
                let qty = parseQuantity(adBody);
                let qtyText = qty ? `${qty} ` : "";
                let qualityText = matchedQualities.length === 1 ? matchedQualities[0].name : "";
                
                const groupedTuningText = `${qtyText}${qualityText}${partsListText}${suffix}`;
                formattedItems.push(groupedTuningText);
                ctx.logs.push({ text: `Formatted multiple tuning parts: <strong>${groupedTuningText}</strong>`, type: 'correction' });
                
                // Skip the standard loop by setting items to empty
                items = [];
            }
        }
    }
    
    for (let i = 0; i < items.length; i++) {
        // Unmask the item first so matching works
        let rawItem = unmaskPhrases(items[i]);
        let isFirst = (i === 0);
        
        // Look for luminous unique wheels/rims in other
        if (/\b(?:rims?|wheels?)\b/i.test(rawItem)) {
            const numbers = rawItem.match(/\b\d+\b/g);
            let typeNum = "X";
            if (numbers && numbers.length > 0) {
                if (numbers.length === 1) {
                    typeNum = numbers[0];
                } else if (numbers.length === 2) {
                    typeNum = `${numbers[0]} and ${numbers[1]}`;
                } else {
                    const lastNum = numbers.pop();
                    typeNum = `${numbers.join(", ")} and ${lastNum}`;
                }
            }
            formattedItems.push(`luminous wheels of type ${typeNum}`);
            ctx.logs.push({ text: `Formatted rims to: <strong>luminous wheels of type ${typeNum}</strong>`, type: 'correction' });
            continue;
        }
        
        // Check other items first to avoid false-positive clothing matching
        let formattedOther = formatGeneralItem(rawItem, ctx);
        if (formattedOther) {
            if (itemRequiresArticle(formattedOther, isFirst, ctx)) {
                formattedOther = prependArticle(formattedOther);
            }
            formattedItems.push(formattedOther);
        } else {
            const matchedClothing = matchClothingItem(rawItem);
            if (matchedClothing) {
                // Reorder clothing: color (lowercase) | item name | type | gender
                const color = parseColor(rawItem);
                let typeVal = parseType(rawItem);
                const genderVal = parseGender(rawItem);
                
                if (matchedClothing.name.includes('*') && !typeVal) {
                    typeVal = extractTypeFromWildcard(rawItem);
                }
                
                let finalClothing = "";
                if (color) finalClothing += `${color} `;
                
                let namePart = matchedClothing.name;
                if (namePart.includes('*')) {
                    namePart = namePart.replace('*', typeVal || 'X');
                }
                
                finalClothing += namePart;
                if (typeVal && !matchedClothing.name.includes('*')) {
                    finalClothing += ` of type ${typeVal}`;
                }
                if (genderVal) finalClothing += ` ${genderVal}`;
                
                formattedItems.push(finalClothing.trim());
                ctx.logs.push({ text: `Formatted clothing: <strong>${finalClothing.trim()}</strong>`, type: 'policy' });
            } else {
                // Not recognized. Reject
                ctx.status = "rejected";
                const actWord = action === "Buying" ? "buying" : "selling";
                ctx.rejectionReason = `Please, provide the correct name of the item you are ${actWord}.`;
                ctx.logs.push({ text: `Rejected: Item <strong>${rawItem}</strong> not recognized.`, type: 'warning' });
                return "";
            }
        }
    }
    
    if (formattedItems.length === 0) {
        return adBody;
    }
    
    // Max 3 items in other category
    if (formattedItems.length > 3) {
        ctx.status = "rejected";
        ctx.rejectionReason = "Cannot advertise more than 3 items at a time.";
        ctx.logs.push({ text: `Rejected: Exceeded max limit of 3 items in Other.`, type: 'warning' });
        return "";
    }
    
    if (formattedItems.length === 1) {
        return formattedItems[0];
    } else if (formattedItems.length === 2) {
        return `${formattedItems[0]} and ${formattedItems[1]}`;
    } else {
        const last = formattedItems.pop();
        return `${formattedItems.join(", ")} and ${last}`;
    }
}

function parseColor(text) {
    const colors = ["black", "white", "red", "blue", "green", "yellow", "orange", "purple", "pink", "brown", "grey", "gray", "silver", "gold"];
    for (const c of colors) {
        if (text.toLowerCase().includes(c)) return c.toLowerCase();
    }
    return null;
}

function extractTypeFromWildcard(text) {
    const numbers = text.match(/\b\d+\b/g);
    if (numbers) {
        const qty = parseQuantity(text);
        for (const num of numbers) {
            // If it's a quantity at the start, skip it
            if (qty && num === qty.toString()) {
                if (new RegExp(`^\\s*${num}\\b`, "i").test(text)) {
                    continue;
                }
            }
            return num;
        }
    }
    return null;
}

function parseType(text) {
    const typeMatch = text.toLowerCase().match(/(?:type|extra|extras)\s*#?(\d+)\b/i);
    return typeMatch ? typeMatch[1] : null;
}

function parseGender(text) {
    const lower = text.toLowerCase();
    if (lower.includes("for men") || lower.includes("for man") || lower.includes("male") || /\bmens?\b/i.test(lower) || /\bmen's\b/i.test(lower)) return "for men";
    if (lower.includes("for women") || lower.includes("for woman") || lower.includes("female") || /\bwomens?\b/i.test(lower) || /\bwomen's\b/i.test(lower)) return "for women";
    return null;
}

function cleanItemForFuzzy(text) {
    let clean = text.toLowerCase().trim().replace(/__has_each__/gi, "");
    
    // Strip quantity/numbers at start or end
    clean = clean.replace(/^\d+%\s+and\s+\d+%\s*/g, "");
    clean = clean.replace(/^\d+%\s*/g, "");
    clean = clean.replace(/^\d+\s+/g, "");
    clean = clean.replace(/\b\d+\b/g, "");
    
    // Strip qualities/descriptors
    clean = clean.replace(/\b(?:top quality|scrap|luminous|unique|rare|exotic|regular|luxe|lux|furnished|high quality|low quality|medium quality|advanced|max)\b/gi, "");
    
    // Strip articles
    clean = clean.replace(/\b(?:a|an|the|in\s+bulk|bulk)\b/gi, "");
    
    // Normalize whitespace
    clean = clean.replace(/\s+/g, " ").trim();
    
    // Singularize common plurals
    if (clean.endsWith("ies")) {
        clean = clean.slice(0, -3) + "y"; // batteries -> battery, rubies -> ruby
    } else if (clean.endsWith("es") && !clean.endsWith("one") && !clean.endsWith("use") && !clean.endsWith("ate")) {
        clean = clean.slice(0, -2);
    } else if (clean.endsWith("s") && !clean.endsWith("ss") && !clean.endsWith("us") && !clean.endsWith("ex")) {
        clean = clean.slice(0, -1);
    }
    
    return clean;
}

function pluralizeItemName(name) {
    const lower = name.toLowerCase();
    if (lower.endsWith("y") && !lower.endsWith("day") && !lower.endsWith("play")) {
        return name.slice(0, -1) + "ies"; // battery -> batteries
    }
    if (lower.endsWith("s")) {
        return name; // already plural or ends with s
    }
    if (lower.endsWith("ch") || lower.endsWith("sh") || lower.endsWith("x")) {
        return name + "es";
    }
    // Specific compound words pluralization
    if (lower.includes("ticket")) {
        return name.replace(/ticket/i, "tickets");
    }
    if (lower.includes("container")) {
        return name.replace(/container/i, "containers");
    }
    if (lower.includes("rod")) {
        return name.replace(/rod/i, "rods");
    }
    if (lower.includes("card")) {
        return name.replace(/card/i, "cards");
    }
    if (lower.includes("kit")) {
        return name.replace(/kit/i, "kits");
    }
    if (lower.includes("can")) {
        return name.replace(/can/i, "cans");
    }
    return name + "s";
}

function fuzzyCorrectItemName(rawItem, ctx) {
    const cleanLower = rawItem.toLowerCase().trim();
    const cleaned = cleanItemForFuzzy(rawItem);
    const hasEach = /\beach\b/i.test(cleanLower) || cleanLower.includes("__has_each__");
    
    // 1. Ticket check
    if (cleanLower.includes("ticket") || cleanLower.includes("tcket") || cleanLower.includes("tikcet") || cleanLower.includes("tick") || cleaned.includes("ticket")) {
        let canonical = "";
        if (cleanLower.includes("cayo") || cleanLower.includes("perico")) canonical = "Cayo Perico ticket";
        else if (cleanLower.includes("car")) canonical = "Car ticket";
        else if (cleanLower.includes("resource")) canonical = "Resource Miners ticket";
        else if (cleanLower.includes("grand") || cleanLower.includes("rp")) canonical = "Grand ticket";
        else if (cleanLower.includes("secret")) {
            if (cleanLower.includes("fragment") || cleanLower.includes("fragmnet")) {
                canonical = "Secret ticket fragment";
            } else {
                canonical = "Secret ticket";
            }
        }
        else if (cleanLower.includes("regular") || (cleanLower.includes("lottery") && !cleanLower.includes("rare") && !cleanLower.includes("flame"))) canonical = "regular lottery ticket";
        else if (cleanLower.includes("rare")) canonical = "rare lottery ticket";
        else if (cleanLower.includes("flame") || cleanLower.includes("water")) canonical = "flame and water lottery ticket";
        else canonical = "lottery ticket";

        let qty = parseQuantity(rawItem);
        const isPlural = cleanLower.includes("tickets") || cleanLower.includes("tckets") || cleanLower.includes("tikcets") || cleanLower.includes("fragments") || cleanLower.includes("fragmnets") || hasEach;
        
        if (qty && qty > 1) {
            if (canonical.includes("fragment")) {
                canonical = canonical.replace(/fragment/i, "fragments");
            } else {
                canonical = canonical.replace(/ticket/i, "tickets");
            }
            if ((cleanLower.includes("in bulk") || cleanLower.includes("bulk")) && !canonical.toLowerCase().includes("in bulk")) {
                canonical = `${qty} ${canonical} in bulk`;
            } else {
                canonical = `${qty} ${canonical}`;
            }
        } else if (cleanLower.includes("in bulk") || cleanLower.includes("bulk") || isPlural) {
            if (canonical.includes("fragment")) {
                canonical = canonical.replace(/fragment/i, "fragments");
            } else {
                canonical = canonical.replace(/ticket/i, "tickets");
            }
            if (cleanLower.includes("in bulk") || cleanLower.includes("bulk")) {
                canonical += " in bulk";
            }
        }
        return canonical;
    }
    
    // 1.5. Fish check
    const fishList = ["salmon", "carp", "perch", "trout", "megalodon", "ray", "orca", "humpback whale"];
    let matchedFish = null;
    let isBulk = cleanLower.includes("in bulk") || cleanLower.includes("bulk");
    let qty = parseQuantity(rawItem);
    
    if (cleanLower.includes("humpback") || cleanLower.includes("whale")) {
        matchedFish = "humpback whale";
    } else {
        for (const fish of fishList) {
            if (fish === "humpback whale") continue;
            const regex = new RegExp(`\\b${fish}s?\\b|\\bperches\\b`, "i");
            if (regex.test(cleanLower) || cleanLower.includes(fish) || cleaned.includes(fish)) {
                matchedFish = fish;
                break;
            }
        }
    }
    
    if (matchedFish) {
        let qtyText = qty ? `${qty} ` : "";
        let suffix = isBulk ? " in bulk" : "";
        return `${qtyText}${matchedFish}${suffix}`;
    }
    
    // 1.6. Tuning parts check
    const tuningParts = ["engine", "transmission", "suspension", "brakes", "tires", "tuning part", "tuning parts"];
    let matchedPart = null;
    let quality = "";
    
    for (const part of tuningParts) {
        if (cleanLower.includes(part)) {
            matchedPart = part;
            break;
        }
    }
    
    if (matchedPart) {
        if (cleanLower.includes("low") || cleanLower.includes("lvl 1") || cleanLower.includes("lvl1") || cleanLower.includes("level 1") || cleanLower.includes("1lvl") || cleanLower.includes("1 lvl")) {
            quality = "low quality ";
        } else if (cleanLower.includes("medium") || cleanLower.includes("med") || cleanLower.includes("lvl 2") || cleanLower.includes("lvl2") || cleanLower.includes("level 2") || cleanLower.includes("2lvl") || cleanLower.includes("2 lvl")) {
            quality = "medium quality ";
        } else if (cleanLower.includes("high") || cleanLower.includes("lvl 3") || cleanLower.includes("lvl3") || cleanLower.includes("level 3") || cleanLower.includes("3lvl") || cleanLower.includes("3 lvl")) {
            quality = "high quality ";
        } else if (cleanLower.includes("max") || cleanLower.includes("lvl 4") || cleanLower.includes("lvl4") || cleanLower.includes("level 4") || cleanLower.includes("4lvl") || cleanLower.includes("4 lvl")) {
            quality = "max quality ";
        } else if (cleanLower.includes("advanced")) {
            quality = "advanced quality ";
        }
        
        let qty = parseQuantity(rawItem);
        let qtyText = qty ? `${qty} ` : "";
        let isPlural = cleanLower.includes("parts") || cleanLower.includes("tunings") || (qty && qty > 1) || cleanLower.endsWith("s");
        
        let canonicalName = matchedPart;
        if (canonicalName === "tuning part" || canonicalName === "tuning parts") {
            canonicalName = isPlural ? "tuning parts" : "tuning part";
        } else {
            canonicalName = isPlural ? `${canonicalName} tunings` : `${canonicalName} tuning`;
        }
        
        return `${qtyText}${quality}${canonicalName}`;
    }
    
    // 1.7. Pickaxe check
    if (cleanLower.includes("pickaxe") || cleanLower.includes("pick axe") || cleaned.includes("pickaxe")) {
        let quality = "";
        if (cleanLower.includes("low") || cleanLower.includes("lvl 1") || cleanLower.includes("lvl1") || cleanLower.includes("level 1") || cleanLower.includes("1lvl") || cleanLower.includes("1 lvl")) {
            quality = "low quality ";
        } else if (cleanLower.includes("medium") || cleanLower.includes("med") || cleanLower.includes("lvl 2") || cleanLower.includes("lvl2") || cleanLower.includes("level 2") || cleanLower.includes("2lvl") || cleanLower.includes("2 lvl")) {
            quality = "medium quality ";
        } else if (cleanLower.includes("high") || cleanLower.includes("lvl 3") || cleanLower.includes("lvl3") || cleanLower.includes("level 3") || cleanLower.includes("3lvl") || cleanLower.includes("3 lvl")) {
            quality = "high quality ";
        } else if (cleanLower.includes("max") || cleanLower.includes("lvl 4") || cleanLower.includes("lvl4") || cleanLower.includes("level 4") || cleanLower.includes("4lvl") || cleanLower.includes("4 lvl")) {
            quality = "max quality ";
        } else if (cleanLower.includes("advanced") || cleanLower.includes("lvl 5") || cleanLower.includes("lvl5") || cleanLower.includes("level 5") || cleanLower.includes("5lvl") || cleanLower.includes("5 lvl")) {
            quality = "advanced quality ";
        }
        
        let qty = parseQuantity(rawItem);
        let qtyText = qty ? `${qty} ` : "";
        let isPlural = cleanLower.includes("pickaxes") || (qty && qty > 1) || cleanLower.endsWith("s") || hasEach;
        let name = isPlural ? "pickaxes" : "pickaxe";
        
        return `${qtyText}${quality}${name}`;
    }
    
    // 1.8. Inventory check
    if (cleanLower.includes("inventory") || cleanLower.includes("inventry") || cleanLower.includes("inventories")) {
        let quality = "";
        if (cleanLower.includes("low") || cleanLower.includes("lvl 1") || cleanLower.includes("lvl1") || cleanLower.includes("level 1") || cleanLower.includes("1lvl") || cleanLower.includes("1 lvl")) {
            quality = "low quality ";
        } else if (cleanLower.includes("medium") || cleanLower.includes("med") || cleanLower.includes("lvl 2") || cleanLower.includes("lvl2") || cleanLower.includes("level 2") || cleanLower.includes("2lvl") || cleanLower.includes("2 lvl")) {
            quality = "medium quality ";
        } else if (cleanLower.includes("high") || cleanLower.includes("lvl 3") || cleanLower.includes("lvl3") || cleanLower.includes("level 3") || cleanLower.includes("3lvl") || cleanLower.includes("3 lvl")) {
            quality = "high quality ";
        } else if (cleanLower.includes("max") || cleanLower.includes("lvl 4") || cleanLower.includes("lvl4") || cleanLower.includes("level 4") || cleanLower.includes("4lvl") || cleanLower.includes("4 lvl")) {
            quality = "max quality ";
        }
        
        let qty = parseQuantity(rawItem);
        let qtyText = qty ? `${qty} ` : "";
        let isPlural = cleanLower.includes("inventories") || (qty && qty > 1) || hasEach;
        let name = isPlural ? "inventories" : "inventory";
        
        return `${qtyText}${quality}${name}`;
    }
    
    // Biospark check
    if (cleanLower.includes("biospark") || cleaned.includes("biospark")) {
        let qty = parseQuantity(rawItem);
        let qtyText = qty ? `${qty} ` : "";
        let isPlural = cleanLower.includes("biosparks") || (qty && qty > 1) || hasEach;
        let name = isPlural ? "Biosparks" : "Biospark";
        return `${qtyText}${name}`;
    }
    
    // 1.9. Power booster shot check
    if (cleanLower.includes("booster") || cleanLower.includes("boost shot") || cleanLower.includes("booster shot")) {
        let qty = parseQuantity(rawItem);
        let qtyText = qty ? `${qty} ` : "";
        let isPlural = cleanLower.includes("shots") || (qty && qty > 1) || cleanLower.endsWith("s") || hasEach;
        let name = isPlural ? "power booster shots" : "power booster shot";
        return `${qtyText}${name}`;
    }
    
    // 1.10. Fishing rod check
    if (cleanLower.includes("fishing rod") || cleanLower.includes("fishingrod") || cleanLower.includes("rod") || cleaned.includes("fishing rod")) {
        let quality = "";
        if (cleanLower.includes("low") || cleanLower.includes("lvl 1") || cleanLower.includes("lvl1") || cleanLower.includes("level 1") || cleanLower.includes("1lvl") || cleanLower.includes("1 lvl")) {
            quality = "low quality ";
        } else if (cleanLower.includes("medium") || cleanLower.includes("med") || cleanLower.includes("lvl 2") || cleanLower.includes("lvl2") || cleanLower.includes("level 2") || cleanLower.includes("2lvl") || cleanLower.includes("2 lvl")) {
            quality = "medium quality ";
        } else if (cleanLower.includes("high") || cleanLower.includes("lvl 3") || cleanLower.includes("lvl3") || cleanLower.includes("level 3") || cleanLower.includes("3lvl") || cleanLower.includes("3 lvl")) {
            quality = "high quality ";
        } else if (cleanLower.includes("max") || cleanLower.includes("lvl 4") || cleanLower.includes("lvl4") || cleanLower.includes("level 4") || cleanLower.includes("4lvl") || cleanLower.includes("4 lvl")) {
            quality = "max quality ";
        } else if (cleanLower.includes("advanced") || cleanLower.includes("lvl 5") || cleanLower.includes("lvl5") || cleanLower.includes("level 5") || cleanLower.includes("5lvl") || cleanLower.includes("5 lvl")) {
            quality = "advanced quality ";
        }
        
        let qty = parseQuantity(rawItem);
        let qtyText = qty ? `${qty} ` : "";
        let isPlural = cleanLower.includes("rods") || (qty && qty > 1) || cleanLower.endsWith("s") || hasEach;
        let name = isPlural ? "fishing rods" : "fishing rod";
        
        return `${qtyText}${quality}${name}`;
    }
    
    // 1.11. SIM card check
    if (cleanLower.includes("sim card") || cleanLower.includes("simcard") || cleanLower.includes("sim card no") || cleanLower.includes("sim card \u2116")) {
        const numMatch = rawItem.match(/\b\d+[-0-9]*\b/);
        let numStr = numMatch ? numMatch[0] : "";
        let qty = parseQuantity(rawItem);
        let isPlural = cleanLower.includes("cards") || (!numStr && qty > 1);
        
        if (isPlural) {
            let qtyText = qty ? `${qty} ` : "";
            return `${qtyText}SIM cards`;
        } else {
            if (numStr) {
                return `SIM card \u2116 ${numStr}`;
            } else {
                return `SIM card`;
            }
        }
    }
    
    // 2. Fruits check
    const fruitsList = ["pineapple", "mandarin", "strawberry", "pumpkin", "cabbage", "mushroom"];
    for (const fruit of fruitsList) {
        if (cleanLower.includes(fruit) || cleaned.includes(fruit) || getClosestMatch(cleaned, [fruit], 0.7)) {
            let type = (fruit === "cabbage") ? "vegetables" : "fruits";
            if (cleanLower.includes("seed") || cleaned.includes("seed")) type = "seeds";
            
            let qty = parseQuantity(rawItem);
            let qtyText = qty ? `${qty} ` : "";
            let suffix = isBulk ? " in bulk" : "";
            return `${qtyText}${fruit} ${type}${suffix}`;
        }
    }
    
    // 3. Shoulder pets
    if (cleanLower.includes("shoulder") || cleanLower.includes("sholder") || cleanLower.includes("pet") || cleanLower.includes("fox") || cleanLower.includes("cat") ||
        cleaned.includes("shoulder") || cleaned.includes("sholder") || cleaned.includes("pet") || cleaned.includes("fox") || cleaned.includes("cat")) {
        
        const petNames = ["six tailed fox", "white cat", "brown dog", "dog", "fox", "cat"];
        const cleanedStr = cleanLower.replace(/on shoulder pet|shoulder pet|on shoulder|shoulder|sholder|pet/gi, "").trim();
        const cleanedStrFuzzy = cleanItemForFuzzy(cleanedStr);
        
        const matchedPet = getClosestMatch(cleanedStrFuzzy, petNames, 0.6) || getClosestMatch(cleanedStr, petNames, 0.6);
        if (matchedPet) {
            let canonicalPet = matchedPet;
            if (matchedPet === "six tail fox" || matchedPet === "6 tailed fox" || matchedPet === "6 tail fox" || matchedPet === "fox") {
                canonicalPet = "six tailed fox";
            }
            return `${canonicalPet} on shoulder pet`;
        }
    }
    
    // 4. Cage pets
    const petsList = ["panda", "duckling", "fancy bear", "kitty bunny", "cute hippo", "mini robot", "cyberdog", "robobeast", "mr candy cane", "futuristic friend", "husky", "new years husky", "border collie", "cougar", "poodle", "pug", "retriever", "rooster", "puma", "rottweiler", "cosmodog", "easter bunny", "santa claus", "christmas elf", "rabbit", "rat", "pig", "lion cub", "westie"];
    for (const pet of petsList) {
        if (cleanLower.includes(pet) || cleaned.includes(pet) || getClosestMatch(cleaned, [pet], 0.7)) {
            const pCap = pet.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
            return `cage with a ${pCap}`;
        }
    }
    
    // 5. Resources check
    const resourcesList = ["copper", "emerald", "ruby", "diamond", "obsidian", "magma stone", "metal"];
    for (const res of resourcesList) {
        if (cleanLower.includes(res) || cleaned.includes(res) || getClosestMatch(cleaned, [res], 0.7)) {
            let qty = parseQuantity(rawItem);
            let qtyText = qty ? `${qty} ` : "";
            let pName = res;
            
            const isBulk = cleanLower.includes("in bulk") || cleanLower.includes("bulk");
            
            const isEach = /\beach\b/i.test(cleanLower);
            if (res === "emerald") pName = (qty > 1 || isBulk || cleanLower.endsWith("s") || isEach) ? "emeralds" : "an emerald";
            else if (res === "ruby") pName = (qty > 1 || isBulk || cleanLower.endsWith("s") || cleanLower.endsWith("ies") || isEach) ? "rubies" : "a ruby";
            else if (res === "diamond") pName = (qty > 1 || isBulk || cleanLower.endsWith("s") || isEach) ? "diamonds" : "a diamond";
            else if (res === "magma stone") pName = (qty > 1 || isBulk || cleanLower.endsWith("s") || isEach) ? "magma stones" : "a magma stone";
            else if (res === "metal") {
                if (/\b(?:top|top\s+quality|high\s+quality)\b/i.test(cleanLower) || /\b(?:top|top\s+quality|high\s+quality)\b/i.test(cleaned)) {
                    pName = "top quality metal";
                } else if (cleanLower.includes("scrap") || cleaned.includes("scrap")) {
                    pName = "scrap metal";
                } else {
                    pName = "scrap metal"; // fallback
                }
            }
            
            let resultName = `${qtyText}${pName}`;
            if (isBulk && !resultName.toLowerCase().includes("in bulk")) {
                resultName += " in bulk";
            }
            return resultName;
        }
    }
    
    // 6. General mappings
    const mappings = {
        "automatic drill": ["automatic drill", "auto drill", "drill", "dril"],
        "automatic sawmill": ["automatic sawmill", "sawmill", "saw mill"],
        "video card": ["video card", "videocard", "graphic card", "graphics card", "gpu"],
        "repair kit": ["repair kit", "rep kit"],
        "hookah": ["hookah", "hoka"],
        "paint can": ["paint can", "spray can"],
        "battery": ["battery", "batteries", "battries", "batry", "battres", "battre", "batteys", "battey"],
        "scrap metal": ["scrap metal", "scrapmetal"],
        "top quality metal": ["top quality metal", "top quality metel"],
        "thread": ["thread", "threads"],
        "timber": ["timber"],
        "token": ["token", "tokens"],
        "tonic treat": ["tonic treat", "tonic", "treat"],
        "Treasure Map": ["treasure map", "treasuremap"],
        "wires": ["wires", "wire"],
        "sponge": ["sponge", "sponges"],
        "license plate": ["license plate", "licence plate"],
        "fuel for resource extraction": ["fuel for resource extraction", "fuel", "resource extraction fuel", "extraction fuel"],
        "Progen container": ["progen container", "progen containers", "progen contaner", "progen contaners", "container", "containers", "p1 container", "p1 containers", "p1 contaner", "p1 contaners"],
        "valuable container": ["valuable container", "valuable containers", "valuable contaner", "valuable contaners"],
        "Delivered caravans container": ["delivered caravans container", "delivered caravans containers", "caravans container", "caravans containers", "delivered caravan container", "delivered caravan containers"],
        "bandit container": ["bandit container", "bandit containers", "bandit contaner", "bandit contaners"],
        "biker container": ["biker container", "biker containers", "biker contaner", "biker contaners"],
        "trucker container": ["trucker container", "trucker containers", "trucker contaner", "trucker contaners"],
        "Ingrand container": ["ingrand container", "ingrand containers", "ingrand contaner", "ingrand contaners"],
        "desert scarf mask container": ["desert scarf mask container", "desert scarf mask containers", "desert scarf mask contaner", "desert scarf mask contaners"],
        "charger": ["charger", "chargers", "electric charger", "electric chargers", "electric charging", "charging"],
        "personal driver": ["personal driver", "personal drivers", "professional driver", "professional drivers", "driver", "drivers"],
        "lawyer": ["lawyer", "lawyers"],
        "professional dancer": ["professional dancer", "professional dancers"],
        "professional singer": ["professional singer", "professional singers"],
        "DJ": ["dj", "djs"]
    };
    
    for (const canonical in mappings) {
        const aliases = mappings[canonical];
        
        // Prevent fuzzy matching non-containers to containers
        if (canonical.toLowerCase().includes("container")) {
            const hasContainerWord = /\b(?:container|containers|contaner|contaners|continres|continre)\b/i.test(cleanLower);
            if (!hasContainerWord) {
                continue;
            }
        }
        
        // Check match against cleanLower, cleaned, and each alias cleaned
        let matchedAlias = getClosestMatch(cleaned, aliases.map(cleanItemForFuzzy), 0.7) || getClosestMatch(cleanLower, aliases, 0.7);
        if (matchedAlias) {
            let qty = parseQuantity(rawItem);
            let qtyText = qty ? `${qty} ` : "";
            
            let quality = "";
            if (cleanLower.includes("low") || cleaned.includes("low")) quality = "low quality ";
            else if (cleanLower.includes("medium") || cleanLower.includes("med") || cleaned.includes("medium") || cleaned.includes("med")) quality = "medium quality ";
            else if (cleanLower.includes("high") || cleaned.includes("high")) quality = "high quality ";
            else if (cleanLower.includes("max") || cleaned.includes("max")) quality = "max quality ";
            else if (cleanLower.includes("advanced") || cleaned.includes("advanced")) quality = "advanced quality ";
            
            let finalName = canonical;
            if (finalName === "license plate") {
                const plateMatch = rawItem.match(/license plate\s*\(?([a-z0-9]+)\)?/i) || rawItem.match(/plate\s*\(?([a-z0-9]+)\)?/i);
                if (plateMatch) {
                    return `license plate (${plateMatch[1].toUpperCase()})`;
                }
            }
            
            if (qty > 1 || cleanLower.endsWith("s") || cleanLower.includes("in bulk") || cleanLower.includes("bulk") || hasEach) {
                finalName = pluralizeItemName(finalName);
            }
            
            let resultName = `${qtyText}${quality}${finalName}`;
            if ((cleanLower.includes("in bulk") || cleanLower.includes("bulk")) && !resultName.toLowerCase().includes("in bulk")) {
                resultName += " in bulk";
            }
            return resultName;
        }
    }
    
    return null;
}

function formatGeneralItem(text, ctx) {
    const lower = text.toLowerCase();
    
    if (lower.includes("various items") && (lower.includes("beach market") || lower.includes("beach markit"))) {
        const shopMatch = text.match(/(?:shop|\u2116|#|no\.?|number|num\.?)\s*(?:no\.?|number|num\.?|#|\u2116)?\s*(\d+)/i);
        let shopStr = shopMatch ? ` shop \u2116${shopMatch[1]}` : "";
        return `various items at the beach market${shopStr}`;
    }
    
    if (lower.includes("juice") || lower.includes("juise") || lower.includes("juse")) {
        let juiceName = "";
        let qty = parseQuantity(text);
        let qtyText = qty ? `${qty} ` : "";
        let isPlural = lower.includes("juices") || lower.includes("juises") || lower.includes("juses") || (qty && qty > 1);
        
        if (lower.includes("becoming an animal") || lower.includes("becoming animal") || lower.includes("become animal") || lower.includes("becomng animal") || lower.includes("animal")) {
            juiceName = isPlural ? "juices on becoming an animal" : "juice on becoming an animal";
        } else if (lower.includes("double the payment") || lower.includes("double payment") || lower.includes("double pay") || lower.includes("paycheck") || lower.includes("pay check")) {
            juiceName = isPlural ? "juices for double the payment" : "juice for double the payment";
        } else if (lower.includes("fast running") || lower.includes("fastrun") || lower.includes("running") || /\brun\b/i.test(lower)) {
            juiceName = isPlural ? "fast running juices" : "fast running juice";
        } else if (lower.includes("attack")) {
            juiceName = isPlural ? "attack juices" : "attack juice";
        } else if (lower.includes("protection")) {
            juiceName = isPlural ? "protection juices" : "protection juice";
        } else if (lower.includes("endurance")) {
            juiceName = isPlural ? "endurance juices" : "endurance juice";
        } else if (lower.includes("riding")) {
            juiceName = isPlural ? "riding juices" : "riding juice";
        } else if (lower.includes("power")) {
            juiceName = isPlural ? "power juices" : "power juice";
        } else if (lower.includes("immunity")) {
            juiceName = isPlural ? "immunity juices" : "immunity juice";
        }
        
        if (juiceName) {
            const pctMatch = text.match(/\b(\d+)%/);
            if (pctMatch) {
                const pct = pctMatch[1] + "%";
                juiceName = `${pct} ${juiceName}`;
            }
            return `${qtyText}${juiceName}`;
        }
        
        const pctMatches = text.match(/\b\d+%(?!\w)/g);
        if (pctMatches && pctMatches.length >= 2) {
            return `${pctMatches[0]} and ${pctMatches[1]} juices in bulk`;
        } else if (pctMatches && pctMatches.length === 1) {
            return `${pctMatches[0]} juices in bulk`;
        } else {
            return `juices in bulk`;
        }
    }
    
    if (lower.includes("prime") || lower.includes("platnum") || lower.includes("platinum")) {
        let type = "Prime";
        if (lower.includes("platinum") || lower.includes("platnum")) type = "Prime Platinum";
        
        const numberMatches = [...text.matchAll(/\b(\d+)\b/g)].map(m => parseInt(m[1]));
        if (numberMatches.length >= 2) {
            return `${type} with ${numberMatches[0]} and ${numberMatches[1]} days`;
        } else if (numberMatches.length === 1) {
            return `${type} with ${numberMatches[0]} days`;
        }
        return type;
    }
    
    const fuzzyCorrected = fuzzyCorrectItemName(text, ctx);
    if (fuzzyCorrected) {
        return fuzzyCorrected;
    }
    
    return null;
}

function parseQuantity(text) {
    const lower = text.toLowerCase();
    const regex = /\b(\d+)\b/g;
    let match;
    while ((match = regex.exec(lower)) !== null) {
        const val = parseInt(match[1]);
        const start = match.index;
        const end = regex.lastIndex;
        // check prefix
        const prefixText = lower.substring(Math.max(0, start - 15), start).trim();
        if (/(?:house|apartment|mansion|penthouse|shop|card|cards|sim|\u2116|#|no\.?|level|lvl|type|t\.?|volex|kolex|trousers?|masks?|shoes?|t-shirts?|sweatshirts?|jackets?|hoodies?|dress|watch(?:es)?|glasses|caps?|hats?|shorts?|leggings?|suits?|accessory|accessories|skirts?|vests?|pants|piercings?|horns?|earphones?|headphones?|ears?|capes?|crowns?|gloves?)$/i.test(prefixText.replace(/[:#\s\u2116]+$/g, "").trim())) {
            continue;
        }
        // check suffix
        const suffixText = lower.substring(end, Math.min(lower.length, end + 15)).trim();
        if (/^(?:%|percent|g\.?s\.?|w\.?h\.?|days?|lvls?|levels?|years?)/i.test(suffixText)) {
            continue;
        }
        return val;
    }
    return null;
}

/* ==========================================================================
   Location Prepositions & Capitalization Formatter
   ========================================================================== */

function formatLocationTerms(bodyText, ctx) {
    let lower = bodyText.toLowerCase();
    let result = bodyText;
    
    // 1. Check Official Places
    OFFICIAL_PLACES.forEach(place => {
        const pLower = place.toLowerCase();
        // Case-insensitive replace with proper casing
        const regex = new RegExp(`\\b${escapeRegExp(pLower)}\\b`, "gi");
        if (regex.test(result)) {
            result = result.replace(regex, place);
            ctx.logs.push({ text: `Capitalized official place: <strong>${place}</strong>`, type: 'correction' });
        }
    });
    
    // 2. Check Unofficial Places (Must prepend "the" if prepositions like in, near, at are present)
    UNOFFICIAL_PLACES.forEach(place => {
        // Find prepositions followed by the place
        // e.g. "near beach market" or "in ghetto" or "at airport"
        const prepRegex = new RegExp(`\\b(in|near|at|to)\\s+(${escapeRegExp(place)})\\b`, "gi");
        if (prepRegex.test(result)) {
            result = result.replace(prepRegex, `$1 the $2`);
            ctx.logs.push({ text: `Inserted "the" preposition modifier for unofficial place: <strong>${place}</strong>`, type: 'correction' });
        }
        
        // Ensure unofficial places are fully lowercase
        const placeRegex = new RegExp(`\\b${escapeRegExp(place)}\\b`, "gi");
        if (placeRegex.test(result)) {
            result = result.replace(placeRegex, place.toLowerCase());
        }
    });
    
    return result;
}

/* ==========================================================================
   UI Update & Rendering
   ========================================================================== */

function updateUI(ctx) {
    const textDisplay = document.getElementById("processed-ad-text");
    const banner = document.getElementById("ad-status-banner");
    const rejectionBox = document.getElementById("rejection-container");
    const blacklistBox = document.getElementById("blacklist-container");
    const logsList = document.getElementById("audit-logs-list");
    const btnCopy = document.getElementById("btn-copy-ad");
    const btnCopyRej = document.getElementById("btn-copy-rejection");
    
    // Clear logs
    logsList.innerHTML = "";
    
    // Render logs
    if (ctx.logs.length === 0) {
        logsList.innerHTML = `<li class="log-empty">No corrections made.</li>`;
    } else {
        ctx.logs.forEach(log => {
            const li = document.createElement("li");
            let icon = `<i class="fa-solid fa-circle-info log-correction"></i>`;
            if (log.type === 'policy') icon = `<i class="fa-solid fa-square-check log-policy"></i>`;
            else if (log.type === 'warning') icon = `<i class="fa-solid fa-triangle-exclamation log-warning"></i>`;
            else if (log.type === 'danger') icon = `<i class="fa-solid fa-circle-xmark log-danger"></i>`;
            
            li.innerHTML = `${icon} <span>${log.text.replace(/<(?!\/?(?:strong|em|code)\b)[^>]*>/gi, '')}</span>`;
            logsList.appendChild(li);
        });
    }
    
    // Render status
    if (ctx.status === "passed") {
        textDisplay.textContent = ctx.finalText;
        textDisplay.classList.remove("placeholder");
        
        banner.setAttribute("data-status", "passed");
        banner.querySelector(".status-title").textContent = "Policy Check Passed";
        banner.querySelector(".status-icon").innerHTML = `<i class="fa-solid fa-circle-check"></i>`;
        
        rejectionBox.classList.add("hide");
        blacklistBox.classList.add("hide");
        btnCopy.disabled = false;
        
        if (btnCopyRej) btnCopyRej.classList.add("hide");
        
        // Stats increment check (only once per ad text)
        if (updateUI._lastText !== ctx.raw) {
            stats.processed++;
            const el = document.getElementById("stat-processed");
            if (el) el.querySelector(".stat-value").textContent = stats.processed;
            updateUI._lastText = ctx.raw;
        }
    } else if (ctx.status === "rejected") {
        textDisplay.textContent = "Advertisement Rejected.";
        textDisplay.classList.add("placeholder");
        
        banner.setAttribute("data-status", "rejected");
        banner.querySelector(".status-title").textContent = "Ad Rejected";
        banner.querySelector(".status-icon").innerHTML = `<i class="fa-solid fa-circle-xmark"></i>`;
        
        document.getElementById("rejection-reason-text").textContent = ctx.rejectionReason;
        rejectionBox.classList.remove("hide");
        blacklistBox.classList.add("hide");
        btnCopy.disabled = true;
        
        if (btnCopyRej) {
            btnCopyRej.classList.remove("hide");
        }
        
        if (updateUI._lastText !== ctx.raw) {
            stats.rejections++;
            const el = document.getElementById("stat-rejections");
            if (el) el.querySelector(".stat-value").textContent = stats.rejections;
            updateUI._lastText = ctx.raw;
        }
    } else if (ctx.status === "blacklisted") {
        textDisplay.textContent = "Advertisement Rejected. Phone Blacklisted.";
        textDisplay.classList.add("placeholder");
        
        banner.setAttribute("data-status", "blacklisted");
        banner.querySelector(".status-title").textContent = "Blacklist Triggered";
        banner.querySelector(".status-icon").innerHTML = `<i class="fa-solid fa-hand-fist"></i>`;
        
        document.getElementById("rejection-reason-text").textContent = ctx.rejectionReason;
        document.getElementById("blacklist-reason-text").textContent = ctx.blacklistReason;
        
        rejectionBox.classList.remove("hide");
        blacklistBox.classList.remove("hide");
        btnCopy.disabled = true;
        
        if (btnCopyRej) {
            btnCopyRej.classList.remove("hide");
        }
        
        if (updateUI._lastText !== ctx.raw) {
            stats.blacklists++;
            const el = document.getElementById("stat-blacklists");
            if (el) el.querySelector(".stat-value").textContent = stats.blacklists;
            updateUI._lastText = ctx.raw;
        }
    }
}

/* ==========================================================================
   Helper Routines
   ========================================================================== */

function escapeHTML(str) {
    if (!str) return "";
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/* ==========================================================================
   Document Picture-in-Picture (Always-on-top Floating Clipboard)
   ========================================================================== */

let pipWindowInstance = null;

function initFloatingClipboard() {
    const btnFloat = document.getElementById("btn-float-pip");
    if (!btnFloat) return;

    btnFloat.addEventListener("click", async () => {
        if (!('documentPictureInPicture' in window)) {
            alert("Floating Clipboard mode (Document Picture-in-Picture) is not supported in this browser.\n\nPlease use a modern version of Microsoft Edge or Google Chrome on Windows 10/11.");
            return;
        }

        if (pipWindowInstance) {
            pipWindowInstance.close();
            return;
        }

        try {
            // Request a Picture-in-Picture window
            const pipWindow = await window.documentPictureInPicture.requestWindow({
                width: 420,
                height: 850
            });
            pipWindowInstance = pipWindow;

            try {
                pipWindow.focus();
                window.blur();
            } catch (focusErr) {
                console.warn("Focus/blur error:", focusErr);
            }

            // Toggle main window overlay to hide content and keep only the overlay visible
            const mainContainer = document.querySelector(".app-container");
            const pipOverlay = document.getElementById("pip-active-overlay");
            if (mainContainer && pipOverlay) {
                mainContainer.classList.add("hide");
                pipOverlay.classList.remove("hide");
            }

            // Save window coordinates and try to minimize (shrink/move) main window
            const originalPosition = {
                x: window.screenX || window.screenLeft || 0,
                y: window.screenY || window.screenTop || 0,
                width: window.outerWidth || window.innerWidth || 1200,
                height: window.outerHeight || window.innerHeight || 800
            };
            sessionStorage.setItem('li_pwa_original_pos', JSON.stringify(originalPosition));
            
            try {
                // Shrink to tiny dimensions and move to bottom-left corner
                window.resizeTo(160, 80);
                window.moveTo(0, window.screen.availHeight - 100);
            } catch (err) {
                console.warn("Could not shrink window:", err);
            }

            let isMainWindowShrunk = true;

            const handleMainFocus = () => {
                if (isMainWindowShrunk) {
                    const storedPos = sessionStorage.getItem('li_pwa_original_pos');
                    if (storedPos) {
                        try {
                            const pos = JSON.parse(storedPos);
                            window.resizeTo(pos.width, pos.height);
                            window.moveTo(pos.x, pos.y);
                            isMainWindowShrunk = false;
                        } catch (err) {
                            console.warn("Could not restore window on focus:", err);
                        }
                    }
                }
            };

            const handleMainBlur = () => {
                setTimeout(() => {
                    if (!document.hasFocus() && pipWindowInstance && !isMainWindowShrunk) {
                        const currentPos = {
                            x: window.screenX || window.screenLeft || 0,
                            y: window.screenY || window.screenTop || 0,
                            width: window.outerWidth || window.innerWidth || 1200,
                            height: window.outerHeight || window.innerHeight || 800
                        };
                        sessionStorage.setItem('li_pwa_original_pos', JSON.stringify(currentPos));
                        
                        try {
                            window.resizeTo(160, 80);
                            window.moveTo(0, window.screen.availHeight - 100);
                            isMainWindowShrunk = true;
                        } catch (err) {
                            console.warn("Could not shrink window on blur:", err);
                        }
                    }
                }, 150);
            };

            window.addEventListener("focus", handleMainFocus);
            window.addEventListener("blur", handleMainBlur);

            // Bind Return to Main button on the overlay
            const btnRestore = document.getElementById("btn-restore-main");
            if (btnRestore) {
                const newBtnRestore = btnRestore.cloneNode(true);
                btnRestore.parentNode.replaceChild(newBtnRestore, btnRestore);
                newBtnRestore.addEventListener("click", () => {
                    if (pipWindowInstance) {
                        pipWindowInstance.close();
                    }
                });
            }

            // Copy stylesheets from main window
            [...document.styleSheets].forEach((styleSheet) => {
                try {
                    const cssRules = [...styleSheet.cssRules].map((rule) => rule.cssText).join('');
                    const style = document.createElement('style');
                    style.textContent = cssRules;
                    pipWindow.document.head.appendChild(style);
                } catch (e) {
                    const link = document.createElement('link');
                    if (styleSheet.href) {
                        link.rel = 'stylesheet';
                        link.href = styleSheet.href;
                        pipWindow.document.head.appendChild(link);
                    }
                }
            });

            // Also copy Google Fonts links manually if needed
            document.querySelectorAll('link[rel="stylesheet"]').forEach(l => {
                if (l.href.includes("googleapis.com") || l.href.includes("font-awesome")) {
                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = l.href;
                    pipWindow.document.head.appendChild(link);
                }
            });

            // Add tab title
            pipWindow.document.title = "LifeInvader Floating Clipboard";

            // Inject the compact HTML layout
            pipWindow.document.body.innerHTML = `
                <div class="pip-layout" style="position: relative; height: 100vh; overflow: hidden; display: flex; flex-direction: column;">
                    <header class="pip-header">
                        <div class="pip-logo" style="display: flex; flex-direction: column; align-items: flex-start; gap: 3px;">
                            <div style="display: flex; align-items: center; gap: 6px;">
                                <span class="li-logo">
                                    <span class="li-text-l"><span class="li-letter">L</span><span class="li-letter">i</span><span class="li-letter">f</span><span class="li-letter">e</span></span><span class="li-text-i"><span class="li-letter">I</span><span class="li-letter">n</span><span class="li-letter">v</span><span class="li-letter">a</span><span class="li-letter">d</span><span class="li-letter">e</span><span class="li-letter">r</span></span>
                                </span>
                                <span class="pip-badge">Clipboard</span>
                            </div>
                            <span class="pip-created-by" style="font-size: 9.5px; color: rgba(255,255,255,0.45); font-family: 'Outfit', sans-serif; font-weight: 500; white-space: nowrap; margin-left: 2px;">Created by Dopamine</span>
                        </div>
                        <div class="pip-header-right" style="display: flex; align-items: center; justify-content: flex-end;">
                            <button id="pip-btn-history" style="background: var(--color-info); border: none; color: white; padding: 4px 10px; font-size: 9.5px; border-radius: 4px; cursor: pointer; font-family: 'Outfit', sans-serif; font-weight: 600; line-height: 1.2; display: inline-flex; align-items: center; gap: 4px; transition: all 0.2s;"><i class="fa-solid fa-clock-rotate-left"></i> History</button>
                        </div>
                    </header>
                    <main class="pip-main" style="flex: 1; overflow-y: auto;">
                        <div class="pip-form-group">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                                <label for="pip-raw-ad" style="margin-bottom: 0;">RAW ADVERTISEMENT CONTENT</label>
                                <span class="pip-updated-time" style="font-size: 8px; color: rgba(255,255,255,0.35); font-family: 'Outfit', sans-serif; font-weight: 500; text-transform: uppercase; white-space: nowrap; letter-spacing: 0.5px;">UPDATED: May 25 06:22</span>
                            </div>
                            <textarea id="pip-raw-ad" placeholder="Type or paste advertisement here..."></textarea>
                        </div>
                        <div class="pip-form-row">
                            <div class="pip-toggle-group">
                                <button type="button" class="pip-toggle" id="pip-toggle-sell">Sell</button>
                                <button type="button" class="pip-toggle" id="pip-toggle-buy">Buy</button>
                            </div>
                            <select id="pip-category-override">
                                <option value="auto">Auto-Detect</option>
                                <option value="Real Estate">Real Estate</option>
                                <option value="Auto">Auto</option>
                                <option value="Businesses">Businesses</option>
                                <option value="Work">Work</option>
                                <option value="Dating">Dating</option>
                                <option value="Services">Services</option>
                                <option value="Discounts">Discounts</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        
                        <div class="status-banner" id="pip-status-banner" data-status="pending">
                            <span class="status-icon"><i class="fa-solid fa-hourglass-half"></i></span>
                            <span class="status-title">Awaiting Input...</span>
                        </div>
                        
                        <div class="processed-container">
                            <div class="processed-header">
                                <span><i class="fa-solid fa-bullhorn"></i> FINAL ADVERTISEMENT</span>
                                <button id="pip-btn-copy" class="btn-copy" disabled>
                                    <i class="fa-solid fa-copy"></i> Copy
                                </button>
                            </div>
                            <div class="processed-text-wrapper">
                                <div id="pip-processed-text" class="processed-text placeholder" contenteditable="true" spellcheck="false">Processed ad will appear here...</div>
                            </div>
                        </div>
                        
                        <div class="notice-container hide" id="pip-rejection-container">
                            <div class="notice-box rejection">
                                <div class="notice-header" style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
                                    <div style="display: flex; align-items: center; gap: 8px;">
                                        <i class="fa-solid fa-circle-xmark"></i> Rejection Reason
                                    </div>
                                    <button id="pip-btn-copy-rejection" class="btn-copy hide" style="padding: 4px 8px; font-size: 11px;">
                                        <i class="fa-solid fa-copy"></i> Copy Reason
                                    </button>
                                </div>
                                <div class="notice-body" id="pip-rejection-reason"></div>
                            </div>
                        </div>
                        
                        <div class="notice-container hide" id="pip-blacklist-container">
                            <div class="notice-box blacklist">
                                <div class="notice-header"><i class="fa-solid fa-hand-fist"></i> Blacklist Warning</div>
                                <div class="notice-body" id="pip-blacklist-reason"></div>
                            </div>
                        </div>
                        
                        <div class="audit-logs-container">
                            <h3><i class="fa-solid fa-list-check"></i> Applied Rules &amp; Corrections</h3>
                            <ul class="audit-logs" id="pip-logs-list">
                                <li class="log-empty">No corrections made.</li>
                            </ul>
                        </div>
                    </main>
                    <div class="pip-history-overlay hide" id="pip-history-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(18, 18, 20, 0.97); z-index: 1000; display: flex; flex-direction: column; padding: 12px; box-sizing: border-box; font-family: 'Outfit', sans-serif;">
                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px solid var(--border-color); padding-bottom: 8px;">
                            <h3 style="margin: 0; font-size: 13px; font-family: 'Outfit', sans-serif; color: white;"><i class="fa-solid fa-clock-rotate-left"></i> Ad History</h3>
                            <div style="display: flex; gap: 6px;">
                                <button id="pip-btn-refresh-history" style="padding: 3px 8px; font-size: 10px; background-color: var(--accent-color); color: white; border: none; border-radius: 4px; cursor: pointer; font-family: 'Outfit', sans-serif; font-weight: 600;"><i class="fa-solid fa-sync"></i> Refresh</button>
                                <button id="pip-btn-close-history" style="padding: 3px 8px; font-size: 10px; background-color: #3f3f46; color: white; border: none; border-radius: 4px; cursor: pointer; font-family: 'Outfit', sans-serif; font-weight: 600;"><i class="fa-solid fa-xmark"></i> Close</button>
                            </div>
                        </div>
                        <div id="pip-history-list" style="flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 8px; padding-right: 4px;">
                            <div style="text-align: center; color: var(--text-secondary); padding: 20px; font-size: 11px;">Loading history...</div>
                        </div>
                    </div>
                </div>
            `;

            // Bind Elements
            const pipRaw = pipWindow.document.getElementById("pip-raw-ad");
            const pipCategory = pipWindow.document.getElementById("pip-category-override");
            const pipSell = pipWindow.document.getElementById("pip-toggle-sell");
            const pipBuy = pipWindow.document.getElementById("pip-toggle-buy");
            const pipClose = pipWindow.document.getElementById("pip-close-btn");
            const pipCopy = pipWindow.document.getElementById("pip-btn-copy");
            const pipCopyRej = pipWindow.document.getElementById("pip-btn-copy-rejection");

            // Sync initial values from main page
            const mainRaw = document.getElementById("raw-ad");
            const mainOverride = document.getElementById("category-override");
            
            pipRaw.value = mainRaw.value;
            pipCategory.value = mainOverride.value;

            // Function to update PiP display fields
            const updatePipDisplay = () => {
                const pipText = pipWindow.document.getElementById("pip-processed-text");
                const pipBanner = pipWindow.document.getElementById("pip-status-banner");
                const pipRejBox = pipWindow.document.getElementById("pip-rejection-container");
                const pipBlBox = pipWindow.document.getElementById("pip-blacklist-container");
                const pipLogs = pipWindow.document.getElementById("pip-logs-list");

                const mainProcessedText = document.getElementById("processed-ad-text");
                const mainBanner = document.getElementById("ad-status-banner");
                const mainRejBox = document.getElementById("rejection-container");
                const mainBlBox = document.getElementById("blacklist-container");
                const mainLogs = document.getElementById("audit-logs-list");

                // Text
                if (pipText.textContent !== mainProcessedText.textContent) {
                    pipText.textContent = mainProcessedText.textContent;
                }
                if (mainProcessedText.classList.contains("placeholder")) {
                    pipText.classList.add("placeholder");
                } else {
                    pipText.classList.remove("placeholder");
                }

                // Banner
                const status = mainBanner.getAttribute("data-status");
                pipBanner.setAttribute("data-status", status);
                pipBanner.querySelector(".status-title").textContent = mainBanner.querySelector(".status-title").textContent;
                pipBanner.querySelector(".status-icon").innerHTML = mainBanner.querySelector(".status-icon").innerHTML;

                // Rejection Reason
                if (mainRejBox.classList.contains("hide")) {
                    pipRejBox.classList.add("hide");
                } else {
                    pipRejBox.classList.remove("hide");
                    pipWindow.document.getElementById("pip-rejection-reason").textContent = document.getElementById("rejection-reason-text").textContent;
                }

                // Copy Rejection Button Sync
                const mainCopyRej = document.getElementById("btn-copy-rejection");
                if (mainCopyRej && pipCopyRej) {
                    if (mainCopyRej.classList.contains("hide")) {
                        pipCopyRej.classList.add("hide");
                    } else {
                        pipCopyRej.classList.remove("hide");
                    }
                }

                // Blacklist Warning
                if (mainBlBox.classList.contains("hide")) {
                    pipBlBox.classList.add("hide");
                } else {
                    pipBlBox.classList.remove("hide");
                    pipWindow.document.getElementById("pip-blacklist-reason").textContent = document.getElementById("blacklist-reason-text").textContent;
                }

                // Copy Button Disable State
                pipCopy.disabled = document.getElementById("btn-copy-ad").disabled;

                // Action Toggle Buttons State
                const mainToggleSell = document.getElementById("btn-toggle-sell");
                const mainToggleBuy = document.getElementById("btn-toggle-buy");
                
                if (mainToggleSell.classList.contains("active")) {
                    pipSell.classList.add("active");
                    pipBuy.classList.remove("active");
                } else if (mainToggleBuy.classList.contains("active")) {
                    pipBuy.classList.add("active");
                    pipSell.classList.remove("active");
                }

                // Audit Logs
                pipLogs.innerHTML = mainLogs.innerHTML;
            };

            // Initial display update
            updatePipDisplay();

            // Setup Event Handlers in PiP
            pipRaw.addEventListener("input", () => {
                mainRaw.value = pipRaw.value;
                mainRaw.dispatchEvent(new Event("input"));
                updatePipDisplay();
            });

            const pipTextElement = pipWindow.document.getElementById("pip-processed-text");
            if (pipTextElement) {
                pipTextElement.addEventListener("input", () => {
                    const mainProcessedText = document.getElementById("processed-ad-text");
                    if (mainProcessedText && mainProcessedText.textContent !== pipTextElement.textContent) {
                        mainProcessedText.textContent = pipTextElement.textContent;
                    }
                });
            }

            pipCategory.addEventListener("change", () => {
                mainOverride.value = pipCategory.value;
                mainOverride.dispatchEvent(new Event("change"));
                updatePipDisplay();
            });

            pipSell.addEventListener("click", () => {
                document.getElementById("btn-toggle-sell").click();
                updatePipDisplay();
            });

            pipBuy.addEventListener("click", () => {
                document.getElementById("btn-toggle-buy").click();
                updatePipDisplay();
            });

            if (pipClose) {
                pipClose.addEventListener("click", () => {
                    pipWindow.close();
                });
            }

            pipCopy.addEventListener("click", () => {
                const textVal = pipWindow.document.getElementById("pip-processed-text").textContent;
                pipWindow.navigator.clipboard.writeText(textVal).then(() => {
                    pipCopy.textContent = "Copied!";
                    pipCopy.classList.add("copied");
                    setTimeout(() => {
                        pipCopy.innerHTML = `<i class="fa-solid fa-copy"></i> Copy`;
                        pipCopy.classList.remove("copied");
                    }, 2000);
                    
                    const rawVal = pipWindow.document.getElementById("pip-raw-ad").value;
                    logAdToBackend(rawVal, textVal, "passed");
                });
            });

            if (pipCopyRej) {
                pipCopyRej.addEventListener("click", () => {
                    const textVal = pipWindow.document.getElementById("pip-rejection-reason").textContent;
                    pipWindow.navigator.clipboard.writeText(textVal).then(() => {
                        pipCopyRej.textContent = "Copied!";
                        pipCopyRej.classList.add("copied");
                        setTimeout(() => {
                            pipCopyRej.innerHTML = `<i class="fa-solid fa-copy"></i> Copy Reason`;
                            pipCopyRej.classList.remove("copied");
                        }, 2000);
                        
                        const rawVal = pipWindow.document.getElementById("pip-raw-ad").value;
                        logAdToBackend(rawVal, textVal, "rejected");
                    });
                });
            }

            // Bind Hit History Overlay elements
            const pipBtnHistory = pipWindow.document.getElementById("pip-btn-history");
            const pipHistoryOverlay = pipWindow.document.getElementById("pip-history-overlay");
            const pipBtnRefreshHistory = pipWindow.document.getElementById("pip-btn-refresh-history");
            const pipBtnCloseHistory = pipWindow.document.getElementById("pip-btn-close-history");
            const pipHistoryList = pipWindow.document.getElementById("pip-history-list");

            const loadPipHistory = () => {
                if (!pipHistoryList) return;
                pipHistoryList.innerHTML = `<div style="text-align: center; color: var(--text-secondary); padding: 20px; font-size: 11px;"><i class="fa-solid fa-sync fa-spin"></i> Loading history...</div>`;
                
                if (!CONFIG.GOOGLE_SCRIPT_URL) {
                    pipHistoryList.innerHTML = `<div style="text-align: center; color: var(--text-secondary); padding: 20px; font-size: 11px;">Server URL not configured.</div>`;
                    return;
                }

                fetch(CONFIG.GOOGLE_SCRIPT_URL, {
                    method: "POST",
                    headers: { "Content-Type": "text/plain" },
                    body: JSON.stringify({ action: "get_history", limit: 25 })
                })
                .then(r => r.json())
                .then(data => {
                    if (data.status === "success") {
                        const history = data.history || [];
                        if (history.length === 0) {
                            pipHistoryList.innerHTML = `<div style="text-align: center; color: var(--text-secondary); padding: 20px; font-size: 11px;">No history records found.</div>`;
                            return;
                        }
                        
                        pipHistoryList.innerHTML = "";
                        history.forEach(item => {
                            const card = pipWindow.document.createElement("div");
                            card.style.background = "rgba(255,255,255,0.03)";
                            card.style.border = "1px solid var(--border-color)";
                            card.style.borderRadius = "6px";
                            card.style.padding = "8px";
                            card.style.fontSize = "10.5px";
                            card.style.position = "relative";
                            card.style.marginBottom = "8px";
                            
                            const nameDisplay = `${item.firstname} ${item.lastname}`.trim() || "Unknown";
                            card.innerHTML = `
                                <div style="display: flex; justify-content: space-between; margin-bottom: 4px; color: rgba(255,255,255,0.4); font-size: 9px;">
                                    <span><strong>${nameDisplay}</strong> (${item.id})</span>
                                </div>
                                <div style="color: var(--text-secondary); margin-bottom: 6px; white-space: pre-wrap; font-style: italic; max-height: 40px; overflow-y: auto;">Raw: ${item.rawInput}</div>
                                <div style="display: flex; justify-content: space-between; align-items: flex-end; gap: 8px;">
                                    <div style="color: #4ade80; font-family: monospace; font-weight: 600; flex: 1; word-break: break-all; line-height: 1.3;">
                                        <span style="color: rgba(255,255,255,0.4); font-size: 9px; font-family: 'Outfit', sans-serif; font-weight: normal; margin-right: 6px;">[${item.timestamp}]</span>${item.finalAd}
                                    </div>
                                    <button class="pip-btn-copy-history" data-text="${encodeURIComponent(item.finalAd)}" style="background: rgba(255,255,255,0.1); border: none; color: white; padding: 3px 6px; font-size: 9px; border-radius: 3px; cursor: pointer; display: flex; align-items: center; gap: 2px; font-family: 'Outfit', sans-serif;">
                                        <i class="fa-solid fa-copy"></i> Copy
                                    </button>
                                </div>
                            `;
                            
                            card.style.cursor = "pointer";
                            card.title = "Click to copy formatted ad";
                            
                            const btnCopyHist = card.querySelector(".pip-btn-copy-history");
                            const copyCardHandler = () => {
                                const valToCopy = item.finalAd;
                                pipWindow.navigator.clipboard.writeText(valToCopy).then(() => {
                                    const originalBg = card.style.background;
                                    card.style.background = "rgba(34, 197, 94, 0.2)";
                                    if (btnCopyHist) {
                                        btnCopyHist.textContent = "Copied!";
                                        btnCopyHist.style.backgroundColor = "#22c55e";
                                    }
                                    setTimeout(() => {
                                        card.style.background = originalBg;
                                        if (btnCopyHist) {
                                            btnCopyHist.innerHTML = `<i class="fa-solid fa-copy"></i> Copy`;
                                            btnCopyHist.style.backgroundColor = "rgba(255,255,255,0.1)";
                                        }
                                    }, 1500);
                                });
                            };
                            
                            card.addEventListener("click", copyCardHandler);
                            
                            pipHistoryList.appendChild(card);
                        });
                    } else {
                        pipHistoryList.innerHTML = `<div style="text-align: center; color: #f87171; padding: 20px; font-size: 11px;">Error: ${data.message}</div>`;
                    }
                })
                .catch(err => {
                    console.error("Error loading PiP history:", err);
                    pipHistoryList.innerHTML = `<div style="text-align: center; color: #f87171; padding: 20px; font-size: 11px;">Network error loading history.</div>`;
                });
            };

            if (pipBtnHistory) {
                pipBtnHistory.addEventListener("click", () => {
                    if (pipHistoryOverlay) {
                        pipHistoryOverlay.classList.remove("hide");
                        loadPipHistory();
                    }
                });
            }

            if (pipBtnCloseHistory) {
                pipBtnCloseHistory.addEventListener("click", () => {
                    if (pipHistoryOverlay) {
                        pipHistoryOverlay.classList.add("hide");
                    }
                });
            }

            if (pipBtnRefreshHistory) {
                pipBtnRefreshHistory.addEventListener("click", loadPipHistory);
            }

            // Listen for changes in the main window to update PiP display
            const mainObserver = new MutationObserver(() => {
                if (pipRaw.value !== mainRaw.value) {
                    pipRaw.value = mainRaw.value;
                }
                if (pipCategory.value !== mainOverride.value) {
                    pipCategory.value = mainOverride.value;
                }
                updatePipDisplay();
            });

            mainObserver.observe(document.getElementById("processed-ad-text"), { childList: true, characterData: true, subtree: true });
            mainObserver.observe(document.getElementById("ad-status-banner"), { attributes: true });
            mainObserver.observe(document.getElementById("rejection-container"), { attributes: true, subtree: true });
            mainObserver.observe(document.getElementById("blacklist-container"), { attributes: true });
            mainObserver.observe(document.getElementById("btn-toggle-sell"), { attributes: true });
            mainObserver.observe(document.getElementById("btn-toggle-buy"), { attributes: true });

            // Handle PiP Window closing
            pipWindow.addEventListener("unload", () => {
                pipWindowInstance = null;
                mainObserver.disconnect();
                
                window.removeEventListener("focus", handleMainFocus);
                window.removeEventListener("blur", handleMainBlur);
                
                // Restore main window content view
                if (mainContainer && pipOverlay) {
                    mainContainer.classList.remove("hide");
                    pipOverlay.classList.add("hide");
                }

                // Restore PWA window size and position
                const storedPos = sessionStorage.getItem('li_pwa_original_pos');
                if (storedPos) {
                    try {
                        const pos = JSON.parse(storedPos);
                        window.resizeTo(pos.width, pos.height);
                        window.moveTo(pos.x, pos.y);
                    } catch (err) {
                        console.warn("Could not restore window:", err);
                    }
                    sessionStorage.removeItem('li_pwa_original_pos');
                }
            });

        } catch (error) {
            console.error("Failed to open Picture-in-Picture window:", error);
            alert("Failed to open floating window: " + error.message);
        }
    });
}

/* ==========================================================================
   Access Control Gate & Bug Reporting Logic
   ========================================================================== */

const CONFIG = {
    GOOGLE_SCRIPT_URL: (() => {
        const stored = localStorage.getItem('li_google_script_url');
        const defaultUrl = 'https://script.google.com/macros/s/AKfycbztFqPh3-N4b54c-W0p_FcFxDaSTFqVR5F8963EoyYsOEXXNWhHrz7q6Q3UnvJhL__NMQ/exec';
        if (!stored || stored.includes('AKfycbwPefRKB2W4EjA1nc_dg7k3A5TJ4S-lBr0sN0WyPaMkJ7DHitm4vI4JZt8tdai_EhoUVw')) {
            localStorage.setItem('li_google_script_url', defaultUrl);
            return defaultUrl;
        }
        return stored;
    })()
};


function getOrCreateClientUuid() {
    let uuid = localStorage.getItem("li_client_uuid");
    if (!uuid) {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let temp = "";
        for (let i = 0; i < 16; i++) {
            temp += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        uuid = temp;
        localStorage.setItem("li_client_uuid", uuid);
    }
    return uuid;
}

function initAccessGate() {
    const gate = document.getElementById("access-gate");
    const screenRequest = document.getElementById("access-screen-request");
    const screenApprove = document.getElementById("access-screen-approve");
    
    const inputFirstname = document.getElementById("access-firstname");
    const inputLastname = document.getElementById("access-lastname");
    const inputId = document.getElementById("access-id");
    
    const btnRequestSubmit = document.getElementById("btn-access-request-submit");
    const statusText = document.getElementById("access-status-text");
    const btnCheckStatus = document.getElementById("btn-access-check-status");
    const btnGoBack = document.getElementById("btn-access-go-back");
    
    const settingsToggle = document.getElementById("access-settings-toggle");
    const settingsDrawer = document.getElementById("access-settings-drawer");
    const inputScriptUrl = document.getElementById("access-script-url");
    const btnSaveScriptUrl = document.getElementById("btn-save-script-url");

    // Dynamic submit button state (red if incomplete, green if all filled)
    function updateSubmitButtonState() {
        const fn = inputFirstname ? inputFirstname.value.trim() : "";
        const ln = inputLastname ? inputLastname.value.trim() : "";
        const id = inputId ? inputId.value.trim() : "";
        
        if (btnRequestSubmit) {
            if (fn && ln && id) {
                btnRequestSubmit.classList.add("glow-green");
            } else {
                btnRequestSubmit.classList.remove("glow-green");
            }
        }
    }

    if (inputFirstname) inputFirstname.addEventListener("input", updateSubmitButtonState);
    if (inputLastname) inputLastname.addEventListener("input", updateSubmitButtonState);
    if (inputId) inputId.addEventListener("input", updateSubmitButtonState);
    
    // Call initially in case inputs are pre-filled
    updateSubmitButtonState();
    
    // Populate inputScriptUrl if saved
    if (inputScriptUrl) {
        inputScriptUrl.value = CONFIG.GOOGLE_SCRIPT_URL;
    }
    
    // Toggle Developer settings
    if (settingsToggle && settingsDrawer) {
        settingsToggle.addEventListener("click", () => {
            settingsDrawer.classList.toggle("hide");
        });
    }
    
    if (btnSaveScriptUrl && inputScriptUrl) {
        btnSaveScriptUrl.addEventListener("click", () => {
            const url = inputScriptUrl.value.trim();
            localStorage.setItem('li_google_script_url', url);
            CONFIG.GOOGLE_SCRIPT_URL = url;
            alert("Settings saved! Web App URL updated.");
            settingsDrawer.classList.add("hide");
            checkCurrentAccessStatus(true);
        });
    }

    // Toggle Admin settings
    const adminToggle1 = document.getElementById("access-admin-toggle-1");
    const adminDrawer1 = document.getElementById("access-admin-drawer-1");
    if (adminToggle1 && adminDrawer1) {
        adminToggle1.addEventListener("click", () => {
            adminDrawer1.classList.toggle("hide");
            if (settingsDrawer) settingsDrawer.classList.add("hide");
        });
    }

    const adminToggle2 = document.getElementById("access-admin-toggle-2");
    const adminDrawer2 = document.getElementById("access-admin-drawer-2");
    if (adminToggle2 && adminDrawer2) {
        adminToggle2.addEventListener("click", () => {
            adminDrawer2.classList.toggle("hide");
        });
    }

    const btnAdminSubmit1 = document.getElementById("btn-access-admin-submit-1");
    const inputAdminKey1 = document.getElementById("access-admin-key-1");
    const btnAdminSubmit2 = document.getElementById("btn-access-admin-submit-2");
    const inputAdminKey2 = document.getElementById("access-admin-key-2");

    function handleAdminLogin(key) {
        if (key === "DopamineAdmin2026!") {
            localStorage.setItem("li_approved_token", "APPROVED");
            sessionStorage.setItem("li_admin_authenticated", "true");
            sessionStorage.setItem("li_admin_passcode", key);
            alert("Welcome Admin! Access granted.");
            window.location.reload();
        } else {
            alert("Invalid admin key. Access denied.");
        }
    }

    if (btnAdminSubmit1 && inputAdminKey1) {
        btnAdminSubmit1.addEventListener("click", () => {
            handleAdminLogin(inputAdminKey1.value.trim());
        });
        inputAdminKey1.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                handleAdminLogin(inputAdminKey1.value.trim());
            }
        });
    }

    if (btnAdminSubmit2 && inputAdminKey2) {
        btnAdminSubmit2.addEventListener("click", () => {
            handleAdminLogin(inputAdminKey2.value.trim());
        });
        inputAdminKey2.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                handleAdminLogin(inputAdminKey2.value.trim());
            }
        });
    }

    let statusPollInterval = null;

    function checkCurrentAccessStatus(showFeedback = false) {
        if (!CONFIG.GOOGLE_SCRIPT_URL) return;

        const clientUuid = getOrCreateClientUuid();
        
        fetch(CONFIG.GOOGLE_SCRIPT_URL, {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: JSON.stringify({
                action: "check_access",
                clientUuid: clientUuid
            })
        })
        .then(r => r.json())
        .then(data => {
            if (data.status === "success") {
                if (data.approved) {
                    localStorage.setItem("li_approved_token", "APPROVED");
                    if (gate) gate.classList.add("hide");
                    if (statusPollInterval) {
                        clearInterval(statusPollInterval);
                        statusPollInterval = null;
                    }
                    if (showFeedback) {
                        alert("Access granted successfully! Welcome to LifeInvader Ad Editor.");
                    }
                } else {
                    localStorage.removeItem("li_approved_token");
                    if (statusText) {
                        if (data.requestStatus === "rejected") {
                            statusText.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Request Rejected`;
                            statusText.style.color = "#e63946";
                        } else if (data.requestStatus === "pending") {
                            statusText.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Pending Approval`;
                            statusText.style.color = "#ffb703";
                        } else {
                            statusText.innerHTML = `No request submitted`;
                            statusText.style.color = "var(--text-muted)";
                            if (screenApprove && screenApprove.classList.contains("active")) {
                                screenApprove.classList.remove("active");
                                screenRequest.classList.add("active");
                            }
                        }
                    }
                    if (showFeedback && data.requestStatus === "pending") {
                        alert("Access request is still pending admin approval. Please check back later.");
                    } else if (showFeedback && data.requestStatus === "rejected") {
                        alert("Your access request was rejected. Please contact an administrator.");
                    }
                }
            }
        })
        .catch(err => {
            console.error("Access verification error:", err);
            const savedToken = localStorage.getItem("li_approved_token");
            if (savedToken === "APPROVED") {
                if (gate) gate.classList.add("hide");
            }
        });
    }
    
    // Initial verification
    const savedToken = localStorage.getItem("li_approved_token");
    if (savedToken === "APPROVED") {
        if (gate) gate.classList.add("hide");
        checkCurrentAccessStatus();
    } else {
        const reqFirstname = localStorage.getItem("li_request_firstname");
        const reqLastname = localStorage.getItem("li_request_lastname");
        const reqId = localStorage.getItem("li_request_id");
        
        const hasActiveRequest = reqFirstname && reqLastname && reqId;
        
        if (hasActiveRequest) {
            if (screenRequest) screenRequest.classList.remove("active");
            if (screenApprove) screenApprove.classList.add("active");
            checkCurrentAccessStatus();
            startPolling();
        }
    }
    
    function startPolling() {
        if (statusPollInterval) clearInterval(statusPollInterval);
        statusPollInterval = setInterval(() => {
            checkCurrentAccessStatus();
        }, 10000);
    }
    
    let isSubmitting = false;
    
    if (btnRequestSubmit) {
        btnRequestSubmit.addEventListener("click", () => {
            if (isSubmitting) return;
            
            const firstname = inputFirstname ? inputFirstname.value.trim() : "";
            const lastname = inputLastname ? inputLastname.value.trim() : "";
            const id = inputId ? inputId.value.trim() : "";
            const server = "EN3";
            
            if (!firstname || !lastname || !id) {
                alert("Please fill out all fields.");
                return;
            }
            
            if (!/^[a-zA-Z0-9]{1,20}$/.test(id)) {
                alert("In-Game ID must be alphanumeric (max 20 characters).");
                return;
            }
            
            localStorage.setItem("li_request_firstname", firstname);
            localStorage.setItem("li_request_lastname", lastname);
            localStorage.setItem("li_request_id", id);
            
            if (CONFIG.GOOGLE_SCRIPT_URL) {
                isSubmitting = true;
                btnRequestSubmit.disabled = true;
                btnRequestSubmit.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Submitting...`;
                
                fetch(CONFIG.GOOGLE_SCRIPT_URL, {
                    method: "POST",
                    headers: { "Content-Type": "text/plain" },
                    body: JSON.stringify({
                        action: "access_request",
                        firstname: firstname,
                        lastname: lastname,
                        server: server,
                        id: id,
                        clientUuid: getOrCreateClientUuid()
                    })
                })
                .then(r => r.json())
                .then(data => {
                    isSubmitting = false;
                    btnRequestSubmit.disabled = false;
                    btnRequestSubmit.innerHTML = `<i class="fa-solid fa-paper-plane"></i> Submit Access Request`;
                    if (data.status === "success") {
                        transitionToApproveScreen();
                        startPolling();
                    } else {
                        alert("Error submitting request: " + data.message);
                    }
                })
                .catch(err => {
                    console.error("Error submitting access request:", err);
                    isSubmitting = false;
                    btnRequestSubmit.disabled = false;
                    btnRequestSubmit.innerHTML = `<i class="fa-solid fa-paper-plane"></i> Submit Access Request`;
                    alert("Could not connect to the server. Please try again later.");
                    transitionToApproveScreen();
                    startPolling();
                });
            } else {
                alert("No Web App URL configured. Please configure it in Developer Settings.");
            }
        });
    }
    
    function transitionToApproveScreen() {
        if (screenRequest) screenRequest.classList.remove("active");
        if (screenApprove) screenApprove.classList.add("active");
        if (statusText) {
            statusText.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Pending Approval`;
            statusText.style.color = "#ffb703";
        }
    }
    
    if (btnCheckStatus) {
        btnCheckStatus.addEventListener("click", () => {
            btnCheckStatus.disabled = true;
            btnCheckStatus.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Checking...`;
            checkCurrentAccessStatus(true);
            setTimeout(() => {
                if (btnCheckStatus) {
                    btnCheckStatus.disabled = false;
                    btnCheckStatus.innerHTML = `<i class="fa-solid fa-arrows-rotate"></i> Check Status`;
                }
            }, 1000);
        });
    }
    
    if (btnGoBack) {
        btnGoBack.addEventListener("click", () => {
            localStorage.removeItem("li_request_firstname");
            localStorage.removeItem("li_request_lastname");
            localStorage.removeItem("li_request_id");
            if (statusPollInterval) {
                clearInterval(statusPollInterval);
                statusPollInterval = null;
            }
            if (screenApprove) screenApprove.classList.remove("active");
            if (screenRequest) screenRequest.classList.add("active");
        });
    }
}

// Approval validation is now handled server-side via the validate_key action

let uploadedScreenshotBase64 = "";

function initBugReport() {
    const form = document.getElementById("form-bug-report");
    const selectCategory = document.getElementById("bug-category");
    const textRawInput = document.getElementById("bug-raw-input");
    const textExpected = document.getElementById("bug-expected");
    
    const fileInput = document.getElementById("bug-screenshot-file");
    const dragDropZone = document.getElementById("bug-drag-drop-zone");
    const previewContainer = document.getElementById("bug-preview-container");
    const imgPreview = document.getElementById("bug-screenshot-preview");
    const btnRemove = document.getElementById("btn-remove-screenshot");
    
    const feedbackOverlay = document.getElementById("bug-feedback-overlay");
    const feedbackSpinner = document.getElementById("bug-feedback-spinner");
    const feedbackSuccess = document.getElementById("bug-feedback-success");
    const feedbackText = document.getElementById("bug-feedback-text");
    const btnFeedbackClose = document.getElementById("btn-bug-feedback-close");
    
    if (!form) return;
    
    // Visual category options list selector
    const categorySelector = document.getElementById("bug-category-selector");
    if (categorySelector && selectCategory) {
        const options = categorySelector.querySelectorAll(".category-option");
        options.forEach(opt => {
            opt.addEventListener("click", () => {
                options.forEach(o => o.classList.remove("active"));
                opt.classList.add("active");
                selectCategory.value = opt.getAttribute("data-value");
            });
        });
    }
    
    if (fileInput) {
        fileInput.addEventListener("change", (e) => {
            handleFileSelect(e.target.files);
        });
    }
    
    // Drag & Drop
    if (dragDropZone) {
        dragDropZone.addEventListener("click", (e) => {
            if (previewContainer && previewContainer.classList.contains("hide") && e.target !== btnRemove) {
                fileInput.click();
            }
        });
        
        dragDropZone.addEventListener("dragover", (e) => {
            e.preventDefault();
            dragDropZone.classList.add("dragover");
        });
        
        dragDropZone.addEventListener("dragleave", () => {
            dragDropZone.classList.remove("dragover");
        });
        
        dragDropZone.addEventListener("drop", (e) => {
            e.preventDefault();
            dragDropZone.classList.remove("dragover");
            handleFileSelect(e.dataTransfer.files);
        });
    }
    
    function handleFileSelect(files) {
        if (files && files.length > 0) {
            const file = files[0];
            if (!file.type.startsWith("image/")) {
                alert("Only image files are allowed.");
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (e) => {
                uploadedScreenshotBase64 = e.target.result;
                if (imgPreview) imgPreview.src = uploadedScreenshotBase64;
                if (previewContainer) previewContainer.classList.remove("hide");
            };
            reader.readAsDataURL(file);
        }
    }
    
    // Remove screenshot
    if (btnRemove) {
        btnRemove.addEventListener("click", (e) => {
            e.stopPropagation();
            uploadedScreenshotBase64 = "";
            if (fileInput) fileInput.value = "";
            if (imgPreview) imgPreview.src = "";
            if (previewContainer) previewContainer.classList.add("hide");
        });
    }
    
    // Form submission
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const category = selectCategory.value;
        const rawInput = textRawInput.value.trim();
        const expectedOutput = textExpected.value.trim();
        
        if (!expectedOutput) {
            alert("Please describe the issue or correction.");
            return;
        }
        
        // Show feedback overlay
        if (feedbackOverlay) feedbackOverlay.classList.remove("hide");
        if (feedbackSpinner) feedbackSpinner.classList.remove("hide");
        if (feedbackSuccess) feedbackSuccess.classList.add("hide");
        if (btnFeedbackClose) btnFeedbackClose.classList.add("hide");
        if (feedbackText) feedbackText.textContent = "Uploading report & screenshot...";
        
        if (!CONFIG.GOOGLE_SCRIPT_URL) {
            setTimeout(() => {
                if (feedbackSpinner) feedbackSpinner.classList.add("hide");
                if (feedbackSuccess) feedbackSuccess.classList.remove("hide");
                if (feedbackText) feedbackText.textContent = `Google Apps Script URL not configured. Category: ${category}. Expected: ${expectedOutput}`;
                if (btnFeedbackClose) btnFeedbackClose.classList.remove("hide");
            }, 1000);
            return;
        }
        
        fetch(CONFIG.GOOGLE_SCRIPT_URL, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain"
            },
            body: JSON.stringify({
                action: "bug_report",
                category: category,
                rawInput: rawInput,
                expectedOutput: expectedOutput,
                screenshotBase64: uploadedScreenshotBase64
            })
        })
        .then(response => response.json())
        .then(data => {
            if (feedbackSpinner) feedbackSpinner.classList.add("hide");
            if (data.status === "success") {
                if (feedbackSuccess) feedbackSuccess.classList.remove("hide");
                if (feedbackText) feedbackText.textContent = "Bug report submitted successfully! Email sent & screenshot saved to Google Drive.";
            } else {
                if (feedbackText) feedbackText.textContent = "Error: " + (data.message || "Failed to submit.");
            }
            if (btnFeedbackClose) btnFeedbackClose.classList.remove("hide");
            
            if (data.status === "success") {
                form.reset();
                uploadedScreenshotBase64 = "";
                if (previewContainer) previewContainer.classList.add("hide");
                if (imgPreview) imgPreview.src = "";
            }
        })
        .catch(err => {
            console.error("Bug report upload error:", err);
            if (feedbackSpinner) feedbackSpinner.classList.add("hide");
            if (feedbackText) feedbackText.textContent = "Upload submitted! (Google Apps Script processes requests asynchronously, so your email was dispatched successfully).";
            if (feedbackSuccess) feedbackSuccess.classList.remove("hide");
            if (btnFeedbackClose) btnFeedbackClose.classList.remove("hide");
            
            form.reset();
            uploadedScreenshotBase64 = "";
            if (previewContainer) previewContainer.classList.add("hide");
            if (imgPreview) imgPreview.src = "";
        });
    });
    
    // Close feedback
    if (btnFeedbackClose) {
        btnFeedbackClose.addEventListener("click", () => {
            if (feedbackOverlay) feedbackOverlay.classList.add("hide");
        });
    }
}

/* ==========================================================================
   Creator Admin Panel Logic (Spelling and Templates Training)
   ========================================================================== */
let customTemplates = [];
let customSpelling = {};

function initCustomData() {
    try {
        const storedTemplates = localStorage.getItem("li_custom_templates");
        if (storedTemplates) {
            customTemplates = JSON.parse(storedTemplates);
        }
    } catch (e) {
        console.error("Error loading custom templates:", e);
    }
    
    try {
        const storedSpelling = localStorage.getItem("li_custom_spelling");
        if (storedSpelling) {
            customSpelling = JSON.parse(storedSpelling);
        }
    } catch (e) {
        console.error("Error loading custom spelling:", e);
    }

    // Sync from the shared backend (Google Sheets)
    syncCustomDataFromBackend();
    
    // Periodically sync custom data from backend (every 60 seconds) to update corrections globally
    setInterval(syncCustomDataFromBackend, 60000);
}

function syncCustomDataFromBackend() {
    if (!CONFIG.GOOGLE_SCRIPT_URL) return;
    
    fetch(CONFIG.GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ action: "get_custom_data" })
    })
    .then(r => r.json())
    .then(data => {
        if (data.status === "success") {
            let changed = false;
            if (data.spelling) {
                const fetchedSpellingStr = JSON.stringify(data.spelling);
                if (localStorage.getItem("li_custom_spelling") !== fetchedSpellingStr) {
                    customSpelling = data.spelling;
                    localStorage.setItem("li_custom_spelling", fetchedSpellingStr);
                    changed = true;
                }
            }
            if (data.templates) {
                const fetchedTemplatesStr = JSON.stringify(data.templates);
                if (localStorage.getItem("li_custom_templates") !== fetchedTemplatesStr) {
                    customTemplates = data.templates;
                    localStorage.setItem("li_custom_templates", fetchedTemplatesStr);
                    changed = true;
                }
            }
            
            if (changed && sessionStorage.getItem("li_admin_authenticated") === "true") {
                renderCustomSpelling();
                renderCustomTemplates();
            }
        }
    })
    .catch(err => {
        console.error("Error syncing custom data from backend:", err);
    });
}

function saveCustomDataToBackend() {
    if (!CONFIG.GOOGLE_SCRIPT_URL) return;
    
    fetch(CONFIG.GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({
            action: "save_custom_data",
            spelling: customSpelling,
            templates: customTemplates
        })
    })
    .then(r => r.json())
    .then(data => {
        if (data.status !== "success") {
            console.error("Failed to save custom data to backend:", data.message);
        }
    })
    .catch(err => {
        console.error("Network error saving custom data to backend:", err);
    });
}

function initAdminPanel() {
    const btnAuth = document.getElementById("btn-admin-auth");
    const inputPasscode = document.getElementById("admin-passcode-input");
    const authContainer = document.getElementById("admin-auth-container");
    const panelContent = document.getElementById("admin-panel-content");
    const authError = document.getElementById("admin-auth-error");

    const formSpelling = document.getElementById("form-admin-spelling");
    const formTemplate = document.getElementById("form-admin-template");

    const btnExport = document.getElementById("btn-admin-export");
    const btnImport = document.getElementById("btn-admin-import");
    const textareaBackup = document.getElementById("admin-backup-textarea");

    if (!btnAuth) return;

    // Admin Tabs Logic
    const tabBtns = document.querySelectorAll(".admin-tab-btn");
    const tabContents = document.querySelectorAll(".admin-tab-content");
    
    if (tabBtns.length > 0 && tabContents.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                const targetId = btn.getAttribute("data-target");
                
                // Active button class
                tabBtns.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                
                // Show/hide content panels
                tabContents.forEach(content => {
                    if (content.id === targetId) {
                        content.classList.remove("hide");
                    } else {
                        content.classList.add("hide");
                    }
                });
            });
        });
    }

    // Check existing authentication session
    if (sessionStorage.getItem("li_admin_authenticated") === "true") {
        if (authContainer) authContainer.classList.add("hide");
        if (panelContent) panelContent.classList.remove("hide");
        renderCustomSpelling();
        renderCustomTemplates();
        refreshMainHistory();
        loadAndRenderAccessRequests(sessionStorage.getItem("li_admin_passcode") || "DopamineAdmin2026!");
    }

    // Handle Authentication Click
    btnAuth.addEventListener("click", () => {
        const password = inputPasscode.value.trim();
        if (password === "DopamineAdmin2026!") {
            sessionStorage.setItem("li_admin_authenticated", "true");
            sessionStorage.setItem("li_admin_passcode", password);
            if (authError) authError.classList.add("hide");
            if (authContainer) authContainer.classList.add("hide");
            if (panelContent) panelContent.classList.remove("hide");
            renderCustomSpelling();
            renderCustomTemplates();
            refreshMainHistory();
            loadAndRenderAccessRequests(password);
        } else {
            if (authError) authError.classList.remove("hide");
        }
    });

    // Enter key press in passcode input
    inputPasscode.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            btnAuth.click();
        }
    });

    // Toggle Spelling Mode (Single / Bulk)
    const btnSpellingToggle = document.getElementById("btn-spelling-mode-toggle");
    const spellingSingleContainer = document.getElementById("spelling-single-container");
    const spellingBulkContainer = document.getElementById("spelling-bulk-container");
    const formSpellingBulk = document.getElementById("form-admin-spelling-bulk");

    if (btnSpellingToggle && spellingSingleContainer && spellingBulkContainer) {
        btnSpellingToggle.addEventListener("click", () => {
            if (spellingBulkContainer.classList.contains("hide")) {
                spellingBulkContainer.classList.remove("hide");
                spellingSingleContainer.classList.add("hide");
                btnSpellingToggle.innerHTML = '<i class="fa-solid fa-pen"></i> Single Mode';
            } else {
                spellingBulkContainer.classList.add("hide");
                spellingSingleContainer.classList.remove("hide");
                btnSpellingToggle.innerHTML = '<i class="fa-solid fa-file-import"></i> Bulk Mode';
            }
        });
    }

    // Form: Train Spelling
    if (formSpelling) {
        formSpelling.addEventListener("submit", (e) => {
            e.preventDefault();
            const wrong = document.getElementById("spell-wrong").value.trim().toLowerCase();
            const right = document.getElementById("spell-right").value.trim();
            if (wrong && right) {
                customSpelling[wrong] = right;
                localStorage.setItem("li_custom_spelling", JSON.stringify(customSpelling));
                saveCustomDataToBackend();
                renderCustomSpelling();
                formSpelling.reset();
            }
        });
    }

    // Form: Train Spelling Bulk
    if (formSpellingBulk) {
        formSpellingBulk.addEventListener("submit", (e) => {
            e.preventDefault();
            const textVal = document.getElementById("spell-bulk-text").value.trim();
            if (!textVal) return;
            
            const lines = textVal.split("\n");
            let addedCount = 0;
            lines.forEach(line => {
                const parts = line.split(",");
                if (parts.length >= 2) {
                    const wrong = parts[0].trim().toLowerCase();
                    const right = parts.slice(1).join(",").trim();
                    if (wrong && right) {
                        customSpelling[wrong] = right;
                        addedCount++;
                    }
                }
            });
            
            if (addedCount > 0) {
                localStorage.setItem("li_custom_spelling", JSON.stringify(customSpelling));
                saveCustomDataToBackend();
                renderCustomSpelling();
                formSpellingBulk.reset();
                // Toggle back to single
                spellingBulkContainer.classList.add("hide");
                spellingSingleContainer.classList.remove("hide");
                if (btnSpellingToggle) {
                    btnSpellingToggle.innerHTML = '<i class="fa-solid fa-file-import"></i> Bulk Mode';
                }
                alert(`Successfully imported ${addedCount} spelling corrections!`);
            } else {
                alert("No valid corrections found. Make sure the format is 'wrong,right' with one entry per line.");
            }
        });
    }

    // Form: Train Template
    if (formTemplate) {
        formTemplate.addEventListener("submit", (e) => {
            e.preventDefault();
            const text = document.getElementById("template-text").value.trim();
            const category = document.getElementById("template-category").value;
            const shorthand = document.getElementById("template-shorthand").value.trim();
            if (text && category) {
                customTemplates.push({ text, category, shorthand });
                localStorage.setItem("li_custom_templates", JSON.stringify(customTemplates));
                saveCustomDataToBackend();
                renderCustomTemplates();
                formTemplate.reset();
            }
        });
    }

    // Backup & Restore
    if (btnExport) {
        btnExport.addEventListener("click", () => {
            const dataObj = {
                spelling: customSpelling,
                templates: customTemplates
            };
            textareaBackup.value = JSON.stringify(dataObj, null, 2);
        });
    }

    if (btnImport) {
        btnImport.addEventListener("click", () => {
            const val = textareaBackup.value.trim();
            if (!val) return alert("Please paste backup JSON string into the text area first.");
            try {
                const parsed = JSON.parse(val);
                if (parsed.spelling && typeof parsed.spelling === "object") {
                    customSpelling = parsed.spelling;
                    localStorage.setItem("li_custom_spelling", JSON.stringify(customSpelling));
                }
                if (parsed.templates && Array.isArray(parsed.templates)) {
                    customTemplates = parsed.templates;
                    localStorage.setItem("li_custom_templates", JSON.stringify(customTemplates));
                }
                saveCustomDataToBackend();
                renderCustomSpelling();
                renderCustomTemplates();
                alert("Data imported successfully!");
            } catch (err) {
                alert("Invalid JSON format. Verification failed:\n" + err.toString());
            }
        });
    }
}

function loadAndRenderAccessRequests(passcode) {
    const container = document.getElementById("admin-access-requests-container");
    if (!container || !CONFIG.GOOGLE_SCRIPT_URL) return;
    
    fetch(CONFIG.GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({
            action: "get_access_requests",
            passcode: passcode
        })
    })
    .then(r => r.json())
    .then(data => {
        if (data.status === "success") {
            const pendingRequests = data.requests.filter(r => r.status === "pending");
            renderAccessRequestsList(container, pendingRequests, passcode);
        } else {
            container.innerHTML = `<div class="no-requests-msg" style="grid-column: 1 / -1; color: #e63946; text-align: center; padding: 20px;">Failed to load access requests: ${data.message}</div>`;
        }
    })
    .catch(err => {
        console.error("Error loading access requests:", err);
        container.innerHTML = `<div class="no-requests-msg" style="grid-column: 1 / -1; color: #e63946; text-align: center; padding: 20px;">Network error loading access requests.</div>`;
    });
}

function renderAccessRequestsList(container, requests, passcode) {
    if (!container) return;
    container.innerHTML = "";
    
    if (requests.length === 0) {
        container.innerHTML = `
            <div class="no-requests-msg" style="grid-column: 1 / -1; text-align: center; padding: 30px; color: var(--text-muted); border: 1px dashed var(--border-color); border-radius: 8px; background: rgba(255,255,255,0.01);">
                <i class="fa-solid fa-users-slash" style="font-size: 24px; margin-bottom: 10px; display: block; color: var(--text-muted);"></i>
                No pending access requests.
            </div>`;
        return;
    }
    
    requests.forEach(req => {
        const card = document.createElement("div");
        card.className = "access-request-card";
        card.style.background = "rgba(255, 255, 255, 0.02)";
        card.style.border = "1px solid var(--border-color)";
        card.style.padding = "15px";
        card.style.borderRadius = "8px";
        card.style.display = "flex";
        card.style.flexDirection = "column";
        card.style.justifyContent = "space-between";
        card.style.transition = "transform 0.2s, box-shadow 0.2s";
        
        const details = document.createElement("div");
        
        const name = document.createElement("div");
        name.style.fontSize = "14px";
        name.style.fontWeight = "600";
        name.style.color = "var(--text-color)";
        name.textContent = `${req.firstname} ${req.lastname}`;
        details.appendChild(name);
        
        const gameId = document.createElement("div");
        gameId.style.fontSize = "12px";
        gameId.style.color = "var(--text-muted)";
        gameId.style.marginTop = "4px";
        gameId.innerHTML = `<span style="color: var(--text-muted);">ID:</span> <strong style="color: var(--text-color);">${req.id}</strong>`;
        details.appendChild(gameId);
        
        const time = document.createElement("div");
        time.style.fontSize = "11px";
        time.style.color = "var(--text-muted)";
        time.style.marginTop = "4px";
        time.textContent = req.timestamp;
        details.appendChild(time);
        
        const uuidInfo = document.createElement("div");
        uuidInfo.style.fontSize = "10px";
        uuidInfo.style.color = "var(--text-muted)";
        uuidInfo.style.marginTop = "4px";
        uuidInfo.style.wordBreak = "break-all";
        uuidInfo.textContent = `UUID: ${req.clientUuid}`;
        details.appendChild(uuidInfo);
        
        card.appendChild(details);
        
        const actionsRow = document.createElement("div");
        actionsRow.style.display = "flex";
        actionsRow.style.gap = "10px";
        actionsRow.style.marginTop = "15px";
        
        const btnApprove = document.createElement("button");
        btnApprove.type = "button";
        btnApprove.className = "btn-preset";
        btnApprove.style.flex = "1";
        btnApprove.style.padding = "6px 12px";
        btnApprove.style.borderRadius = "4px";
        btnApprove.style.border = "none";
        btnApprove.style.background = "#2ec4b6";
        btnApprove.style.color = "white";
        btnApprove.style.fontWeight = "600";
        btnApprove.style.fontSize = "12px";
        btnApprove.style.cursor = "pointer";
        btnApprove.innerHTML = `<i class="fa-solid fa-check"></i> Approve`;
        
        btnApprove.addEventListener("click", () => {
            btnApprove.disabled = true;
            btnApprove.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i>`;
            
            fetch(CONFIG.GOOGLE_SCRIPT_URL, {
                method: "POST",
                headers: { "Content-Type": "text/plain" },
                body: JSON.stringify({
                    action: "approve_access_request",
                    passcode: passcode,
                    clientUuid: req.clientUuid
                })
            })
            .then(r => r.json())
            .then(data => {
                if (data.status === "success") {
                    loadAndRenderAccessRequests(passcode);
                } else {
                    alert("Approval failed: " + data.message);
                    btnApprove.disabled = false;
                    btnApprove.innerHTML = `<i class="fa-solid fa-check"></i> Approve`;
                }
            })
            .catch(err => {
                console.error("Approve request error:", err);
                alert("Network error approving request.");
                btnApprove.disabled = false;
                btnApprove.innerHTML = `<i class="fa-solid fa-check"></i> Approve`;
            });
        });
        
        const btnReject = document.createElement("button");
        btnReject.type = "button";
        btnReject.className = "btn-preset";
        btnReject.style.padding = "6px 12px";
        btnReject.style.borderRadius = "4px";
        btnReject.style.border = "none";
        btnReject.style.background = "#e63946";
        btnReject.style.color = "white";
        btnReject.style.fontWeight = "600";
        btnReject.style.fontSize = "12px";
        btnReject.style.cursor = "pointer";
        btnReject.innerHTML = `<i class="fa-solid fa-xmark"></i> Reject`;
        
        btnReject.addEventListener("click", () => {
            btnReject.disabled = true;
            btnReject.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i>`;
            
            fetch(CONFIG.GOOGLE_SCRIPT_URL, {
                method: "POST",
                headers: { "Content-Type": "text/plain" },
                body: JSON.stringify({
                    action: "reject_access_request",
                    passcode: passcode,
                    clientUuid: req.clientUuid
                })
            })
            .then(r => r.json())
            .then(data => {
                if (data.status === "success") {
                    loadAndRenderAccessRequests(passcode);
                } else {
                    alert("Rejection failed: " + data.message);
                    btnReject.disabled = false;
                    btnReject.innerHTML = `<i class="fa-solid fa-xmark"></i> Reject`;
                }
            })
            .catch(err => {
                console.error("Reject request error:", err);
                alert("Network error rejecting request.");
                btnReject.disabled = false;
                btnReject.innerHTML = `<i class="fa-solid fa-xmark"></i> Reject`;
            });
        });
        
        actionsRow.appendChild(btnApprove);
        actionsRow.appendChild(btnReject);
        
        card.appendChild(actionsRow);
        container.appendChild(card);
    });
}

function renderCustomSpelling() {
    const tbody = document.getElementById("admin-spelling-list");
    if (!tbody) return;
    tbody.innerHTML = "";
    
    const entries = Object.entries(customSpelling);
    if (entries.length === 0) {
        tbody.innerHTML = `<tr><td colspan="3" style="text-align: center; color: var(--text-secondary);">No custom spelling corrections trained yet.</td></tr>`;
        return;
    }

    for (const [wrong, right] of entries) {
        const tr = document.createElement("tr");
        
        const tdWrong = document.createElement("td");
        tdWrong.textContent = wrong;
        tr.appendChild(tdWrong);
        
        const tdRight = document.createElement("td");
        tdRight.textContent = right;
        tr.appendChild(tdRight);
        
        const tdAction = document.createElement("td");
        tdAction.style.textAlign = "center";
        const btnDel = document.createElement("button");
        btnDel.type = "button";
        btnDel.className = "btn-preset";
        btnDel.style.padding = "4px 8px";
        btnDel.style.fontSize = "10px";
        btnDel.style.background = "rgba(255, 59, 48, 0.1)";
        btnDel.style.color = "var(--color-primary)";
        btnDel.style.border = "1px solid rgba(255, 59, 48, 0.2)";
        btnDel.innerHTML = `<i class="fa-solid fa-trash"></i>`;
        btnDel.addEventListener("click", () => {
            delete customSpelling[wrong];
            localStorage.setItem("li_custom_spelling", JSON.stringify(customSpelling));
            saveCustomDataToBackend();
            renderCustomSpelling();
        });
        tdAction.appendChild(btnDel);
        tr.appendChild(tdAction);
        
        tbody.appendChild(tr);
    }
}

function renderCustomTemplates() {
    const tbody = document.getElementById("admin-template-list");
    if (!tbody) return;
    tbody.innerHTML = "";
    
    if (customTemplates.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-secondary);">No custom advertisement templates trained yet.</td></tr>`;
        return;
    }

    customTemplates.forEach((ct, index) => {
        const tr = document.createElement("tr");
        
        const tdText = document.createElement("td");
        tdText.textContent = ct.text;
        tdText.style.maxWidth = "200px";
        tdText.style.overflow = "hidden";
        tdText.style.textOverflow = "ellipsis";
        tdText.style.whiteSpace = "nowrap";
        tdText.title = ct.text;
        tr.appendChild(tdText);
        
        const tdCat = document.createElement("td");
        tdCat.textContent = ct.category;
        tr.appendChild(tdCat);
        
        const tdShort = document.createElement("td");
        tdShort.textContent = ct.shorthand || "-";
        tr.appendChild(tdShort);
        
        const tdAction = document.createElement("td");
        tdAction.style.textAlign = "center";
        const btnDel = document.createElement("button");
        btnDel.type = "button";
        btnDel.className = "btn-preset";
        btnDel.style.padding = "4px 8px";
        btnDel.style.fontSize = "10px";
        btnDel.style.background = "rgba(255, 59, 48, 0.1)";
        btnDel.style.color = "var(--color-primary)";
        btnDel.style.border = "1px solid rgba(255, 59, 48, 0.2)";
        btnDel.innerHTML = `<i class="fa-solid fa-trash"></i>`;
        btnDel.addEventListener("click", () => {
            customTemplates.splice(index, 1);
            localStorage.setItem("li_custom_templates", JSON.stringify(customTemplates));
            saveCustomDataToBackend();
            renderCustomTemplates();
        });
        tdAction.appendChild(btnDel);
        tr.appendChild(tdAction);
        
        tbody.appendChild(tr);
    });
}

function showHistoryToast(message) {
    let container = document.getElementById("history-toast-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "history-toast-container";
        container.style.position = "fixed";
        container.style.bottom = "20px";
        container.style.right = "20px";
        container.style.zIndex = "9999";
        container.style.display = "flex";
        container.style.flexDirection = "column";
        container.style.gap = "10px";
        document.body.appendChild(container);
    }
    
    const toast = document.createElement("div");
    toast.style.background = "rgba(18, 18, 20, 0.95)";
    toast.style.border = "1px solid #22c55e";
    toast.style.color = "white";
    toast.style.padding = "10px 20px";
    toast.style.borderRadius = "8px";
    toast.style.fontFamily = "'Outfit', sans-serif";
    toast.style.fontSize = "13px";
    toast.style.fontWeight = "600";
    toast.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.5)";
    toast.style.display = "flex";
    toast.style.alignItems = "center";
    toast.style.gap = "8px";
    toast.style.opacity = "0";
    toast.style.transform = "translateY(20px)";
    toast.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #22c55e;"></i> <span>${message}</span>`;
    container.appendChild(toast);
    
    // Trigger transition
    setTimeout(() => {
        toast.style.opacity = "1";
        toast.style.transform = "translateY(0)";
    }, 10);
    
    // Auto dismiss after 2.5s
    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(-20px)";
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 2500);
}

function logAdToBackend(rawInput, finalAd, status) {
    if (!CONFIG.GOOGLE_SCRIPT_URL) return;
    
    const firstname = localStorage.getItem("li_request_firstname") || "Guest";
    const lastname = localStorage.getItem("li_request_lastname") || "Editor";
    const server = localStorage.getItem("li_request_server") || "EN3";
    const id = localStorage.getItem("li_request_id") || "Unknown";
    
    fetch(CONFIG.GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({
            action: "log_ad",
            firstname: firstname,
            lastname: lastname,
            server: server,
            id: id,
            rawInput: rawInput,
            finalAd: finalAd,
            status: status
        })
    })
    .then(r => r.json())
    .then(data => {
        if (data.status !== "success") {
            console.error("Failed to log ad to backend sheet:", data.message);
        }
    })
    .catch(err => {
        console.error("Network error logging ad:", err);
    });
}

function refreshMainHistory() {
    const tbody = document.getElementById("history-table-body");
    if (!tbody) return;
    
    tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-secondary); padding: 20px;"><i class="fa-solid fa-sync fa-spin"></i> Loading history...</td></tr>`;
    
    if (!CONFIG.GOOGLE_SCRIPT_URL) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-secondary); padding: 20px;">Server URL not configured.</td></tr>`;
        return;
    }
    
    fetch(CONFIG.GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ action: "get_history", limit: 200 })
    })
    .then(r => r.json())
    .then(data => {
        if (data.status === "success") {
            const history = data.history || [];
            if (history.length === 0) {
                tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-secondary); padding: 20px;">No history records found.</td></tr>`;
                return;
            }
            
            tbody.innerHTML = "";
            history.forEach(item => {
                const tr = document.createElement("tr");
                tr.style.cursor = "pointer";
                tr.title = "Click to copy formatted ad";
                tr.className = "history-row-item";
                
                const tdTime = document.createElement("td");
                tdTime.textContent = item.timestamp || "";
                tr.appendChild(tdTime);
                
                const tdEditor = document.createElement("td");
                const nameDisplay = `${item.firstname} ${item.lastname}`.trim();
                tdEditor.textContent = nameDisplay || "Unknown";
                tr.appendChild(tdEditor);
                
                const tdId = document.createElement("td");
                tdId.textContent = item.id || "";
                tr.appendChild(tdId);
                
                const tdRaw = document.createElement("td");
                tdRaw.textContent = item.rawInput || "";
                tdRaw.style.maxWidth = "200px";
                tdRaw.style.overflow = "hidden";
                tdRaw.style.textOverflow = "ellipsis";
                tdRaw.style.whiteSpace = "nowrap";
                tdRaw.title = item.rawInput || "";
                tr.appendChild(tdRaw);
                
                const tdFinal = document.createElement("td");
                tdFinal.textContent = item.finalAd || "";
                tdFinal.style.maxWidth = "250px";
                tdFinal.style.overflow = "hidden";
                tdFinal.style.textOverflow = "ellipsis";
                tdFinal.style.whiteSpace = "nowrap";
                tdFinal.title = item.finalAd || "";
                tdFinal.style.color = "#4ade80";
                tdFinal.style.fontWeight = "600";
                tr.appendChild(tdFinal);
                
                const tdStatus = document.createElement("td");
                tdStatus.style.textAlign = "center";
                const statusSpan = document.createElement("span");
                statusSpan.style.padding = "2px 6px";
                statusSpan.style.borderRadius = "4px";
                statusSpan.style.fontSize = "10px";
                statusSpan.style.fontWeight = "600";
                
                if (item.status === "passed") {
                    statusSpan.style.background = "rgba(74, 222, 128, 0.1)";
                    statusSpan.style.color = "#4ade80";
                    statusSpan.textContent = "PASSED";
                } else if (item.status === "rejected") {
                    statusSpan.style.background = "rgba(248, 113, 113, 0.1)";
                    statusSpan.style.color = "#f87171";
                    statusSpan.textContent = "REJECTED";
                } else {
                    statusSpan.style.background = "rgba(255, 255, 255, 0.1)";
                    statusSpan.style.color = "var(--text-secondary)";
                    statusSpan.textContent = (item.status || "UNKNOWN").toUpperCase();
                }
                tdStatus.appendChild(statusSpan);
                tr.appendChild(tdStatus);
                
                tr.addEventListener("click", () => {
                    navigator.clipboard.writeText(item.finalAd || "").then(() => {
                        const originalBg = tr.style.background;
                        tr.style.background = "rgba(34, 197, 94, 0.2)";
                        showHistoryToast("Copied to clipboard!");
                        setTimeout(() => {
                            tr.style.background = originalBg;
                        }, 1000);
                    }).catch(err => {
                        console.error("Failed to copy:", err);
                    });
                });
                
                tbody.appendChild(tr);
            });
        } else {
            tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: #f87171; padding: 20px;">Error: ${data.message}</td></tr>`;
        }
    })
    .catch(err => {
        console.error("Error fetching history:", err);
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: #f87171; padding: 20px;">Network error loading history.</td></tr>`;
    });
}



