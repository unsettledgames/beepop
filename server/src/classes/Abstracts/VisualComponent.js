export default class VisualComponent {
    constructor() {
        this.htmlElement = null;
        this.displayMode = null;
    }

    show() {
        this.htmlElement.style.display = displayMode;
    }

    hide() {
        this.htmlElement.style.display = "none";
    }
}