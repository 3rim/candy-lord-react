import Player from "../classes/Player"

interface PlayerProps {
    player: Player
}

function PlayerComponent({ player }: PlayerProps) {
    return (
        <>
            <div className="fs-5">Inventory</div>
            <ul className="list-group">
                {player.getInventory().map(({ candy, amount }, index) =>
                    <li className="list-group-item d-flex justify-content-between custom-bg-secondary custom-text-white" key={index}>
                        <div className="d-flex align-items-center">
                            <p className="m-0 ">{candy.name}</p>
                        </div>
                        <div className="">
                            <p className="m-0">{amount} </p>
                        </div>
                    </li>
                )}
            </ul>
            <div className="fs-6">
                <p className="m-0 text-al">Your Cash: {player.money}$</p>
                <p>Currenty holds: {player.getTotalCandyAmount()} / {player.maxCandyCapacity}</p>
            </div>
        </>
    )
}

export default PlayerComponent