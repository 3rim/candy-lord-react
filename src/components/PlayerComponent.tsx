import Player from "../classes/Player"

interface PlayerProps {
    player: Player
}

function PlayerComponent({ player }: PlayerProps) {
    return (
        <>
            <div>Inventory</div>
            <ul className="list-group">
                {player.getInventory().map(({ candy, amount }, index) =>
                    <li className="list-group-item d-flex justify-content-between " key={index}>
                        <div className="d-flex align-items-center">
                            <p className="m-0 ">{candy.name}</p>
                        </div>
                        <div className="">
                            <p className="m-0">{amount} </p>
                        </div>
                    </li>
                )}
            </ul>
            <div>
                <p>Your Cash: {player.money}$</p>
            </div>
        </>
    )
}

export default PlayerComponent