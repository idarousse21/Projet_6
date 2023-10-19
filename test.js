const url = "http://localhost:8000/api/v1/titles/?"
const queryStr = "genre=comedy&genre=sci-fi&genre=drama&sort_by=-imdb_score"
const querySearch = new URLSearchParams(queryStr)
p = querySearch.get("genre")== "comedy"
function urlSearch(sort) {
    for (const [key, value] of querySearch) {
        if (value == sort) {
            search = `${key}=${value}`
            return `${url}${search}`
        }
    }
}
function displayBestMovie() {
    let urlBestMovie = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score"
    fetch(urlBestMovie)
        .then(response => response.json())
        .then(data => {
            let bestFilm = data.results[0]
            let category = document.getElementById("bestMovie")
            let titleBestMovie = document.getElementById("titleBestMovie")
            let buttonInfo = document.getElementsByTagName("button")[0]
            let img = document.createElement("img")
            titleBestMovie.innerText = bestFilm.title
            img.src = bestFilm.image_url
            img.alt = bestFilm.title
            img.setAttribute('onclick', `openModal(${bestFilm.id})`)
            category.append(img)
            buttonInfo.setAttribute('onclick', `openModal(${bestFilm.id})`)
        })
}


function getUrlPagesOfCategory(sort) {
    let urlPage = `${urlSearch(sort)}&page_size=7&sort_by=-imdb_score`
    return fetch(urlPage)
        .then(response => response.json())
        .then(data => {
            return data.results
        })
}

async function displayFilmsCategory(sort, category) {
    let data = await getUrlPagesOfCategory(sort)
    let categoryById = document.getElementById(category)
    for (let number = 0; number < data.length; number++) {
        let div = document.createElement("div")
        div.className = "movieitem"
        let img = document.createElement("img")
        img.src = data[number].image_url
        img.alt = data[number].title
        div.append(img)
        categoryById.append(div)
        img.setAttribute('onclick', `openModal(${data[number].id})`)
    }
}


displayBestMovie("-imdb_score", "bestMovie")
displayFilmsCategory("-imdb_score", "bestMovies")
displayFilmsCategory("comedy", "comedy")
displayFilmsCategory("drama", "drama")
displayFilmsCategory("sci-fi", "sci-fi")







function openModal(id) {
    const modal = document.getElementById("myModal");
    modal.style.display = "block"
    let span = document.getElementsByClassName("close")[0];
    span.onclick = function () {
        modal.style.display = "none";
    }
    window.onclick = function (event) {
        console.log(event.target)
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    let url = "http://localhost:8000/api/v1/titles/" + id
    let modalContent = document.getElementById("modal-content")
    let titleFilm = document.getElementById("titleModal")
    let genre = document.getElementById("genre")
    let releaseDate = document.getElementById("releaseDate")
    let rated = document.getElementById("rated")
    let scoreImdb = document.getElementById("scoreImdb")
    let director = document.getElementById("director")
    let actors = document.getElementById("actors")
    let countries = document.getElementById("countries")
    let boxOffice = document.getElementById("boxOffice")
    let description = document.getElementById("description")
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let img = modalContent.getElementsByTagName("img")[0]
            img.src = data.image_url
            img.alt = data.title
            titleFilm.innerText = `${data.title} - ${data.duration} min`
            genre.innerText = `Genre: ${data.genres.join(", ")}`
            releaseDate.innerText = `Date de sortie: ${data.date_published}`
            rated.innerText = `Note: ${data.rated}`
            scoreImdb.innerText = `Score Imdb: ${data.imdb_score}/10`
            director.innerText = `Réalisateur: ${data.directors}`
            actors.innerText = `Acteurs: ${data.actors.join(", ")}`
            countries.innerText = `Pays: ${data.countries.join(", ")}`
            if (data.worldwide_gross_income == null) {
                boxOffice.innerText = `Box-office: Aucune info`
            } else {
                boxOffice.innerText = `Box-office: ${data.worldwide_gross_income} d'entrées`
            }
            description.innerText = `Description: ${data.description}`


        })
}

const media = window.matchMedia("(max-width: 1280px)")

function moveRight(category) {
    let slider = document.getElementById(category)
    let textIndent = parseInt(slider.style.textIndent || 0)
    slider.style.textIndent = (textIndent - 25) + "%"
    slider.getElementsByClassName('arrow left')[0].style.visibility = "visible"
    if (media.matches){
        slider.style.textIndent = (textIndent - 50) + "%"
        if (slider.style.textIndent >= `-500%`) {
            slider.style.textIndent = `-380%`
            slider.getElementsByClassName('arrow right')[0].style.visibility = "hidden"
        }
    }else{
        if (slider.style.textIndent >= `-50%`) {
            slider.style.textIndent = `-50%`
            slider.getElementsByClassName('arrow right')[0].style.visibility = "hidden"
        }
    }
    return true

}


function moveLeft(category) {
    let slider = document.getElementById(category)
    let textIndent = parseInt(slider.style.textIndent || 0)
    slider.style.textIndent = (textIndent + 25) + "%"
    slider.getElementsByClassName('arrow right')[0].style.visibility = "visible"
    if (media.matches){
        slider.style.textIndent = (textIndent + 50) + "%"
        if (slider.style.textIndent >= `0%`) {
            slider.style.textIndent = `0%`
            slider.getElementsByClassName('arrow left')[0].style.visibility = "hidden"
        }
    }else{
        if (slider.style.textIndent >= `0%`) {
            
            slider.style.textIndent = `0%`
            slider.getElementsByClassName('arrow left')[0].style.visibility = "hidden"
        }
    }
    return true
}

