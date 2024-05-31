class Candy {
    name: string;
    minPrice: number;
    maxPrice: number;
    price: number;

    constructor(name: string, minPrice: number, maxPrice: number) {
        this.name = name;
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
        this.price = this.getRandomPrice();
    }

    private getRandomPrice(): number {
        return parseFloat((Math.random() * (this.maxPrice - this.minPrice) + this.minPrice).toFixed(0));
    }

    updatePrice(): void {
        this.price = this.getRandomPrice();
    }
}

class CandyCollection {
    candies: Array<Candy>;

    constructor() {
        this.candies = [
            new Candy("Snickers", 400, 800),
            new Candy("Bueno", 295, 370),
            new Candy("KitKat", 168, 290),
            new Candy("Twix", 91, 168),
            new Candy("Haribo", 51, 90),
            new Candy("M&M's", 26, 50),
            new Candy("Milky Way", 11, 25),
            new Candy("Reeses", 1, 10)
        ];
    }

    get getCandies(): Array<Candy> {
        return this.candies;
    }

    updatePrices(): void {
        this.candies.forEach(candy => candy.updatePrice());
    }
}

export { Candy, CandyCollection };
