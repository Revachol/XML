import { ProductComponent } from "../../components/product/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent
        this.id = id
    }

    getData() {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id') || 1; // Если id не указан, используем значение по умолчанию
        const titles = {
            1: "League of Legends",
            2: "Dota 2",
            3: "Counter Strike 2",
            4: "GTA 5",
            5: "Just Chatting",
            6: "Warzone",
            7: "Valorant",
            8: "Expedition 33"
        };
        return {
            id: id,
            src: `../../static/img/${id}.png`,
            title: titles[id] || `${id}`,
            text: "150тыс. зрителей"
        }
    }

    get pageRoot() {
        return document.getElementById('product-page')
    }

    getHTML() {
        return (
            `
                <div id="product-page"></div>
            `
        )
    }

    clickBack() {
        const mainPage = new MainPage(this.parent)
        mainPage.render()
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        const data = this.getData()
        const stock = new ProductComponent(this.pageRoot)
        stock.render(data)

        const titleElement = document.createElement('h1');
        titleElement.textContent = data.title;
        titleElement.style.color = 'white';
        titleElement.style.textAlign = 'center';
        this.pageRoot.insertAdjacentElement('afterbegin', titleElement);

        const pagination = document.querySelector('.pagination');
        if (pagination) {
            pagination.remove();
        }
    }

}