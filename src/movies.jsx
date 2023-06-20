

import { useRef } from 'react'
import './App.css'

const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

function MovieSearchEngine() {


  const form1 = useRef();
  const search1 = useRef();

  getMovies(API_URL)
  
  async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()
    
    console.log("DATA @", data)
    showMovies(data.results)
  }
  
  function showMovies(movies) {
   let main = document.querySelector('#main');
    main.innerHTML = ''

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
        `
        main.appendChild(movieEl)
    })
}

  function getClassByRate(vote) {
    if (vote >= 8) {
      return 'green'
    } else if (vote >= 5) {
      return 'orange'
    } else {
      return 'red'
    }
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    const searchTerm = search1.current.value

    if (searchTerm && searchTerm !== '') {
      getMovies(SEARCH_API + searchTerm)

      search1.current.value = ''
    } else {
      window.location.reload()
    }
  }


  return (
    <>
      <header>
        <form id="form" ref={form1} onSubmit={onSubmitHandler}>
          <input type="text" id="search" ref={search1} class="search" placeholder="Search" />
        </form>
      </header>

      <main id="main" >
      </main>

    </>
  )
}

export default MovieSearchEngine;
