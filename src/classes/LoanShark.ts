class LoanShark {
    interestRate: number;
    remainingDays: number;
    currentLoanAmount: number;

    constructor(interestRate: number = 0.05, initialDays: number = 7) {
        this.interestRate = interestRate;
        this.remainingDays = initialDays;
        this.currentLoanAmount = 0;
    }

    getLoanPaybackAmount(): number {
        return Math.round(this.currentLoanAmount);
    }

    borrowMoney(amount: number): number {
        this.currentLoanAmount += amount;
        return this.currentLoanAmount;
    }

    repayLoan(amount: number): number {
        const remainingLoan = this.getLoanPaybackAmount() - amount;
        this.currentLoanAmount = remainingLoan;
        console.log(this.currentLoanAmount);
        return this.currentLoanAmount;
    }

    reduceRemainingDays(): void {
        this.remainingDays--;
        this.currentLoanAmount = Math.round(this.currentLoanAmount * (1 + this.interestRate));
    }
}

export default LoanShark;
