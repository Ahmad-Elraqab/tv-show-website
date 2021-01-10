import View from "./view.js"
import deleteIcon from "/image/delete.png";


class ListView extends View {

    _parentElement;
    _data;

    render(data) {

        console.log(data);
        // this._clear();
        document.querySelector('.favourite').innerHTML = '';
        document.querySelector('.watch-later').innerHTML = '';
        document.querySelector('.finished').innerHTML = '';

        data.favourite.forEach((element) => {

            this._data = element;

            // console.log(element);

            this._parentElement = document.querySelector(this._data.parentE);

            const markup = this._generateListMarkup();

            this._parentElement.insertAdjacentHTML('beforeend', markup);
        });

        data.watchLater.forEach((element) => {

            this._data = element;

            // console.log(element);

            this._parentElement = document.querySelector(this._data.parentE);

            const markup = this._generateListMarkup();

            this._parentElement.insertAdjacentHTML('beforeend', markup);
        });

        data.finished.forEach((element) => {

            this._data = element;

            // console.log(element);

            this._parentElement = document.querySelector(this._data.parentE);

            const markup = this._generateListMarkup();

            this._parentElement.insertAdjacentHTML('beforeend', markup);
        });

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

    addHandlerAddList(handler) {


        document.querySelector('.movie-list').addEventListener("click", function (e) {

            const data = e.target.closest(".sub-img");

            if (data != null) {

                // console.log(e.target.classList[1]);
                handler(e.target.classList[1], e.target.closest(".card").dataset.id);
            }

        })

    }

}

export default new ListView();