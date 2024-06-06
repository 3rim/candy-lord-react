import { City } from "../classes/City";
import Player from "../classes/Player";

interface TravelProps {
    player: Player;
    playerLocation: City;
    cities: City[];
    onTravel: (destination: City) => void;
}

function TravelComponent({ player, playerLocation, cities, onTravel }: TravelProps) {
    const travelPriceList = City.getTravelPriceList(playerLocation);
    const handleTravel = (destination: City) => {
        onTravel(destination);
    };

    return (
        <>
            <div className="fs-5">Travel</div>
            <ul className="list-group">
                {cities.map((city, index) => {
                    const travelCost = travelPriceList.get(city) || 0;
                    const canTravel = player.money >= travelCost;

                    return (
                        <li className="list-group-item d-flex justify-content-between custom-bg-secondary custom-text-white" key={index}>
                            <div className="me-auto">
                                {city.name}
                            </div>
                            <div className="d-flex me-3">
                                {travelCost}$
                            </div>
                            <button
                                type="button"
                                className={`btn btn-primary btn-sm ${!canTravel && 'btn-disabled'}`}
                                onClick={() => handleTravel(city)}
                                disabled={!canTravel || player.currentCity === city}
                            >
                                Travel
                            </button>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}

export default TravelComponent;
