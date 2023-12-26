const itemContainer = document.getElementById("item-container");
const itemCounters = document.getElementById("item-counters");
const rarityIndex = document.getElementById("rarity-index");

let luckBoost = 1;

async function sendWebhookMessage(webhookUrl, message) {
    const data = {
        content: message,
    };

    const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        console.error("Failed to send webhook message:", response.statusText);
    }
}

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
        document.getElementsByClassName("container")[0].style.backgroundColor = hexColor;
    }
}

// you can mod this game if you want just give me credit k thx byee

const items = [
    { name: "atom", rarity: luckBoost/1 },
{ name: "molecule", rarity: luckBoost/2 },
{ name: "ParticleEmitter", rarity: luckBoost/5 },
{ name: "seegma", rarity: luckBoost/10 },
{ name: "mr krabs figurine", rarity: luckBoost/13 },
{ name: "rublux boolleey storey", rarity: luckBoost/15 },
{ name: "robert topalla", rarity: luckBoost/20 },
{ name: "kevin leonardo", rarity: luckBoost/50 },
{ name: ":plonk:", rarity: luckBoost/100 },
{ name: "ik someone who likes mushrooms more than u", rarity: luckBoost/110 },
{ name: "i like mushrooms more than u", rarity: luckBoost/111 },
{ name: "farty party", rarity: luckBoost/10000 },
{ name: "skibidi toilet plushie", rarity: luckBoost/1000000 },
{ name: "10 dollar shipping", rarity: luckBoost/1000001 },
{ name: "kevin", rarity: luckBoost/5000000 },
{ name: "Clown nose verse", rarity: luckBoost/100000000 },
];

let itemCounts = {};

// Add a flag to indicate whether a rare item has been found
let rareItemFound = false;

items.forEach((item) => {
    itemCounts[item.name] = 0;
});

let cumulativeProbabilities = calculateCumulativeProbabilities();

function getRandomItem() {
    const randomValue = Math.random();
    let low = 0;
    let high = items.length - 1;

    while (low < high) {
        const mid = Math.floor((low + high) / 2);
        if (randomValue <= cumulativeProbabilities[mid]) {
            high = mid;
        } else {
            low = mid + 1;
        }
    }

    return items[low];
}

function calculateCumulativeProbabilities() {
    const cumulativeProbabilities = [];
    let cumulativeProbability = 0;

    for (const item of items) {
        cumulativeProbability += item.rarity;
        cumulativeProbabilities.push(cumulativeProbability);
    }

    return cumulativeProbabilities.map(value => value / cumulativeProbability);
}

function updateCumulativeProbabilities() {
    cumulativeProbabilities = calculateCumulativeProbabilities();
}

function collectItem() {
    const item = getRandomItem();
    itemCounts[item.name]++;

    updateItemDisplay();
    saveGameState(); // Save the game state after collecting items

    // Check if a rare item has been found
    if (item.rarity < 1.000001e-06 && item.rarity > 1.000001e-08) {
        rareItemFound = true;
        const rarityValueFormatted = formatNumberWithCommas(Math.round(1 / item.rarity));

        // Create a message to send to Discord
        const webhookUrl = "https://discord.com/api/webhooks/1189328252213395476/0j8UXokstq5oCqmVnpulQRw9OGpAkJ3G0sNZhWsuEvAg5FqZz1N-ZebHMCS4MlFtp9hJ"; // Replace with your actual Discord webhook URL
        const message = `SO SKEEKY: ${item.name} IS SO SKEEKY, ITS 1/${formatNumberWithCommas(rarityValueFormatted)}`;
    
        // Send the message to Discord
        sendWebhookMessage(webhookUrl, message);
    }
    if (item.rarity < 0.0000000512319 && item.rarity > 0.0000000172) {
        rareItemFound = true;
        const rarityValueFormatted = formatNumberWithCommas(Math.round(1 / item.rarity));

        // Create a message to send to Discord
        const webhookUrl = "https://discord.com/api/webhooks/1189323087469097081/-vAfNqE4yIafZOZpLiprgtsgfx8KXby69Iv5tUYvruLJnSDkcru7I-zXQh1OiYAaA7OK"; // Replace with your actual Discord webhook URL
        const message = `WOW WOW ORE FOUND!!!!: ${item.name}: 1/${formatNumberWithCommas(rarityValueFormatted)}`;

        // Send the message to Discord
        sendWebhookMessage(webhookUrl, message);
    }
    if (item.rarity < 0.0000000172) {
        rareItemFound = true;
        const rarityValueFormatted = formatNumberWithCommas(Math.round(1 / item.rarity));

        // Create a message to send to Discord
        const webhookUrl = "https://discord.com/api/webhooks/1189323087469097081/-vAfNqE4yIafZOZpLiprgtsgfx8KXby69Iv5tUYvruLJnSDkcru7I-zXQh1OiYAaA7OK"; // Replace with your actual Discord webhook URL
        const message = `YEAHHHHH @everyone @everyone YEAHHHHH: ${item.name}: 1/${formatNumberWithCommas(rarityValueFormatted)}`;

        // Send the message to Discord
        sendWebhookMessage(webhookUrl, message);
    }
}

// Call this function whenever the items list changes
updateCumulativeProbabilities();

function saveGameState() {
    try {
        localStorage.setItem("itemCounts", JSON.stringify(itemCounts));
    } catch (error) {
    }
}

function loadGameState() {
    try {
        const savedItemCounts = localStorage.getItem("itemCounts");

        if (savedItemCounts) {
            itemCounts = JSON.parse(savedItemCounts); // Assign the parsed game state to itemCounts
            updateItemDisplay();
        } else {
        }
    } catch (error) {
    }
}

function updateItemDisplay() {
    itemCounters.innerHTML = "";

    items.forEach((item) => {
        if (itemCounts[item.name] > 0) {
            const itemCounter = document.createElement("p");
            itemCounter.textContent = `${item.name}: ${formatNumberWithCommas(itemCounts[item.name])}`;
            itemCounters.appendChild(itemCounter);
        }
    });
}

function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function updateRarityIndex() {
    rarityIndex.innerHTML = "<h2>Rarity Index</h2>";

    items.forEach((item) => {
        const rarityEntry = document.createElement("p");
        const rarityValueFormatted = formatNumberWithCommas(Math.round(1 / item.rarity));
        rarityEntry.textContent = `${item.name}: 1/${rarityValueFormatted}`;
        rarityIndex.appendChild(rarityEntry);
    });
}

// Set up a timer to automatically collect items super fast
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);
setInterval(collectItem, 0.0000000000000000000001);

setInterval(updateItemDisplay, 10);
setInterval(saveGameState, 10);

// Initialize the rarity index
updateRarityIndex();

// Load the game state
loadGameState();