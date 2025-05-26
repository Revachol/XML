export class ProductComponent {
    constructor(parent) {
        this.parent = parent
    }
    //285 × 380
    getHTML(data) {
        return (
            `
            <div class="card mb-3" style="background-color: #0e0e10; width: 500px; height: 400px; cursor: pointer;" id="click-card-${data.id}" data-id="${data.id}">
                <img src="${data.src}" class="card-img-top img-fluid" alt="картинка" style="width: 193px; height: 258px; object-fit: cover;">
                <div class="card-body text-light">
                    <h5 class="card-title">${data.title}</h5>
                    <p class="card-text">${data.text}</p>
                </div>
            </div>
            `
        )
    }

    render(data) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
    }
}