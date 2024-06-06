import { useState } from 'react';
import TravelComponent from '../components/TravelComponent';
import BlackMarktComponent from './BlackMarket';
import PlayerComponent from './PlayerComponent';
import Player from '../classes/Player';
import { CandyCollection } from '../classes/Candy';
import { City } from '../classes/City';
import BankModal from '../components/BankModal';
import LoanSharkModal from './LoanSharkModal';

const candies = new CandyCollection();
const cities = City.getAllCities();
const initCity = cities[0];
const initialPlayer = new Player(
    500,
    candies.getCandies.map(candy => ({ candy, amount: 0 })),
    initCity
);

function GameBoard() {
    const [player, setPlayer] = useState(initialPlayer);
    const [showBankModal, setShowBankModal] = useState(false);
    const [showLoanSharkModal, setLoanSharkModal] = useState(false);

    const handleTravel = (destination: City) => {
        if (destination === player.currentCity) {
            return;
        }
        const travelCost = City.getTravelPriceList(player.currentCity).get(destination);
        if (player.money >= travelCost!) {
            candies.updatePrices();
            const updatedPlayer = player.travelToCity(destination, travelCost!);
            setPlayer(updatedPlayer);
        } else {
            console.log("Insufficient funds to travel.");
        }
    };

    const handleDeposit = (amount: number) => {
        const updatedPlayer = player.deposit(amount);
        console.log(updatedPlayer);
        setPlayer(updatedPlayer);
    };

    const handleWithdraw = (amount: number) => {
        const updatedPlayer = player.withdraw(amount);
        setPlayer(updatedPlayer);
    };

    // Callback function to handle borrowing money
    const handleBorrow = (amount:number) => {
        const updatedPlayer = player.borrowFromLoanShark(amount);
        console.log(updatedPlayer);
        setPlayer(updatedPlayer);
    };

    // Callback function to handle repaying money
    const handleRepay = (amount:number) => {
        const updatedPlayer = player.repayLoan(amount);
        console.log(updatedPlayer);
        setPlayer(updatedPlayer);
    };

    return (
        <>
            <div className="row text-center">
                <div className="col custom-bg-primary p-2 " >
                    <PlayerComponent player={player} />
                </div>
                <div className="col custom-bg-primary p-2">
                    <BlackMarktComponent player={player} candyCollection={candies} onBuy={setPlayer} />
                </div>
                <div className="col custom-bg-primary p-2">
                    <TravelComponent player={player} playerLocation={player.currentCity} cities={cities} onTravel={handleTravel} />
                </div>
            </div>
            <div className='row '>
                <div className='col-8 custom-bg-tertiary'>
                    <div className='fs-3'>Current Date: {player.getCurrentDate()}</div>
                </div>
                <div className='col custom-bg-tertiary p-2 flex-wrap '>
                    <div className='mb-1'>
                        <button className='btn ' style={{backgroundColor:"#F2613F"}} onClick={() => setShowBankModal(true)}>Visit Bank</button>
                        <span> Deposit: {player.getBankBalance()}$</span>
                    </div>
                    <div className=''>
                        <button className='btn' style={{backgroundColor:"#F2613F"}} onClick={() => setLoanSharkModal(true)}>Visit Loanshark</button>
                        <div> Dept: {player.loanShark.currentLoanAmount} $</div> <span> Payback time in: {player.loanShark.remainingDays}</span>
                    </div>
                </div>
            </div>

            {showBankModal && (
                <BankModal
                    player={player}
                    onClose={() => setShowBankModal(false)}
                    onDeposit={handleDeposit}
                    onWithdraw={handleWithdraw}
                />
            )}
            {showLoanSharkModal && (
                <LoanSharkModal
                    player={player}
                    onClose={() => setLoanSharkModal(false)}
                    onBorrow={handleBorrow}
                    onRepay={handleRepay}
                />
            )}
        </>
    );
}

export default GameBoard;
