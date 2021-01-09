import View from './view';
import myListActive from "/image/active-my-list.png";
import myFavouriteActive from "/image/active-favourite.png";
import myWatchLaterActive from "/image/active-watch-later.png";
import myList from "/image/my-list.png";
import myFavourite from "/image/my-favourite.png";
import myWatchLater from "/image/my-watch-later.png";

class GridView extends View {


    _parentElement = document.querySelector('.movie-list');
    _data;


    _generateMarkup(element) {

        return `                
        <div class="movie-details">
        <div class="card" data-id="${element.id}">
        <div class="hover-div">
            <div class="item">
                <img class="sub-img myList" src="${element.myList == true ? myListActive : myList}" alt="">
                <img class="sub-img myFavourite" src="${element.myFavourite == true ? myFavouriteActive : myFavourite}" alt="">
                <img class="sub-img myWatchLater" src="${element.myWatchLater == true ? myWatchLaterActive : myWatchLater}" alt="">
            </div>
        </div>
        <img class="main-img" src="${element.image == '' ? "/image/movie.jpg" : element.image.medium}" alt="">
        </div>
        <h5>${element.genres.map(this._genres).join(', ')}</h5>            
        <h4>${element.name}</h4>
    </div>
        `

    }

    _genres(e) {
        return e;
    }



}


export default new GridView();