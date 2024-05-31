import Player from "../classes/Player"

interface PlayerProps{
    player: Player
}

function PlayerComponent({player}:PlayerProps){
    console.log(player.name)
    console.log(player.getInventory())
    return (
        <>
        <div>Your Cash: {player.money}$</div>
           <ul className="list-group">
           {player.getInventory().map(({candy,amount},index) =>
                    <li className="list-group-item d-flex justify-content-between" key={index}>
                        <div className="d-flex ">
                            <p className="m-0">{candy.name}</p>
                        </div>
                        <div className="">
                            <p className="m-0">{amount} </p>
                        </div>
                    </li>
                )}
            </ul>
        </>
    )
}

export default PlayerComponent