import { CandyCollection,Candy } from '../classes/Candy';
import Player from '../classes/Player';

interface Props {
    player: Player;
    candyCollection: CandyCollection;
    onBuy: (player: Player) => void;
}

function BlackMarktComponent({ player, candyCollection, onBuy }: Props) {
    const canBuy = (candy: Candy) => {
        return player.money >= candy.price && player.getTotalCandyAmount() < player.maxCandyCapacity;
    };

    const canSell = (candy: Candy) => {
        return player.getCandyAmount(candy) > 0;
    };

    const handleBuy = (candy: Candy) => {
        if (canBuy(candy)) {
            const updatedPlayer = player.buyCandy(candy, 1);
            onBuy(updatedPlayer);
        } else {
            console.log("Not enough money to buy " + candy.name);
        }
    };

    const handleSell = (candy: Candy) => {
        if (canSell(candy)) {
            const updatedPlayer = player.sellCandy(candy, 1);
            onBuy(updatedPlayer);
        } else {
            console.log("No " + candy.name + " to sell");
        }
    };

    return (
        <>
            <div className='fs-5'>Black market: {player.currentCity.name}</div>
            <ul className="list-group">
                {candyCollection.getCandies.map((candy, index) => (
                    <li className="list-group-item d-flex justify-content-between custom-bg-secondary custom-text-white" key={index}>
                        <div className="d-flex align-items-center">
                            <button type="button" className="btn custom-btn-primary btn-sm"
                                onClick={() => handleSell(candy)}
                                disabled={!canSell(candy)}
                            >-</button>
                            <button
                                type="button"
                                className="btn custom-btn-secondary btn-sm mx-1"
                                onClick={() => handleBuy(candy)}
                                disabled={!canBuy(candy)}
                                
                            >
                                +
                            </button>
                            <p className="m-0">{candy.name}</p>
                        </div>
                        <div>
                            <p className="m-0">{candy.price} $</p>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default BlackMarktComponent;
