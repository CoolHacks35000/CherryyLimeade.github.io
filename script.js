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

let items = 
     "Cryotic":[1/994000, 0],
    "Chromatite":[1/875000, 0],
     "Newtonium":[1/755050, 0],
   "Unobtanium":[1/631000, 0],
  "Zefendium":[1/507000, 0],
    "Solarite":[1/500000, 0],
    "Intoxium":[1/170500, 0],
  "Rainbonite":[1/150500, 0],
"Spatializine":[1/122500, 0],
"Tanzanite":[1/95502, 0],
 "rocc":[1/2, 0],
 "ROCK":[1/1, 0]
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
  for (let i = 0; i < 700; i++) {
    collectItem();
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
