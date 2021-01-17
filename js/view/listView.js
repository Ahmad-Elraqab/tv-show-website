import View from "./view.js"
import deleteIcon from "/image/delete.png";


class ListView extends View {

    _parentElement;
    _data;

    render(data) {

        // Need to refactor this function.

        // console.log(data);
        // this._clear();
        document.querySelector('.bookmark .myFavourite').innerHTML = '';
        document.querySelector('.bookmark .myWatchLater').innerHTML = '';
        document.querySelector('.bookmark .myList').innerHTML = '';


        data.myFavourite.forEach((element) => {

            this._data = element;

            // console.log(element);

            this._parentElement = document.querySelector('.bookmark .myFavourite');

            const markup = this._generateListMarkup();

            this._parentElement.insertAdjacentHTML('beforeend', markup);
        });

        data.myWatchLater.forEach((element) => {

            this._data = element;

            // console.log(element);

            this._parentElement = document.querySelector('.bookmark .myWatchLater');

            const markup = this._generateListMarkup();

            this._parentElement.insertAdjacentHTML('beforeend', markup);
        });

        data.myList.forEach((element) => {

            this._data = element;

            // console.log(element);

            this._parentElement = document.querySelector('.bookmark .myList');

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

    addHandlerRemoveFromList(handler) {


        document.querySelector('.bookmark').addEventListener("click", function (e) {

            const data = e.target.closest(".delete");

            if (data != null) {

                console.log(e.target.parentNode.parentNode.className);
                // console.log(e.target.classList[1]);
                handler(e.target.parentNode.parentNode.className, data.dataset.id);
            }

        })


    }

}

export default new ListView();