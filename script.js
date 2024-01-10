const itemContainer = document.getElementById("item-container");
const rarityIndex = document.getElementById("rarity-index");

let totalItems = 0;

function changeBackgroundColor() {
  // Get the input value
  var hexColor = document.getElementById("colorInput").value;

  // Validate if the input is a valid hex color
  if (/^#[0-9A-F]{6}$/i.test(hexColor)) {
    // Set the background color
    document.body.style.backgroundColor = hexColor;
  }
}

function changeInventoryColor() {
  // Get the input value
  var hexColor = document.getElementById("invInput").value;

  // Validate if the input is a valid hex color
  if (/^#[0-9A-F]{6}$/i.test(hexColor)) {
    // Set the background color of the container
    document.getElementsByClassName("container")[0].style.backgroundColor =
      hexColor;
  }
}

// you can mod this game if you want just give me credit k thx byee

let items = {
 "the true final boat":[1/999999999999999, 0],
 "haribo gummy bear":[1/202000000000000, 0],
 "Deverium Biasium":[1/100000000000000, 0],
 "Tom":[1/22000000000000, 0],
 "ETHEREAL QUANDERIGUS":[1/10000000000000, 0],
 "hydrogen bomb vs coughing baby":[1/1000000000000, 0],
 "gyatcore-pinephrine":[1/999999999999, 0],
 "super deadly seeking eyes that stare at you until you pass out":[1/999999999999, 0],
 "the true krabby Patty's recipe":[1/999999999999, 0],
 "IM NOT LOOKSMAXXING IM FANUMTAXXING":[1/999999999999, 0],
 "steamed ham":[1/947328938274, 0],
 "🍔":[1/777777777777, 0],
 "femboy crystal":[1/686686686686, 0],
 "MY DAD OWNS ROBLOX 🤑":[1/288272673027, 0],
 "bomb vs baby":[1/281258712819, 0],
 "raw hotdog":[1/150000000000, 0],
 "Lobotomy":[1/50000000000, 0],
 "the true french baguette":[1/40000000009, 0],
 "everything is gone crystal":[1/19000000000, 0],
 "the seventeenth ore":[1/17000000000, 0],
 "Hawaii: Part IV":[1/12120120120, 0],
 "the last boat":[1/10000000000, 0],
 "😍":[1/9292922929, 0],
 "walter white":[1/8923908103, 0],
 "2.2 singularity":[1/2200000000, 0],
 "old man emoji":[1/1500000000, 0],
 "carbingle boamian":[1/1400000000, 0],
 "12345 noches con alfredo":[1/1234500000, 0],
 "BOATS UNITE":[1/1111111111, 0],
 "moderator crystal":[1/1000000003, 0],
 "REAL boat":[1/1000000000, 0],
 "Pookie Crystal :3":[1/999999999, 0],
 "biggest stone in the world (its big i think)":[1/999999999, 0],
 "smallest stone in the world (its small i think)":[1/999999999, 0],
 "adrenaline":[1/9999999977, 0],
 "chess pulsar":[1/975318642, 0],
 "Ban Crystal":[1/765000020, 0],
 "WHAT crystal":[1/740000000, 0],
 "Super Altered Snowstrobe":[1/700000000, 0],
 "krill fish from sad geido":[1/666251821, 0],
 "sailent":[1/621220000, 0],
 "weaponized battle toaster":[1/555555555, 0],
 "checkmate crystal":[1/500000000, 0],
 "en passant crystal":[1/500000000, 0],
 "the super altered racoon farting crystal":[1/500000000, 0],
 "common crystal":[1/300000000, 0],
 "submit rng game for an stuff":[1/205000000, 0],
 "ding fries are done":[1/200000000, 0],
 "halflife 2 stalker screamer crystal":[1/195666666, 0],
 "old mac":[1/150000001, 0],
 "ding":[1/150000000, 0],
 "Krogglerine":[1/125692192, 0],
 "nuclear strikium":[1/125000000, 0],
 "the stew":[1/111111111, 0],
 "Clown nose verse":[1/100000000, 0],
 "golden crown of chaos":[1/100000000, 0],
 "boat v8":[1/100000000, 0],
 "stupid baby":[1/100000000, 0],
 "ohio fanum gyatt sigma 🤑🤑":[1/99999999, 0],
 "nice find":[1/99999999, 0],
 "blue doctor":[1/98571036.7, 0],
 "Shiny Rainbow Titanic Fingulated Tonsil Trevor":[1/90000000, 0],
 "Transgenderine":[1/77000777, 0],
 "super stinky socks":[1/69691281, 0],
 "helicopter ium":[1/63222222, 0],
 "ultra bomb kit":[1/52251121, 0],
 "fladingle mobile":[1/50000000, 0],
 "Hood of Heroes crystal":[1/30000000, 0],
 "crewmate costume in real life":[1/29000000, 0],
 "bucket of wet slop":[1/28000000, 0],
 "John: ore edition":[1/11111111, 0],
 "a really really rare pebble":[1/10000000, 0],
 "🤑":[1/10000000, 0],
 "boat v7":[1/10000000, 0],
 "sparkle":[1/10000000, 0],
 "my gyatt rumbled":[1/8283929, 0],
 "the big bidi":[1/8000000, 0],
 "filler ore":[1/636512, 0],
 "kevin":[1/5000000, 0],
 "William":[1/2000000, 0],
 "10 dollar shipping":[1/1000000, 0],
 "boat v6":[1/1000000, 0],
 "female skibidi":[1/1000000, 0],
 "skibidi toilet plushie":[1/1000000, 0],
 "John's legendary tome of janitor business":[1/870000, 0],
 "purplx":[1/739000, 0],
 "random rotating spinkler":[1/600000, 0],
 "dancing airpods":[1/600000, 0],
 "Emoji if you look at it hard enough":[1/502000, 0],
 "joeverite":[1/460500, 0],
 "obama icespice":[1/400000, 0],
 "1 in 300,000 crystal":[1/300000, 0],
 "ores if they were awesome":[1/252520, 0],
 "UGC Dominus":[1/125000, 0],
 "legendary cyan pebble":[1/110000, 0],
 "boat v5":[1/100000, 0],
 "JOHN":[1/91378, 0],
 "air conditioner ium":[1/53000, 0],
 "IT IONIZED":[1/34567, 0],
 "12/28/23 incident":[1/31000, 0],
 "hacker":[1/25000, 0],
 "dolla dolla bills💰💰💰💸💸💸":[1/15000, 0],
 "slightly functional toaster":[1/12500, 0],
 "boat v4":[1/10000, 0],
 "farty party":[1/10000, 0],
 "molten water (how is this possible)":[1/8150, 0],
 "fragmental core":[1/7500, 0],
 "PvZ forehead 😱😭":[1/4000, 0],
 "online spanish lessons":[1/2300, 0],
 "THESE WILL BE ORES IN 2014":[1/2014, 0],
 "poor people":[1/2000, 0],
 "peanut plant":[1/1992, 0],
 "boat v3":[1/1000, 0],
 "fanny pack":[1/1000, 0],
 "police gun but its mad (very salt)":[1/989, 0],
 "prplx":[1/739, 0],
 "cat":[1/561, 0],
 "methane in the air":[1/399, 0],
 "weird blanket":[1/350, 0],
 "$3 crystal (poor)":[1/300, 0],
 "pro":[1/250, 0],
 "roblox studio ball metadata":[1/200, 0],
 "$2 crystal (so poor)":[1/200, 0],
 "Pantone 448 C":[1/170, 0],
 "i like mushrooms more than u":[1/110, 0],
 "ik someone who likes mushrooms more than u":[1/110, 0],
 "boat v2":[1/100, 0],
 "SMALLEST STONE IN THE WORLD":[1/100, 0],
 ":plonk:":[1/100, 0],
 "a really rare mineral":[1/100, 0],
 "random blue bone":[1/80, 0],
 ":plink:":[1/75, 0],
 "slightly saturated copper":[1/60, 0],
 "kevin macleod":[1/50, 0],
 "default roblox sparkle":[1/33, 0],
 "noob":[1/25, 0],
 "piece of plastic over there and around the corner":[1/25, 0],
 "Shiny Quarter":[1/25, 0],
 "robert topalla":[1/20, 0],
 "rublux boolleey storey":[1/15, 0],
 "mr krabs figurine":[1/14, 0],
 "SUPERFICIAL DINGLE":[1/13, 0],
 "blank":[1/12, 0],
 "really rare ore":[1/11, 0],
 "boat v1":[1/10, 0],
 "seegma":[1/9, 0],
 "The entire country of St Vincent & the Grenadines":[1/8, 0],
 "cuddly buddy":[1/7, 0],
 "schlawgite":[1/6, 0],
 "ParticleEmitter":[1/5, 0],
 "number":[1/2, 0],
 "letter":[1/1, 0]
};

