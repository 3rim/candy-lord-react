import { useState } from 'react';
import TravelComponent from '../components/TravelComponent';
import BlackMarktComponent from './BlackMarkt';
import PlayerComponent from './PlayerComponent';
import Player from '../classes/Player';
import { CandyCollection } from '../classes/Candy';
import { City } from '../classes/City';
import BankModal from '../components/BankModal';

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

    return (
        <>
            <div className="row text-center">
                <div className="col bg-info-subtle p-2">
                    <PlayerComponent player={player} />
                </div>
                <div className="col bg-warning-subtle p-2">
                    <BlackMarktComponent player={player} candyCollection={candies} onBuy={setPlayer} />
                </div>
                <div className="col bg-success p-2">
                    <TravelComponent playerLocation={player.currentCity} cities={cities} onTravel={handleTravel} />
                </div>
            </div>
            <div className='row'>
                <div className='col-8 bg-danger'>
                    <div>Current Date: {player.getCurrentDate()}</div>
                </div>
                <div className='col bg-danger-subtle p-2 flex-wrap '>
                    <div className='mb-1'>
                        <button className='btn btn-info' onClick={() => setShowBankModal(true)}>Visit Bank</button>
                        <span> Deposit: {player.getBankBalance()}$</span>
                    </div>
                    <div className=''>
                        <button className='btn btn-info'>Visit Loanshark</button>
                        <span> Dept:</span> <span> Payback time:</span>
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
        </>
    );
}

export default GameBoard;
