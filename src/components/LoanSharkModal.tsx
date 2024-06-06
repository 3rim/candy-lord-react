import React, { useState } from 'react';
import Player from '../classes/Player';

interface LoanSharkModalProps {
    player: Player;
    onClose: () => void;
    onBorrow: (amount: number) => void;
    onRepay: (amount: number) => void;
}

const LoanSharkModal: React.FC<LoanSharkModalProps> = ({ player, onClose, onBorrow, onRepay }) => {
    const [borrowAmount, setBorrowAmount] = useState<string>('');
    const [repayAmount, setRepayAmount] = useState<string>('');

    const handleBorrow = () => {
        const numericAmount = Number(borrowAmount);
        if (!isNaN(numericAmount) && numericAmount > 0 && player.loanShark.currentLoanAmount === 0) {
            onBorrow(numericAmount);
            onClose();
        } else if (player.loanShark.currentLoanAmount > 0) {
            alert("You need to repay the existing loan first.");
        } else {
            alert("Invalid borrow amount.");
        }
    };

    const handleRepay = () => {
        const numericAmount = Number(repayAmount);
        const loanPaybackAmount = player.loanShark.getLoanPaybackAmount();
        if (!isNaN(numericAmount) && numericAmount > 0 && player.money >= numericAmount && loanPaybackAmount >= numericAmount) {
            onRepay(numericAmount);
            onClose();
        } else {
            alert("Invalid repayment amount.");
        }
    };

    const handleBorrowChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBorrowAmount(e.target.value);
    };

    const handleRepayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRepayAmount(e.target.value);
    };

    return (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", color: "black" }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Loan Shark</h5>
                        <button type="button" className="close" onClick={onClose}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>Current Loan: {player.loanShark.currentLoanAmount}$</p>
                        <p>Loan Payback Amount: {player.loanShark.getLoanPaybackAmount().toFixed(2)}$</p>
                        <p>Cash on Hand: {player.money}$</p>
                        <div className="form-group d-flex">
                            <label htmlFor="borrowAmount">Borrow Amount:</label>
                            <input
                                type="number"
                                id="borrowAmount"
                                className="form-control"
                                value={borrowAmount}
                                onChange={handleBorrowChange}
                            />
                            <button type="button" className="btn btn-primary ms-1" onClick={handleBorrow}>
                                Borrow
                            </button>
                        </div>
                        <div className="form-group d-flex mt-2">
                            <label htmlFor="repayAmount">Repay Amount:</label>
                            <input
                                type="number"
                                id="repayAmount"
                                className="form-control"
                                value={repayAmount}
                                onChange={handleRepayChange}
                            />
                            <button type="button" className="btn btn-primary ms-1" onClick={handleRepay}>
                                Repay
                            </button>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoanSharkModal;