import { CandyCollection } from '../classes/Candy';
import Player from '../classes/Player';

interface Props {
    player: Player;
    candyCollection: CandyCollection;
    onBuy: (player: Player) => void;
}

function BlackMarktComponent({ player, candyCollection, onBuy }: Props) {
    return (
        <>
            <div>Schwarzmarkt: {player.currentCity.name}</div>
            <ul className="list-group">
                {candyCollection.getCandies.map((candy, index) => (
                    <li className="list-group-item d-flex justify-content-between" key={index}>
                        <div className="d-flex">
                            <button type="button" className="btn btn-danger btn-sm"
                            onClick={() => {
                                const updatedPlayer = player.sellCandy(candy, 1);
                                onBuy(updatedPlayer);
                            }}
                            >-</button>
                            <button
                                type="button"
                                className="btn btn-primary btn-sm mx-1"
                                onClick={() => {
                                    const updatedPlayer = player.buyCandy(candy, 1);
                                    onBuy(updatedPlayer);
                                }}
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
