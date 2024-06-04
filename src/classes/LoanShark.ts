class LoanShark {
    interestRate: number;
    remainingDays: number;

    constructor(interestRate: number = 0.05) {
        this.interestRate = interestRate;
        this.remainingDays = 7;
    }

    getLoanPaybackAmount(loanAmount: number): number {
        return loanAmount * Math.pow(1 + this.interestRate, this.remainingDays);
    }

    borrowMoney(playerMoney: number, amount: number): [number, number] {
        return [playerMoney + amount, amount];
    }

    repayLoan(playerMoney: number, amount: number): [number, number] {
        return [playerMoney - amount, Math.max(0, amount - playerMoney)];
    }

    reduceRemainingDays(): void {
        this.remainingDays--
    }
}

export default LoanShark;
