export class City {
    private static readonly BERLIN = new City("Berlin", 2, 52.516, 13.400); // 52° 31′ N, 13° 24′ O
    private static readonly HAMBURG = new City("Hamburg", 2, 53.550, 10.000); // 53° 33′ N, 10° 0′ O
    private static readonly UELZEN = new City("Uelzen", 2, 52.967, 10.567); // 52° 58′ N, 10° 34′ O
    private static readonly FRANKFURT = new City("Frankfurt", 2, 50.117, 8.683); // 50° 7′ N, 8° 41′ O
    private static readonly KREFELD = new City("Krefeld", 2, 51.317, 6.217); // 51° 19' N, 6° 13' O
    private static readonly HOCKENHEIM = new City("Hockenheim", 2, 49.317, 8.533); // 49° 19' N, 8° 32' O
    private static readonly DORTMUND = new City("Dortmund", 2, 51.500, 7.450); // 51° 30′ N, 7° 27′ O
 
 
 
    // private to disallow creating other instances of this type
    private constructor(
        public readonly name: string,
        public readonly priceFactor: number,
        public readonly latitude: number,
        public readonly longitude: number,
    ) {
 
    }
 
    static getAllCities(): City[] {
        return [City.BERLIN,
        City.HAMBURG,
        City.UELZEN,
        City.FRANKFURT,
        City.KREFELD,
        City.HOCKENHEIM,
        City.DORTMUND
        ];
    }
    static getTravelPriceList(city: City): Map<City, number> {
        const travelPriceList: Map<City, number> = new Map<City, number>();
        City.getAllCities().forEach((cityToTravelTo) => {
            travelPriceList.set(cityToTravelTo, City.generateTravelPrice(city, cityToTravelTo));
        });
        return travelPriceList;
    }
 
    private static generateTravelPrice(startingCity: City, cityToTravelTo: City): number {   
        const distance = City.haversineDistance(startingCity, cityToTravelTo);
        return Math.round(distance); //preisfaktor
    }
 
    private static haversineDistance(city1: City, city2: City): number {
 
 
        const toRadians = (degree: number): number => degree * (Math.PI / 180);
 
        const R = 6371; // Radius der Erde in Kilometern
        const dLat = toRadians(city2.latitude - city1.latitude);
        const dLon = toRadians(city2.longitude - city1.longitude);
        const lat1 = toRadians(city1.latitude);
        const lat2 = toRadians(city2.latitude);
 
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
 
        return R * c;
    }
 
}