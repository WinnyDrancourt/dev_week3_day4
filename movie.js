import { API_KEY } from "./api_key.js";

const movieSearchBox = document.getElementById("movie-search-box");
const searchList = document.getElementById("search-list");
const popUp = document.getElementById("pop-up");

const handKeyUp = () => {
  loadMovies();
};

movieSearchBox.addEventListener("keyup", handKeyUp);

const loadMovies = async () => {
  let searchTerm = movieSearchBox.value.trim();
  let URL = `http://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`;
  try {
    let result = await fetch(`${URL}`);
    let data = await result.json();
    displayMovieList(data.Search);
  } catch (error) {
    console.error("Error", error);
  }
};

const displayMovieList = (movies) => {
  searchList.innerHTML = "";
  movies.forEach((movie) => {
    let movieElement = document.createElement("div");
    movieElement.classList.add("search-short");
    movieElement.innerHTML = `
      <div class="poster">
        <img src="${movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"}" alt="${movie.Title}">
      </div>
      <div class="desc">
        <div class="short">
          <h3>${movie.Title}</h3>
          <p>${movie.Year}</p>
        </div>
        <button class='read-more' data-imdbid='${movie.imdbID}'>Read More</button>
      </div>
    </div>
        `;
    searchList.appendChild(movieElement);
  });

  document.querySelectorAll(".read-more").forEach((button) => {
    button.addEventListener("click", () => {
      const imdbID = button.dataset.imdbid;
      loadMovie(imdbID);
    });
  });
};

const loadMovie = async (filmID) => {
  let URL = `http://www.omdbapi.com/?i=${filmID}&apikey=${API_KEY}`;
  try {
    let result = await fetch(`${URL}`);
    let data = await result.json();
    displayPopUp(data);
  } catch (error) {
    console.error("Error", error);
  }
};

const displayPopUp = (movie) => {
  popUp.innerHTML = "";
  popUp.innerHTML = `
  <div class='inner-pop'>
    <div>
      <img src="${movie.Poster}">
    </div>
    <div class="desc">
      <h3>${movie.Title}</h3>
      <p>${movie.Released}</p>
      <p>${movie.Plot}</p>
    </div>
    </div>
`;
  popUp.classList.remove("hide");
};

document.addEventListener("click", (event) => {
  if (event.target === popUp || popUp.contains(event.target)) {
    return;
  }
  popUp.classList.add("hide");
});
