import View from './view';
// import icons from 'url:../../img/icons.svg';
import rightArrow from '/image/right-arrow.png';
import leftArrow from '/image/left-arrow.png';



class PaginationView extends View {

    _parentElement = document.querySelector('.slider-box');
    _GridParentElement = document.querySelector('.btn-discover');
    _curPage;
    _data;

    _generateMarkup(data) {
        // console.log(this._data);
        const numPages = Math.ceil(this._data.TvShows.length / this._data.pagination.resultsPerPage);
        this._curPage = this._data.pagination.page;

        // console.log(this._curPage);
        // console.log(numPages);

        if (this._curPage === 1 && numPages > 1) {

            return this._generateMarkupNextButton();
        }

        if (this._curPage === numPages && numPages > 1) {

            return this._generateMarkupBackButton();
        }

        if (this._curPage < numPages) {

            return this._generateMarkupBackButton() + this._generateMarkupNextButton();
        }


    }

    render(data) {

        this._data = data;
        const markup = this._generateMarkup();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);

    }
    addHandlerClick(handler) {

        this._parentElement.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn-spec');
            // console.log(btn);

            if (!btn) return;
            const goToPage = +btn.dataset.goto;
            console.log(goToPage);
            handler(goToPage, 'slider');
        })
    }

    addHandlerGridClick(handler) {

        this._GridParentElement.addEventListener('click', function (e) {
            const btn = e.target.closest('.see-more-btn');
            console.log(btn);

            if (!btn) return;
            const goToPage = +btn.dataset.goto;
            console.log(goToPage);
            handler(goToPage, 'grid');
        })

    }
    renderGridView(data) {

        this._GridParentElement.innerHTML = '';
        this._GridParentElement.insertAdjacentHTML('beforeend', `<button data-goto="${data.pagination.pageGrid + 1}" class="see-more-btn">Discover More</button>`);

    }
    _generateMarkupNextButton() {
        return `    
        
        <div class="right-btn btn-spec" data-goto="${this._curPage + 1}"><img src="${rightArrow}" alt=""></div>
`
    }
    _generateMarkupBackButton() {
        return `
        <div class="left-btn btn-spec" data-goto="${this._curPage - 1}"><img src="${leftArrow}" alt=""></div>
        `
    }



}



export default new PaginationView();