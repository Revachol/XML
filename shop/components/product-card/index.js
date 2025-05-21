export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    //285 × 380
    getHTML(data) {
        return (
            `
              <div class="col-md-3">
                <div class="card mx-auto custom-bg-main text-light" style="cursor: pointer; width: 193px; position: relative;" id="click-card-${data.id}" data-id="${data.id}">
                    <button class="delete-card" style="position: absolute; top: 5px; right: 5px; background: none; border: none; color: white; font-size: 18px;">&times;</button>
                    <img class="card-img-top mx-auto" src="${data.src}" alt="картинка" style="width: 193px; height: 258px;">
                    <div class="card-body">
                        <h5 class="card-title">${data.title}</h5>
                        <p class="card-text">${data.text}</p>
                    </div>
                </div>
              </div>
            `
        )
    }

    addListeners(data, listener) {
        // Обработчик клика по карточке для перехода
        document
            .getElementById(`click-card-${data.id}`)
            .addEventListener("click", (e) => {
                if (e.target.classList.contains('delete-card')) return;
                e.stopPropagation();
                listener(data.id);
            });
        document
            .getElementById(`click-card-${data.id}`)
            .querySelector('.delete-card')
            .addEventListener("click", (e) => {
                e.stopPropagation();
                const cardContainer = e.target.closest('.col-md-3');
                if (cardContainer) {
                    cardContainer.remove();
                }
            });
    }

    render(data, listener) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(data, listener)
    }
}