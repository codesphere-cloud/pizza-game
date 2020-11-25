export class WinnerForm {
    private readonly element: Element;

    constructor(domElement: Element) {
        this.element = domElement
    }

    public show(giftCode: string) {
        this.element.querySelector(".gift-code")!.innerHTML = `Your gift code: ${giftCode}`
        this.element.classList.remove("hidden");
    }
}