let itemCounts = {};

// Add a flag to indicate whether a rare item has been found
let rareItemFound = false;

let cumulativeProbabilities = calculateCumulativeProbabilities();

function getRandomItem() {
  let randomValue = Math.random();
  randomValue /= 1;
  let temp = Object.keys(items);
  let low = 0;
  let high = temp.length;
  while (low < high) {
    const mid = (low + high) >> 1; // Use bitwise shift for integer division
    if (randomValue >= cumulativeProbabilities[mid]) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  low = temp.length - 1 - low;
  return temp[low];
}

function calculateCumulativeProbabilities() {
  let cumulativeProbability = 0;
  let cumulativeProbabilities = [];

  let j = 0;
  let temp = Object.keys(items);
  for (let i = temp.length - 1; i >= 0; i--) {
    cumulativeProbability += items[temp[i]][0];
    cumulativeProbabilities[j] = cumulativeProbability;
    j++;
  }
  

  const totalProbability = cumulativeProbability;
  
  for (let i = 0; i < cumulativeProbabilities.length; i++) {
    cumulativeProbabilities[i] /= totalProbability;
  }

  return cumulativeProbabilities;
}

function updateCumulativeProbabilities() {
  cumulativeProbabilities = calculateCumulativeProbabilities();
}

function updateTotalItemsDisplay() {
    document.getElementById("totalItems").innerHTML = `Total Items: ${totalItems.toLocaleString()}`;
}

function collectItem() {
  const item = getRandomItem();
  totalItems++;
  items[item][1]++;
  updateTotalItemsDisplay();
  updateItemDisplay(item);
}

// Call this function whenever the items list changes
updateCumulativeProbabilities();

let dataTimer = null;
let dataLooping = false;
function repeatDataSave() {
    dataTimer = setInterval(saveGameState, 3000);
}

function saveGameState() {
  try {
    let data = [];
    for (let propertyName in items) {
      data.push([propertyName, items[propertyName][1]])
    }
    localStorage.setItem("itemCounts", JSON.stringify(data));
    localStorage.setItem("totalItems", JSON.stringify(totalItems));
  } catch (error) {}
}

function loadGameState() {
  try {
    const savedItemCounts = JSON.parse(localStorage.getItem("itemCounts"));
    if (savedItemCounts != null) {
      for (let i = 0; i < savedItemCounts.length; i++) {
        if (items[savedItemCounts[i][0]] != undefined) {
          items[savedItemCounts[i][0]][1] = savedItemCounts[i][1];
          updateItemDisplay(savedItemCounts[i][0]);
        }
      }
      
    }
    const loadItems = JSON.parse(localStorage.getItem("totalItems"));
    if (loadItems != undefined) {
      totalItems = loadItems;
      updateTotalItemsDisplay;
    }
  } catch (error) {
    console.log(error);
  }
}

function updateItemDisplay(item) {
  if (items[item][1] > 0) {
    document.getElementById("" + item).style = "display:block;"
  }
  document.getElementById("" + item).innerHTML = item + ": " + items[item][1].toLocaleString() + " | 1/" + formatNumberWithCommas(Math.round(1/items[item][0])) ;
}

function createItems() {
  for (let propertyName in items) {
    let element = document.createElement("p");
    element.id = propertyName;
    element.innerHTML = propertyName + ": 1/" + Math.round(1/(items[propertyName][0])).toLocaleString() + " | x0";
    element.style = "display:none;";
    document.getElementById("rarity-index").appendChild(element);
  }
}
function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function gameLoop() {
  for (let i = 0; i < 15; i++) {
    collectItem();
  }
}
let itemTimer = null;
function itemLoop() {
  loadGameState();
  repeatDataSave();
  itemTimer = setInterval(gameLoop, 0);
}

// make items
createItems();

// Start the game loop
itemLoop();