import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    getData() {
        ajax.get(stockUrls.getStocks(), (data) => {
            this.renderData(data);
        })
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

    clickCard(cardId) {
        const productPage = new ProductPage(this.parent, cardId)
        productPage.render()
    }

    renderData(items) {
        items.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot)
            productCard.render(item, this.clickCard.bind(this))
        })
    }

    render() {
        this.parent.innerHTML = ''
        this.parent.insertAdjacentHTML('beforeend', this.getHTML())
        this.getData()
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