import View from './view';

class SliderView extends View {

    _parentElement = document.querySelector('.slider-box');
    _data;


    _generateMarkup(element) {

        return `                
        <div class="movie-details"><div class="card" data-id="${element.id}"><img src="${element.image.medium}" alt=""></div></div>

        `;


    }





}


export default new SliderView();