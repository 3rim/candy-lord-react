class LoanShark {
    interestRate: number;
    loanDays: number;

    constructor(interestRate: number = 0.05) {
        this.interestRate = interestRate;
        this.loanDays = 0;
    }

    getLoanPaybackAmount(loanAmount: number): number {
        return loanAmount * Math.pow(1 + this.interestRate, this.loanDays);
    }

    borrowMoney(playerMoney: number, amount: number): [number, number] {
        return [playerMoney + amount, amount];
    }

    repayLoan(playerMoney: number, amount: number): [number, number] {
        return [playerMoney - amount, Math.max(0, amount - playerMoney)];
    }

    advanceDateByOneDay(): void {
        this.loanDays++;
    }
}

export default LoanShark;
