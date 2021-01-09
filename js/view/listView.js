import View from "./view.js"
import deleteIcon from "/image/delete.png";


class ListView extends View {

    _parentElement;
    _data;

    render(data) {

        this._data = data;
        // console.log(data);
        this._parentElement = document.querySelector(this._data.parentE);

        const markup = this._generateListMarkup();

        this._parentElement.insertAdjacentHTML('beforeend', markup);
    }


    _generateListMarkup() {

        return `

        <div class="row">
        <img src="${this._data.image.original}" alt="">
        <div>
            <h2>${this._data.name}</h2>
            <h2>${this._data.premiered}</h2>

        </div>
        <img src="${deleteIcon}" data-id="${this._data.id}" alt="" class="delete">
        </div>
        `;

    }


}

export default new ListView();