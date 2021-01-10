import exit from '/image/exit.png';


export default class View {


    render(data) {


        this._data = data;
        this._clear();
        this._data.map((element) => {

            const markup = this._generateMarkup(element);
            // this._clear();
            this._parentElement.insertAdjacentHTML('beforeend', markup);

        })


    }

    _clear() {
        this._parentElement.innerHTML = '';
    }

    addHandlerCardView(handler) {

        this._parentElement.addEventListener('click', function (element) {
            const btn = element.target;

            // console.log(element.target.className);

            if (btn.className == "main-img") {

                handler(btn.parentNode.dataset.id);
            }
        })

    }

    viewDetailsCard(data) {

        document.querySelector('.card-view').innerHTML = '';
        console.log(data);
        const markup = this._generateCardMarkup(data);
        // this._clear();
        document.querySelector('.card-view').insertAdjacentHTML('afterbegin', markup);

    }

    addHandlerRemoveCardView(handler) {

        document.querySelector('.card-view').addEventListener('click', function (element) {
            const btn = element.target.closest('.exit');
            handler();

        })
    }

    removeDetailsCard() {
        document.querySelector('.card-view').innerHTML = '';

    }
    _generateCardMarkup(data) {

        return `
        <div class="left-container">
            <img class="movie" src="${data.image.original}" alt="">
            <img class="exit" src="${exit}" alt="">

        </div>

        <div class="right-container">

            <h1>${data.name}</h1>
            <div class="divider-h"></div>
            <div class="info-flexbox">

                <div class="div-top">
                    <h1>Release date: </h1><p>${data.premiered}</p>
                    <h1>type / language: </h1><p>${data.type} / ${data.language}</p>

                    
                    <h1>Days: </h1><p>${data.genres.map((e) => e).join(', ')}</p>


                    </div>
                    <div class="div-top">
                    <h1>Genres: </h1><p>${data.genres.map((e) => e).join(', ')}</p>
                    <h1>Synopsis:</h1>
                    <div class="text"><p>${data.summary}.</p></div>

                    <button class="btn"> See More</button>
                </div>
            </div>
            <div class="divider-h"></div>
            <div class="info-flexbox">
                <div class="div-bottom">
                    <h1>7/10</h1>
                    <h1>Rating by IMDb</h1>
                </div>
                <div class="divider-v"></div>
                <div class="div-bottom">
                    <h1>67%</h1>
                    <h1>MetaCrittic</h1>
                </div>
                <div class="divider-v"></div>
                <div class="div-bottom">
                    <h1>*****</h1>
                    <h1>From blu users</h1>
                </div>
            </div>
        </div>
        `

    }

    showCard() {
        document.querySelector('.card-view').classList.remove('animate-card-reverse');
        document.querySelector('.right-container').classList.remove('animate-card-content-reverse');
        document.querySelector('.card-view').classList.add('animate-card');
        document.querySelector('.right-container').classList.add('animate-card-content');

    }
    hideCard() {
        document.querySelector('.right-container').classList.remove('animate-card-content');
        document.querySelector('.right-container').classList.add('animate-card-content-reverse');
        setTimeout(() => {

            document.querySelector('.card-view').classList.remove('animate-card');
            document.querySelector('.card-view').classList.add('animate-card-reverse');
        }, 700)


    }


    addHandlerHoverCardView(handler) {

        var card;
        // parent element is movie-list

        this._parentElement.addEventListener("mouseover", function (e) {
            // console.log(e);

            card = e.target.closest(".card");

            if (card != null) {
                handler(card, 'show');
                console.log("Card is hovered");

            }


        })

        this._parentElement.addEventListener('mouseout', function (e) {


            try {
                const data = e.target.closest('.card');
                const className = data.children[0].className.split(" ");

                // console.log(className[0]);
                if (className[0] != "hover-div" && data != null) {

                    console.log("out card but inside bottom card");
                    handler(data, 'hide');

                }

            } catch (error) {

                console.log("data is null");
                // handler(card, 'hide');
            }

        })

    }

}


// Archive.


        // showBottomCard(card) {

        //     try {

        //         card.children[0].classList.remove('animate-div-reverse');
        //         card.children[0].classList.add('animate-div');
        //         card.children[0].classList.add('not-hover');
        //         card.children[0].children[0].classList.remove('animate-content-div-reverse');

        //         setTimeout(() => {

        //             card.children[0].children[0].classList.add('animate-content-div');

        //         }, 150)
        //     } catch (error) {
        //         console.log("Null Element!");
        //     }

        // }
        // hideBottomCard(card) {

        //     try {

        //         card.children[0].children[0].classList.remove('animate-content-div');
        //         card.children[0].children[0].classList.add('animate-content-div-reverse');

        //         card.children[0].classList.remove('animate-div');
        //         card.children[0].classList.add('animate-div-reverse');
        //     } catch (error) {
        //         console.log("Null Element!");
        //     }

        // }
