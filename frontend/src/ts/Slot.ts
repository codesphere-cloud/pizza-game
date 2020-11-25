import {Reel} from "./Reel";
import {Symbol} from "./Symbol";
import {WinnerForm} from "./WinnerForm";

export class Slot {
    private readonly container: HTMLElement;
    private readonly reels: Reel[];
    private readonly spinButton: HTMLButtonElement;
    private readonly autoPlayCheckbox: HTMLInputElement;
    private readonly winnerForm: WinnerForm;
    private currentSymbols: string[][];
    private nextSymbols: string[][];

    constructor(domElement: HTMLElement, config: { inverted: boolean } = {inverted: false}, winnerForm: WinnerForm) {
        this.currentSymbols = [
            ["pizza", "pizza", "pizza"],
            ["pizza", "pizza", "pizza"],
            ["pizza", "pizza", "pizza"],
        ];

        this.nextSymbols = [
            ["cake", "cake", "cake"],
            ["cake", "cake", "cake"],
            ["cake", "cake", "cake"],
        ];

        this.container = domElement;
        this.winnerForm = winnerForm;

        this.reels = Array.from(this.container.getElementsByClassName("reel")).map(
            (reelContainer, idx) =>
                new Reel(reelContainer, idx, this.currentSymbols[idx])
        );

        this.spinButton = document.getElementById("spin")! as HTMLButtonElement;
        this.spinButton.addEventListener("click", () => this.spin());

        this.autoPlayCheckbox = document.getElementById("autoplay")! as HTMLInputElement;

        if (config.inverted) {
            this.container.classList.add("inverted");
        }
    }

    public spin(): Promise<number | void | undefined> {
        this.onSpinStart();

        this.currentSymbols = this.nextSymbols;
        this.nextSymbols = [
            [Symbol.random(), Symbol.random(), Symbol.random()],
            [Symbol.random(), Symbol.random(), Symbol.random()],
            [Symbol.random(), Symbol.random(), Symbol.random()],
        ];

        return Promise.all(
            this.reels.map((reel: Reel) => {
                reel.renderSymbols(this.nextSymbols[reel.getIdx()]);
                return reel.spin();
            })
        ).then(() => this.onSpinEnd());
    }

    public onSpinStart(): void {
        this.spinButton.disabled = true;

        console.log("SPIN START");
    }

    public onSpinEnd(): void {
        this.spinButton.disabled = false;

        console.log("SPIN END");

        if (this.isWinning(this.nextSymbols)) {
            this.autoPlayCheckbox.checked = false;
            console.log("YOU WON!!!");
            window.setTimeout(async () => {
                const giftCode = await fetch('/backend/gift-code', {
                    method: 'GET',
                });
                this.winnerForm.show(await giftCode.text());
            }, 500);
        }

        if (this.autoPlayCheckbox.checked) {
            window.setTimeout(() => this.spin(), 200);
        }
    }

    private isWinning(symbols: string[][]): boolean {
        for (let row = 0; row < 3; row++) {
            let rowWinning = true;
            for (let col = 1; col < 3; col++) {
                rowWinning = rowWinning && (symbols[col - 1][row] === symbols[col][row]);
            }
            if (rowWinning) {
                return true;
            }
        }

        return false;
    }
}