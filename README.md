Welcome to the Lootbox Simulator! This is a simple browser-based game that allows you to simulate the experience of opening lootboxes and collecting various virtual items. In this simulator, you can perform two types of loot pulls: a single pull and a 10-item pull. Each pull will give you random items of different rarities.

Getting Started

To start the Lootbox Simulator, open the index.html file in your web browser. The simulator will load, and you'll see a button for performing single pulls and another for performing 10-item pulls. Additionally, there will be a section where all the drawn items and relevant statistics are displayed.

Gameplay

    Single Pull:
        Click on the "Pull One" button to perform a single loot pull.
        A random item will be drawn, and its name, type, and rarity will be displayed in the output section.
        The total number of cards drawn will be incremented, and if you don't get a legendary item for 90 consecutive pulls, the 91st pull will guarantee a legendary item.
        The list of all drawn items will be displayed in the output section, along with any duplicates found.

    10-Item Pull:
        Click on the "Pull Ten" button to perform a 10-item loot pull.
        Ten random items will be drawn, including at least one rare item (if not already included).
        The drawn items will be displayed in the output section, along with the total number of cards drawn so far and any duplicates found.

Class: Loot

The Loot class represents an individual loot item with a name, rarity, and type. The rarity can be 0 (common), 1 (rare), or 2 (legendary). The type can be "Axe," "Bow," "Dagger," "Staff," "Sword," or "Mace."

Functions

    startSimulator(): This function initializes the loot simulator. It creates the loot list, sets up the event listeners for single and 10-item pulls, and starts the simulation.

    pullOneItem(lootList): This function handles a single loot pull. It generates a random number and uses the checkRarity() function to determine the rarity of the drawn item. It also keeps track of the total number of cards drawn and guarantees a legendary item if 90 consecutive pulls did not yield any.

    pullTenItems(lootList): This function handles a 10-item loot pull. It generates 9 random items and adds a random rare item to ensure at least one rare item in the pull. The items are then displayed, and the total number of cards drawn is updated.

    checkRarity(randomNumber, lootList): This function takes a random number and the loot list as input and determines the rarity of the drawn item based on the random number. It returns the drawn item.

    checkForOneRareItem(items, lootList): This function ensures that at least one rare item is present in a list of items. If not, it replaces a random item with a random rare item.

    countDuplicates(itemList): This function counts and returns the duplicates present in a list of items.