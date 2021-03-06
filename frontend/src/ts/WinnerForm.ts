export class WinnerForm {
    private readonly element: Element;

    constructor(domElement: Element) {
        this.element = domElement
    }

    public async show(): Promise<void> {

        const giftCode = await (await fetch('backend/gift-code', {method: 'GET',})).text();

        this.element.querySelector(".gift-code")!.innerHTML = `Your gift code: ${giftCode}`;
        this.element.classList.remove("hidden");
    }
}