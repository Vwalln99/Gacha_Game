class Loot {
    constructor(name, rarity, type) {
        this.name = name;
        this.rarity = rarity;
        this.type = type;
    }
    getLootName() {
        return this.name;
    }
    getLootType() {
        return this.type;
    }
    getLootRarity() {
        return this.rarity;
    }
}

function allLoot() {
    const loot = [
        new Loot("Waxing Gibbous", 0, "Axe"),
        new Loot("Windforce", 0, "Bow"),
        new Loot("Asheara's Khanjar", 0, "Dagger"),
        new Loot("Staff of Endless Rage", 0, "Staff"),
        new Loot("Doombringer", 0, "Sword"),
        new Loot("Hellhammer", 0, "Mace"),
        new Loot("Stinger", 1, "Dagger"),
        new Loot("Staff of Elemental Command", 1, "Staff"),
        new Loot("Infernal Edge", 1, "Sword"),
        new Loot("Mace of Blazing Furor", 1, "Mace"),
        new Loot("Butcher's Cleaver", 2, "Axe"),
        new Loot("Skyhunter", 2, "Bow"),
        new Loot("Godfather", 2, "Sword"),
        new Loot("Black River", 2, "Mace")
    ];
    return loot;
}

const countDuplicates = (itemList) => {
    const itemCounts = {};
    itemList.forEach(item => {
        const itemName = item.getLootName();
        if (itemCounts[itemName]) {
            itemCounts[itemName]++;
        } else {
            itemCounts[itemName] = 1;
        }
    });
    let result = "";
    for (const itemName in itemCounts) {
        if (itemCounts[itemName] > 1) {
            result += `${itemName} x${itemCounts[itemName]}, `;
        }
    }
    return result;
};

const saveItemDraw = (itemDraws) => {
    let totalDraws = 0;
    itemDraws.forEach(items => {
        totalDraws += Array.isArray(items) ? items.length : 1;
    });
    console.log("Anzahl der gezogenen Karten: ", totalDraws);
    const output = document.createElement("div");
    output.classList.add("consoleOutputA");
    const allItems = document.getElementById("allItems");
    allItems.appendChild(output);
    const outputText = `Cards drawn: ${totalDraws}`;
    output.innerText = outputText;
};

const saveAllItems = (allItem) => {
    console.log("Alle Items: ", allItem);
    const output = document.createElement("div");
    output.classList.add("consoleOutput");
    const allItems = document.getElementById("allItems");
    allItems.appendChild(output);
    let outputTextItem = "All Items: ";
    const uniqueItems = [];
    allItem.forEach(item => {
        const itemName = item.getLootName();
        if (!uniqueItems.some(uniqueItem => uniqueItem.getLootName() === itemName)) {
            uniqueItems.push(item);
            outputTextItem += `${item.getLootName()} (${item.getLootType()}), `;
        }
    });

    const duplicateText = `Duplicates: ${countDuplicates(allItem)}`;
    output.innerText = `${outputTextItem}\n${duplicateText}`;
};


const pullOneItem = (lootList) => {
    const pullOne = document.getElementById("pullOne");
    let itemDraws = [];
    let totalDraws = 0;
    let consecutiveNoLegendary = 0;
    pullOne.addEventListener("click", () => {
        let randomNumber = Math.random();

        let oneItem = checkRarity(randomNumber, lootList);
        itemDraws.push(oneItem);
        totalDraws++;

        if (oneItem.getLootRarity() < 2) {
            consecutiveNoLegendary++;
            if (consecutiveNoLegendary === 91) {
                console.log("Du bekommst ein legendäres Item!")
                oneItem = lootList.find(loot => loot.getLootRarity() === 2);
                consecutiveNoLegendary = 0;
            }
        } else {
            consecutiveNoLegendary = 0;
        }

        const allItems = document.getElementById("allItems");
        allItems.innerHTML = "";
        createItemEntry(oneItem, allItems);
        saveItemDraw(itemDraws, totalDraws);
        saveAllItems(itemDraws);
    });
}

const pullTenItems = (lootList) => {
    const pullTen = document.getElementById("pullTen");
    let itemDraws = [];
    let allItem = [];
    let totalDraws = 0;
    pullTen.addEventListener("click", () => {
        const tenItems = [];

        for (let i = 0; i < 9; i++) { 
            let randomNumber = Math.random();
            let item = checkRarity(randomNumber, lootList);
            tenItems.push(item);
        }
        const rareItem = lootList.filter(loot => loot.getLootRarity() === 1);
        const randomRareItem = rareItem[Math.floor(Math.random() * rareItem.length)];
        tenItems.push(randomRareItem);
        tenItems.sort(() => Math.random() - 0.5);

        itemDraws.push(tenItems);
        allItem.push(...tenItems);

        const allItems = document.getElementById("allItems");
        allItems.innerHTML = "";
        saveItemDraw(itemDraws, totalDraws);
        saveAllItems(allItem);

        tenItems.forEach(item => {
            createItemEntry(item, allItems);
        });
    });
}

const checkRarity = (randomNumber, lootList) => {
    let getItemsbyRarity;
    if (randomNumber < 0.01) {
        getItemsbyRarity = lootList.filter(loot => loot.getLootRarity() === 2);
    } else if (randomNumber < 0.08) {
        getItemsbyRarity = lootList.filter(loot => loot.getLootRarity() === 1);
    } else {
        getItemsbyRarity = lootList.filter(loot => loot.getLootRarity() === 0);
    }
    let chooseRandomItem = Math.floor(Math.random() * getItemsbyRarity.length);
    let item = getItemsbyRarity[chooseRandomItem];
    return item;
}

const checkForOneRareItem = (items, lootList) => {
    // Check if at least one rare item is there, otherwise replace one item with a rare one
    let hasRareItem = false;
    items.forEach(item => {
        if (item.getLootRarity() === 1) {
            hasRareItem = true;
        }
    });

    if (!hasRareItem) {
        let changeToRareItem = Math.floor(Math.random() * 10);
        let getItemsbyRarity = lootList.filter(loot => loot.getLootRarity() === 1);
        let chooseRandomItem = Math.floor(Math.random() * getItemsbyRarity.length);
        let newItem = getItemsbyRarity[chooseRandomItem];
        items.splice(changeToRareItem, 1, newItem);
    }
    return items;
};

const createItemEntry = (item, allItems) => {
    const itemEntry = document.createElement("div");
    itemEntry.classList.add("item");
    allItems.appendChild(itemEntry);
    const itemName = document.createElement("h2");
    itemName.classList.add("item_name");
    itemName.innerText = item.getLootName();
    itemEntry.appendChild(itemName);
    const itemType = document.createElement("p");
    itemType.classList.add("item_type");
    itemType.innerText = item.getLootType();
    itemEntry.appendChild(itemType);
    const itemRarity = document.createElement("p");
    itemRarity.classList.add("item_rarity");
    if (item.getLootRarity() === 0) {
        itemEntry.classList.add("common");
        itemRarity.innerHTML = "Common";
    } else if (item.getLootRarity() === 1) {
        itemEntry.classList.add("rare");
        itemRarity.innerHTML = "Rare";
    } else {
        itemEntry.classList.add("legendary");
        itemRarity.innerHTML = "Legendary";
    }
    itemEntry.appendChild(itemRarity);
}

function startSimulator() {
    const lootList = allLoot();
    pullOneItem(lootList);
    pullTenItems(lootList);
}

startSimulator();