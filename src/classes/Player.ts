import { Candy } from "./Candy";
import { City } from "./City"; // Assuming City class is defined in a separate file

interface InventoryItem {
    candy: Candy;
    amount: number;
}

class Player {
    name: string;
    candyInventory: Array<InventoryItem>;
    money: number;
    currentCity: City; // Include current city as part of the player's state

    constructor(name: string, money: number = 0, candyInventory: Array<InventoryItem> = [], currentCity: City) {
        this.name = name;
        this.money = money;
        this.candyInventory = candyInventory;
        this.currentCity = currentCity;
    }

    // Method to create a new Player instance with updated inventory
    buyCandy(candy: Candy, amount: number): Player {
        // Create a copy of the current candyInventory
        const newCandyInventory = this.candyInventory.map(item => ({
            candy: item.candy,
            amount: item.amount
        }));

        // Find the item in the copied inventory
        const item = newCandyInventory.find(item => item.candy.name === candy.name);
        if (item) {
            item.amount += amount;
        } else {
            newCandyInventory.push({ candy, amount });
        }
        this.money += candy.price * amount;
        // Return a new Player instance with the updated inventory and same current city
        return new Player(this.name, this.money, newCandyInventory, this.currentCity);
    }

    sellCandy(candy: Candy, amount: number): Player {
        // Create a copy of the current candyInventory
        const newCandyInventory = this.candyInventory.map(item => ({
            candy: item.candy,
            amount: item.amount
        }));

        // Find the item in the copied inventory
        const itemIndex = newCandyInventory.findIndex(item => item.candy.name === candy.name);
        if (itemIndex !== -1) {
            // If the candy is found in the inventory
            if (newCandyInventory[itemIndex].amount >= amount) {
                // If there is enough candy to sell
                newCandyInventory[itemIndex].amount -= amount;
                this.money += candy.price * amount; // Adjust player's money
            } else {
                console.log("Not enough candy to sell");
            }
        } else {
            console.log("Candy not found in inventory");
        }

        // Return a new Player instance with the updated inventory and same current city
        return new Player(this.name, this.money, newCandyInventory, this.currentCity);
    }

    getCandyAmount(candy: Candy): number {
        const item = this.candyInventory.find(item => item.candy.name === candy.name);
        return item ? item.amount : 0;
    }

    getInventory(): Array<InventoryItem> {
        return this.candyInventory;
    }

    // Method to update player's current city when traveling
    travelToCity(city: City,travelCost:number): Player {
        return new Player(this.name, this.money-travelCost, this.candyInventory, city);
    }
}

export default Player;
