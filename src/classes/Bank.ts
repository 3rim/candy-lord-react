class Bank {
    private bankBalance: number = 0;

    deposit(amount: number): void {
        if (amount > 0) {
            this.bankBalance += amount;
        } else {
            throw new Error("Invalid deposit amount.");
        }
    }

    withdraw(amount: number): void {
        if (amount <= this.bankBalance && amount > 0) {
            this.bankBalance -= amount;
        } else {
            throw new Error("Insufficient funds.");
        }
    }

    getBankBalance(): number {
        return this.bankBalance;
    }
}

export default Bank;
