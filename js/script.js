const header = document.querySelector('.navbar-brand')
const banner = document.querySelector('.reinime')
header.addEventListener('click', function () {
  document.querySelector('.top-anime').innerHTML = banner.innerHTML
  const label = document.querySelector('h4').innerHTML = ''
})


const seacrhBtn = document.querySelector('.btn-search')
seacrhBtn.addEventListener('click', async function () {
  const inputKeyword = document.querySelector('.input-anime')
  const anime = await searchAnime(inputKeyword)
  updateUI(anime)
  const label = document.querySelector('h4')
  label.innerHTML = 'Search : ' + inputKeyword.value
  inputKeyword.value = ''
})


const Anime = document.querySelectorAll('.nav-link')
Anime.forEach(btn => {
  btn.addEventListener('click', function () {
    const type = btn.dataset.type
    getAnime(type)
    const label = document.querySelector('h4')
    label.innerHTML = btn.innerHTML
  })
})



document.addEventListener('click', async function (e) {
  if (e.target.classList.contains('see-detail')) {
    const malid = e.target.dataset.id
    const animedetail = await getanimedetail(malid)
    updateUIdetail(animedetail)

  }

})


function searchAnime(keyword) {
  return fetch('https://api.jikan.moe/v3/search/anime?q=' + keyword.value)
    .then(response => response.json())
    .then(response => response.results)
}






async function getAnime(type) {
  const movies = await getMovies(type)
  updateUI(movies)
}

function getMovies(type) {
  return fetch('https://api.jikan.moe/v3/top/anime/1/' + type)
    .then(response => response.json())
    .then(response => response.top)
}

function updateUI(movies) {
  let cards = '';

  movies.forEach(m => cards += showMovie(m));
  const movieList = document.querySelector('.top-anime');
  movieList.innerHTML = cards;


}

function getanimedetail(malid) {
  return fetch('https://api.jikan.moe/v3/anime/' + malid)
    .then(response => response.json())
    .then(response => response)
}

function updateUIdetail(m) {
  const moviedetail = detailMovie(m)
  const modalBody = document.querySelector('.modal-body')
  modalBody.innerHTML = moviedetail;
}


function showMovie(m) {
  return `<div class="col-md-3 mb-3">
            <div class=" card">
              <img src="${m.image_url}" class="card-img-top" alt="onepiece">
              <div class="card-body">
                <h5 class="card-title">${m.title}</h5>
                <a href="#" class="btn btn-primary see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${m.mal_id}">See Detail</a>
              </div>
            </div>
          </div>`
}

function detailMovie(m) {
  return `<div class+"container-fluid">
            <div class="row">
              <div class="col-md-4">
                <img src="`+ m.image_url + `" class="img-fluid">
              </div>
              <div class="col-md-8">
                <ul class="list-group">
                  <li class="list-group-item"><h3>`+ m.title + `</h3></li>
                  <li class="list-group-item">Released : `+ m.premiered + `</li>
                  <li class="list-group-item"><b>Synopsis</b> : `+ m.synopsis + `</li>
  
                </ul>
              </div>
            </div>
          </div>`
}