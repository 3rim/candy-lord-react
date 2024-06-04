import { Candy } from "./Candy";
import { City } from "./City";
import Bank from "./Bank";
import LoanShark from "./LoanShark";

interface InventoryItem {
    candy: Candy;
    amount: number;
}

class Player {
    candyInventory: Array<InventoryItem>;
    money: number;
    currentCity: City; // Include current city as part of the player's state
    startDate: Date;
    loanShark: LoanShark;
    bank: Bank;
    maxCandyCapacity: number;

    constructor(money: number = 0,
        candyInventory: Array<InventoryItem> = [],
        currentCity: City,
        startDate: Date = new Date(),
        loanShark: LoanShark = new LoanShark(),
        bank: Bank = new Bank(),
        maxCandyCapacity = 10
    ) {
        this.money = money;
        this.candyInventory = candyInventory;
        this.currentCity = currentCity;
        this.startDate = startDate;
        this.loanShark = loanShark;
        this.bank = bank;
        this.maxCandyCapacity = maxCandyCapacity;
    }

    // Method to check if the candy inventory exceeds the maximum capacity
     exceedsCapacity(candy: Candy, amount: number): boolean {
        const currentAmount = this.getCandyAmount(candy);
        return currentAmount + amount > this.maxCandyCapacity;
    }

    getCurrentDate(): string {
        return this.startDate.toDateString();
    }

    advanceDateByOneDay(): Player {
        const nextDay = new Date(this.startDate);
        nextDay.setDate(nextDay.getDate() + 1);
        return new Player(this.money, this.candyInventory, this.currentCity, nextDay, this.loanShark, this.bank);
    }

    deposit(amount: number): Player {
        this.bank.deposit(amount);
        console.log(this.bank);
        console.log(`Deposited ${amount} into the bank.`);
        return new Player(this.money - amount, this.candyInventory, this.currentCity, this.startDate, this.loanShark, this.bank);
    }

    withdraw(amount: number): Player {
        this.bank.withdraw(amount);
        return new Player(this.money + amount, this.candyInventory, this.currentCity, this.startDate, this.loanShark, this.bank);
    }

    getBankBalance(): number {
        return this.bank.getBankBalance();
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
        this.money -= candy.price * amount;
        // Return a new Player instance with the updated inventory and same current city
        return new Player(this.money,newCandyInventory, this.currentCity, this.startDate, this.loanShark, this.bank);
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
        return new Player(this.money,newCandyInventory, this.currentCity, this.startDate, this.loanShark, this.bank);
    }

    getCandyAmount(candy: Candy): number {
        const item = this.candyInventory.find(item => item.candy.name === candy.name);
        return item ? item.amount : 0;
    }

    getInventory(): Array<InventoryItem> {
        return this.candyInventory;
    }

    getTotalCandyAmount(): number {
        return this.candyInventory.reduce((total, item) => total + item.amount, 0);
    }

    travelToCity(destination: City, travelCost: number): Player {
        if (this.money < travelCost) {
            throw new Error("Insufficient funds to travel.");
        }
        const updatedPlayer = new Player(
            this.money - travelCost,
            this.candyInventory,
            destination,
            this.startDate,
            this.loanShark,
            this.bank
        );
        return updatedPlayer.advanceDateByOneDay();
    }
}

export default Player;
