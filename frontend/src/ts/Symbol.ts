import cake from '../assets/symbols/cake.svg';
import hamburger from '../assets/symbols/hamburger.svg';
import noodleBowl from '../assets/symbols/noodle-bowl.svg';
import pizza from '../assets/symbols/pizza.svg';
import apple from '../assets/symbols/apple.svg';

const symbols: { [name: string]: any } = {
    "cake": cake,
    "hamburger": hamburger,
    "noodle-bowl": noodleBowl,
    "pizza": pizza,
    "apple": apple
};


export class Symbol {
    private static imageCache: { [name: string]: HTMLImageElement } = {};

    private readonly name: string;
    private readonly img: HTMLImageElement;

    public constructor(name = Symbol.random()) {
        this.name = name;

        if (Symbol.imageCache[name]) {
            this.img = Symbol.imageCache[name].cloneNode() as HTMLImageElement;
        } else {
            this.img = new Image();
            this.img.src = symbols[name];

            Symbol.imageCache[name] = this.img;
        }
    }

    public static random(): string {
        return Object.keys(symbols)[Math.floor(Math.random() * Object.keys(symbols).length)];
    }

    public getImg() {
        return this.img;
    }
}
