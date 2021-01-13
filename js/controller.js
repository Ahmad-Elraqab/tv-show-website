import * as model from './model.js';
import { async } from 'regenerator-runtime';
import view from './view/view.js'
import sliderView from './view/sliderView.js'
import gridView from './view/gridView.js'
import paginationView from './view/paginationView.js'
import listView from './view/listView.js'


const sliderController = async function () {


    try {
        await model.loadShows();

        sliderView.render(model.getSearchResultsPage(1, 'slider'));

        paginationView.render(model.state);

    } catch (error) {

        console.log(error);
    }


}
const gridController = async function () {


    try {
        await model.loadShows();

        gridView.render(model.getSearchResultsPage(1, 'grid'));

        paginationView.renderGridView(model.state);

    } catch (error) {

        console.log(error);
    }


}

const controlSliderPagination = function (goToPage, type) {

    sliderView.render(model.getSearchResultsPage(goToPage, type));

    paginationView.render(model.state);

}


const controlGridPagination = function (goToPage, type) {

    gridView.render(model.getSearchResultsPage(goToPage, type));

    paginationView.renderGridView(model.state);

}


const cardViewController = function (id) {

    const data = model.state.TvShows.find((e) => e.id == id);

    // console.log(data);

    sliderView.viewDetailsCard(data);
    sliderView.showCard();

}
const removeCardViewController = function () {

    sliderView.hideCard();
    setTimeout(() => {

        sliderView.removeDetailsCard();
    }, 1000)

}


const addToListController = function (type, id) {

    model.changeMovieStatus(type, id);

    gridView.render(model.getSearchResultsPage(model.state.pagination.currGridPage, 'grid'));

    paginationView.renderGridView(model.state);

    listView.render(model.state.lists);


}
const init = function () {

    sliderController();
    gridController();
    paginationView.addHandlerClick(controlSliderPagination);
    paginationView.addHandlerGridClick(controlGridPagination);
    gridView.addHandlerCardView(cardViewController);
    sliderView.addHandlerCardView(cardViewController);
    sliderView.addHandlerRemoveCardView(removeCardViewController);
    listView.addHandlerAddList(addToListController);

}


init();







// Archive.

// const cardViewHoverController = function (card, type) {

//     if (type == 'show')
//         gridView.showBottomCard(card);

//     if (type == 'hide')
//         gridView.hideBottomCard(card);
// }