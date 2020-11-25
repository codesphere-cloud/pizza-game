import {Reply} from "pizza-game-backend/lib/helpers/Reply";

export class WinnerForm {
    private readonly element: Element;

    constructor(domElement: Element) {
        this.element = domElement
    }

    public async show(): Promise<void> {
        const giftCode = Reply.createFromSerializedReply(
            await (
                await fetch('backend/gift-code', {
                    method: 'GET',
                })
            ).json()
        ).logIfError().getValue();

        this.element.querySelector(".gift-code")!.innerHTML = `Your gift code: ${giftCode}`;
        this.element.classList.remove("hidden");
    }
}