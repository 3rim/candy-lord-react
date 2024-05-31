import { City } from "../classes/City";

//const dummyCities = ["Hamburg", "Berlin", "Paris", "Frankfurt"];

interface TravelProps {
    playerLocation: City
    cities: City[];
    onTravel: (destination:City) => void;
}

function TravelComponent({  playerLocation, cities, onTravel }: TravelProps) {
    const travelPriceList = City.getTravelPriceList(playerLocation);
    const handleTravel = (destination: City) => {
        onTravel(destination);
    };
    return (
        <>
            <div>Travel</div>
            <ul className="list-group">
                {cities.map((city, index) => (
                    <li className="list-group-item d-flex justify-content-between" key={index}>
                        <div className="me-auto">
                            {city.name}
                        </div>
                        <div className="d-flex me-3">
                            {travelPriceList.get(city)}$
                        </div>
                        <button
                            type="button"
                            className="btn btn-primary btn-sm"
                            onClick={()=>handleTravel(city)}
                        >
                            Travel
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default TravelComponent;
