import React, { useState } from 'react';
import Player from '../classes/Player';

interface BankModalProps {
    player: Player;
    onClose: () => void;
    onDeposit: (amount: number) => void;
    onWithdraw: (amount: number) => void;
}

const BankModal: React.FC<BankModalProps> = ({ player, onClose, onDeposit, onWithdraw }) => {
    const [depositAmount, setDepositAmount] = useState<string>('');
    const [withdrawAmount, setWithdrawAmount] = useState<string>('');

    const handleDeposit = () => {
        const numericAmount = Number(depositAmount);
        if (!isNaN(numericAmount) && numericAmount > 0) {
            onDeposit(numericAmount);
            onClose();
        } else {
            alert("Invalid deposit amount.");
        }
    };

    const handleWithdraw = () => {
        const numericAmount = Number(withdrawAmount);
        if (!isNaN(numericAmount) && numericAmount > 0 && player.getBankBalance() >= numericAmount){
            onWithdraw(numericAmount);
            onClose();
        } else {
            alert("Invalid withdrawal amount.");
        }
    };

    const handleDepositChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDepositAmount(e.target.value);
    };

    const handleWithdrawChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWithdrawAmount(e.target.value);
    };

    return (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)",color:"black" }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Bank</h5>
                        <button type="button" className="close" onClick={onClose}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>Current Balance: {player.getBankBalance()}$</p>
                        <p>Cash on Hand: {player.money}$</p>
                        <div className="form-group d-flex">
                            <label htmlFor="depositAmount">Deposit Amount:</label>
                            <input
                                type="number"
                                id="depositAmount"
                                className="form-control"
                                value={depositAmount}
                                onChange={handleDepositChange}
                                
                            />
                            <button type="button" className="btn btn-primary ms-1" onClick={handleDeposit}>
                            Deposit
                        </button>
                        </div>
                        <div className="form-group d-flex mt-2">
                            <label htmlFor="withdrawAmount">Withdraw Amount:</label>
                            <input
                                type="number"
                                id="withdrawAmount"
                                className="form-control"
                                value={withdrawAmount}
                                onChange={handleWithdrawChange}
                            />
                               
                        <button type="button" className="btn btn-primary ms-1" onClick={handleWithdraw}>
                            Withdraw
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

export default BankModal;
