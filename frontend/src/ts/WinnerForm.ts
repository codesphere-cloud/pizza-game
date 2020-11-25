export class WinnerForm {
    private readonly element: Element;

    constructor(domElement: Element) {
        this.element = domElement
    }

    public async show(): Promise<void> {
        const giftCode = await fetch('backend/gift-code', {
            method: 'GET',
        });
        this.element.querySelector(".gift-code")!.innerHTML = `Your gift code: ${await giftCode.text()}`
        this.element.classList.remove("hidden");
    }
}