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
    lists: {

        finished: [],
        watchLater: [],
        favourite: [],

    }

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

    _checkData(id, type);

}

const _checkData = function (id, type) {

    const card = state.TvShows.find((e) => e.id == id);

    // i have tried to simplify this switch to one case but it didn't work with me.
    // console.log(state.lists.finished.find((el) => el.id == id));

    switch (type) {
        case "myList":
            let data = state.lists.finished.find((el) => el.id == id);
            if (data) {
                if (data.myList == true) {
                    data.myList = false;
                    state.lists.favourite.splice(state.lists.finished.indexOf(data), 1);
                }
            } else {
                card.parentE = ".finished";
                card.myList = true;
                state.lists.finished.push(card);
            }
            break;

        case "myWatchLater":
            data = state.lists.watchLater.find((el) => el.id == id);
            if (data) {
                if (data.myWatchLater == true) {
                    data.myWatchLater = false;
                    state.lists.favourite.splice(state.lists.watchLater.indexOf(data), 1);

                }
            } else {
                card.parentE = ".watch-later";
                card.myWatchLater = true;
                state.lists.watchLater.push(card);
            }
            break;

        case "myFavourite":
            data = state.lists.favourite.find((el) => el.id == id);
            // console.log(data);
            if (data) {
                if (data.myFavourite == true) {
                    data.myFavourite = false;
                    state.lists.favourite.splice(state.lists.favourite.indexOf(data), 1);
                }
            } else {
                card.parentE = ".favourite";
                card.myFavourite = true;
                state.lists.favourite.push(card);
            }
            break;

        default:
            break;



    }



    // console.log(state.lists);
}



// Archive.

// if (state.lists.finished.find((e) => e.id == id)) {
//     if (e.myList == true) {
//         e.myList = false;
//     } else {
//         parentE = ".finished";
//         card.myList = true;
//         state.lists.finished.push(card);
//     }
// }



  // switch (type) {
    //     case "myList":

    //         break;

    //     case "myWatchLater":
    //         _checkData(id, ".watch-later")
    //         break;

    //     case "myFavourite":
    //         _checkData(id, ".favourite")
    //         break;

    //     default:
    //         break;



    // }