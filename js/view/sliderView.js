import View from './view';

class SliderView extends View {

    _parentElement = document.querySelectorAll('.slider-box');
    _data;


    _generateMarkup(element) {

        return `                
        <div class="movie-details"><div class="card" data-id="${element.id}"><img class="main-img" src="${element.image.medium}" alt=""></div></div>

        `;


    }





}


export default new SliderView();