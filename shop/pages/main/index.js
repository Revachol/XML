import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";


export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    getData() {
        return [
            {
                id: 1,
                src: "../../static/img/1.png",
                title: "League of Legends",
                text: "150тыс. зрителей"
            },
            {
                id: 2,
                src: "../../static/img/2.png",
                title: "Dota 2",
                text: "150тыс. зрителей"
            },
            {
                id: 3,
                src: "../../static/img/3.png",
                title: "Counter Strike 2",
                text: "150тыс. зрителей"
            },
            {
                id: 4,
                src: "../../static/img/4.png",
                title: "GTA 5",
                text: "150тыс. зрителей"
            },
            {
                id: 5,
                src: "../../static/img/5.png",
                title: "Just Chatting",
                text: "150тыс. зрителей"
            },
            {
                id: 6,
                src: "../../static/img/6.png",
                title: "Warzone",
                text: "150тыс. зрителей"
            },
            {
                id: 7,
                src: "../../static/img/7.png",
                title: "Valorant",
                text: "150тыс. зрителей"
            },
            {
                id: 8,
                src: "../../static/img/8.png",
                title: "Expedition 33",
                text: "150тыс. зрителей"
            },
            {
                id: 9,
                src: "../../static/img/8.png",
                title: "Expedition 33",
                text: "150тыс. зрителей"
            },
        ]
    }

    get pageRoot() {
        return document.getElementById('main-page')
    }

    getHTML() {
        return (
            `
            <div id="main-page" class="container d-flex row" style="max-width: 100%;">
                <div class="g-3 justify-content-between d-flex"></div>
            </div>
            <nav aria-label="Page navigation example" class="mt-2" style="padding-left: 140px;">
                <ul class="pagination">
                    <li class="page-item">
                        <a class="page-link custom-bg-card" style="color: #9147FF;"
                            href="?page={{ page_obj.previous_page_number }}">Previous</a>
                    </li>
                    <li class="page-item">
                        <a class="page-link custom-bg-card" style="color: #9147FF;" href="#">1</a>
                    </li>
                    <li class="page-item">
                        <a class="page-link custom-bg-card" style="color: #9147FF;" href="#">2</a>
                    </li>
                    <li class="page-item">
                        <a class="page-link custom-bg-card" style="color: #9147FF;" href="#">3</a>
                    </li>
                    <li class="page-item">
                        <a class="page-link custom-bg-card" style="color: #9147FF;"
                            href="?page={{ page_obj.next_page_number }}">Next</a>
                    </li>
                </ul>
            </nav>
            `
        )
    }

    clickCard(id) {
        // Обновляем URL с помощью history.pushState
        const newUrl = `${window.location.origin}/product?id=${id}`;
        window.history.pushState({ path: newUrl }, '', newUrl);

        // Переход на страницу продукта
        const productPage = new ProductPage(this.parent, id);
        productPage.render();
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        const data = this.getData()
        data.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot)
            productCard.render(item, this.clickCard.bind(this))
        })
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                document.querySelectorAll('#main-page .col-md-3').forEach(col => {
                    const titleEl = col.querySelector('.card-title');
                    if (titleEl && titleEl.textContent.toLowerCase().includes(searchTerm)) {
                        col.style.display = '';
                    } else {
                        col.style.display = 'none';
                    }
                });
            });
        }
    }
}