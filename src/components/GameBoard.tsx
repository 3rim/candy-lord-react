import { useState } from 'react';
import TravelComponent from '../components/TravelComponent';
import BlackMarktComponent from './BlackMarkt';
import PlayerComponent from './PlayerComponent';
import Player from '../classes/Player';
import { CandyCollection } from '../classes/Candy';
import { City } from '../classes/City';

const candies = new CandyCollection();
const cities = City.getAllCities();
const initCity = cities[0];

function GameBoard() {
    const initialPlayer = new Player("Erim", 500, candies.getCandies.map(candy => ({
        candy: candy,
        amount: 0
    })), initCity);
    const [player, setPlayer] = useState(initialPlayer);

    const handleTravel = (destination: City) => {
        const travelCost = City.getTravelPriceList(player.currentCity).get(destination);
        console.log(travelCost);
        if (player.money >= travelCost) {
            candies.updatePrices();
            const updatedPlayer = player.travelToCity(destination, travelCost);
            setPlayer(updatedPlayer);
        } else {
            // Display a message to the user indicating insufficient funds
            console.log("Insufficient funds to travel.");
        }
    };

    return (
        <>
            <div className="row text-center">
                <div className="col bg-info-subtle p-2">
                    <div>Stats</div>
                    <PlayerComponent player={player} />
                </div>
                <div className="col bg-warning-subtle p-2">
                    <BlackMarktComponent player={player} candyCollection={candies} onBuy={setPlayer} />
                </div>
                <div className="col bg-success p-2">
                    <TravelComponent playerLocation={player.currentCity} cities={cities} onTravel={handleTravel} />
                </div>
            </div>
        </>
    );
}

export default GameBoard;
