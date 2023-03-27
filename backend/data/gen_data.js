const fs = require("fs");
const file = "./db.json";

const names = [
  "Liam",
  "Noah",
  "Oliver",
  "Elijah",
  "James",
  "William",
  "Benjamin",
  "Lucas",
  "Henry",
  "Theodore",
  "Olive",
  "Emma",
  "Charlotte",
  "Amelia",
  "Ava",
  "Sophia",
  "Isabella",
  "Mia",
  "Evelyn",
  "Harper",
];

const projectNames = [
  "Amigos",
  "Antique",
  "Apollo",
  "Astro",
  "Atlantis",
  "Aurora",
  "Balto",
  "Barcelona",
  "Barney",
  "Barracuda",
  "Batman",
  "Bender",
  "Bigfish",
  "Bigfoot",
  "Bladerunner",
  "Blue Moon",
  "Blue Skywalkers",
  "Bongo",
  "Bordeaux",
  "Bride of Buster",
  "Bulldozer",
  "Bullwinkle",
  "Business as Unusual",
  "Camelot",
  "Canary",
  "Casanova",
  "Cascade",
  "Cauldron",
  "Caveman Lawyers",
  "Charming Chicks",
  "Cheerio",
  "Cherrystone",
  "Cinnamon",
  "Cold Fusion",
  "Colossus",
  "Colusa",
  "Constantine",
  "Cowbelles",
  "Crusader",
  "Cyclone",
  "Dagwood",
  "Dangerous Rocks",
  "Darwin",
  "Deepmind",
  "DejaVu",
  "Dessert Storm",
  "Diesel",
  "Disco Divas",
  "Disco Ninjas",
  "Duracell",
  "Duraflame",
  "Durango",
  "Eagle",
  "Early First",
  "Echo Lake",
  "Edison",
  "Einstein",
  "Elixir",
  "Elmer",
  "Excalibur",
  "Fester",
  "Fireball",
  "Firefly",
  "Firestorm",
  "Firetruck",
  "Flamingo",
  "Flyers",
  "Fusion",
  "Galactica",
  "Gemini",
  "Gold Star",
  "Golden Bulls",
  "Gray Panthers",
  "Green Jade",
  "Hades",
  "Hercules",
  "Hidden Hook",
  "Honeycomb",
  "Horned Frogs",
  "Hornets",
  "Husky Cat",
  "Hydra",
  "Indigo",
  "Irongate",
  "Ivory",
  "Jaguar",
  "Jonah",
  "Jupiter",
  "Kanga",
  "KingFish",
  "Kingsmen",
  "Kodiak",
  "Kryptonite",
  "Laguna",
  "Lemon Drops",
  "Liberation",
  "Liquid Sky",
  "Lobster",
  "Longhorns",
  "Lorax",
  "Mad Hatter",
  "Malibu",
  "Mango",
  "Maroon",
  "Massive Monkey",
  "Matadors",
  "Mercury",
  "Metro",
  "Moonshine",
  "Mountaineers",
  "Mustangs",
  "Nautilus",
  "Nitro",
  "Odyssey",
  "Omega",
  "Orange Dots",
  "Orion",
  "Peacocks",
  "Pharoahs",
  "Phoenix",
  "Pink Dragons",
  "Pink Ladies",
  "Pluto",
  "Poseidon",
  "Prelude",
  "Project X",
  "Pure Panther",
  "Python",
  "Quadro",
  "Quicksilver",
  "Rampage",
  "Red Butter",
  "Revolution",
  "Rhinestone",
  "Riviera",
  "Roadrunner",
  "Romeo",
  "Royal",
  "Sahara",
  "Sea Lions",
  "Seawolves",
  "Sirius",
  "Skyhawks",
  "Soul Spartans",
  "Sputnik",
  "Stratos",
  "Striped Foxes",
  "Sultans of Sales",
  "Sunburst",
  "Sunergy",
  "The Bomb Squad",
  "The Violent Storms",
  "Timberwolves",
  "Titan",
  "Topaz",
  "Topcat",
  "Torpedo",
  "Tribe",
  "Vikings",
  "Vipers",
  "Voyager",
  "Weekend Warriors",
  "Westerners",
  "Whistler",
  "White Feather",
  "Wide Stringer",
  "Wombat",
  "Xena",
  "Yaeger",
  "Yellow Moose",
  "Yoda",
  "Yosemite",
  "Zeus",
  "Zircon",
  "Zulu",
];

let idCounter = 0;
const idLength = 8;

let namePool = [];
let productId = "";
let productName = "";
let productOwnerName = "";
let Developers = [];
let scrumMasterName = "";
let startDate = "";
let year = 2020;
let month = 0;
let date = "01";
let methodology = "";
let data = [];

// create 40 products
for (let i = 0; i < 40; i++) {
  namePool = [...names];
  Developers = [];

  productId = (idCounter + 1).toString();
  while (productId.length < idLength) {
    productId = "0" + productId;
  }

  productName = projectNames[Math.floor(Math.random() * projectNames.length)];
  projectNames.splice(projectNames.indexOf(productName), 1);

  productOwnerName = namePool[Math.floor(Math.random() * namePool.length)];
  Developers.push(productOwnerName);
  namePool.splice(namePool.indexOf(productOwnerName), 1);

  // productOwner is in the developer team
  for (let j = 0; j < 4; j++) {
    let selectedName = namePool[Math.floor(Math.random() * namePool.length)];
    Developers.push(selectedName);
    namePool.splice(namePool.indexOf(selectedName), 1);
  }

  scrumMasterName = namePool[Math.floor(Math.random() * namePool.length)];

  if (idCounter > 1 && idCounter % 12 === 0) {
    year++;
  }
  year = year.toString();
  month = ((idCounter % 12) + 1).toString();
  if (month < 10) {
    month = "0" + month;
  }

  startDate = `${year}/${month}/${date}`;

  methodology =
    Math.floor(Math.random() * 100) % 2 === 0 ? "Agile" : "Waterfall";

  let schema = {
    productId: `${productId}`,
    productName: `${productName}`,
    productOwnerName: `${productOwnerName}`,
    Developers: `${Developers}`,
    scrumMasterName: `${scrumMasterName}`,
    startDate: `${startDate}`,
    methodology: `${methodology}`,
  };

  data.push(schema);
  idCounter++;
  month++;
}

//console.log(data);

fs.writeFile(file, JSON.stringify(data), (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});
