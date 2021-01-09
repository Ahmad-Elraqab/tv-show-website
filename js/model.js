import { API_URL, RES_PER_PAGE } from './config.js';
import { getJsonData } from './helpers.js';
import { async } from 'regenerator-runtime';




export const state = {
    TvShows: [

    ],
    pagination: {

        results: [],
        page: 1,
        pageGrid: 1,
        currGridPage: 1,
        resultsPerPage: RES_PER_PAGE
    },

}


export const loadShows = async function () {

    const data = await getJsonData(`${API_URL}`);

    try {

        // console.log(data);

        state.TvShows = data;
        // console.log(state.TvShows);



    } catch (error) {
        console.log(`${error}`);
        throw error;
    }

}

export const getSearchResultsPage = function (page = state.pagination.page, type) {

    var start = (page - 1) * state.pagination.resultsPerPage;
    const end = page * state.pagination.resultsPerPage;

    if (type == 'slider') {

        state.pagination.page = page;
        state.pagination.results = state.TvShows.slice(start, end);
        return state.pagination.results;
    }

    if (type == 'grid') {
        state.pagination.currGridPage = page;
        state.pagination.pageGrid = page;
        start = 0;
        state.pagination.results = state.TvShows.slice(start, end);
        return state.pagination.results;
    }
}


export const changeMovieStatus = function (type, id) {


    state.TvShows.find((e) => {
        if (e.id == id) {
            let parentE;
            switch (type) {
                case "myList":
                    e.parentE = ".finished";
                    e.myList = true;
                    break;
                case "myWatchLater":
                    e.parentE = ".watch-later";
                    e.myWatchLater = true;
                    break;
                case "myFavourite":
                    e.parentE = ".favourite";
                    e.myFavourite = true;
                    break;

                default:
                    break;
            }

        }
    });

    const data = state.TvShows.find((e) => e.id == id);

    return data;



}