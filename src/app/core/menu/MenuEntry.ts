export class MenuEntry {
    name: string;
    url: string;
    icon: string;
    isVisible: boolean;

    constructor(name: string, url: string,  icon: string, isVisible: boolean = true) {
        this.name = name;
        this.url = url;
        this.icon = icon;
        this.isVisible = isVisible;
    }
}
