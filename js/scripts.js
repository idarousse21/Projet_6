const url = "http://localhost:8000/api/v1/titles/?"
const queryStr = "genre=comedy&genre=sci-fi&genre=drama&sort_by=-imdb_score"
const querySearch = new URLSearchParams(queryStr)

function urlSearch(sort){
    for (const [key,value] of querySearch){
        if (value == sort){
            search = `${key}=${value}`
            return `${url}${search}`
        }
    }
}
function displayBestMovie(){
    let urlBestMovie = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score"
    fetch(urlBestMovie)
        .then(response =>response.json())
        .then(data => {
            let bestFilm = data.results[0]
            let category = document.getElementById("bestMovie")
            var img = document.createElement("img")
            img.src = bestFilm.image_url
            img.alt = bestFilm.title
            category.append(img)
            
            
        })
    }


function getUrlPagesOfCategory(sort){
    let urlPage1 = `${urlSearch(sort)}&page_size=7&sort_by=-imdb_score`
    return fetch(urlPage1)
        .then(response =>response.json())
        .then(data => {
            return data.results
            })
        }

async function displayFilmsCategory(sort, category) {
    let data =  await getUrlPagesOfCategory(sort)
    let categoryId = document.getElementById(category)
    let film = categoryId.getElementsByClassName("movieItem")
    for (let number = 0; number < film.length; number++) {
        let img = film[number].getElementsByTagName("img")[0]
        img.src = data[number].image_url
        img.alt = data[number].title
        
        img.setAttribute('onclick',`openModal(${data[number].id})` )
        };
        
};


displayBestMovie("-imdb_score","bestMovie")
displayFilmsCategory("-imdb_score","bestMovies")
displayFilmsCategory("comedy", "comedy")
displayFilmsCategory("drama", "drama")
displayFilmsCategory("sci-fi", "sci-fi")






const modal = document.getElementById("myModal");

function openModal(id){
    modal.style.display = "block"
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
      modal.style.display = "none";
    }
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
    let url = "http://localhost:8000/api/v1/titles/"+id
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
        .then(response =>response.json())
        .then(data => {
            let img = modalContent.getElementsByTagName("img")[0]
            img.src = data.image_url
            titleFilm.innerText = `${data.title} - ${data.duration} min`
            genre.innerText = data.genres
            releaseDate.innerText = data.date_published
            rated.innerText = data.rated
            scoreImdb.innerText = data.imdb_score
            director.innerText = data.directors
            actors.innerText = data.actors.join(", ")
            countries.innerText = data.countries
            boxOffice.innerText = data.worldwide_gross_income
            description.innerText = data.description

        
})}



 function moveLeft(category) {
    let slider = document.getElementById(category)
    let textIndent = parseInt(slider.style.textIndent || 0)
    slider.style.textIndent=(textIndent-25)+"%"
    slider.getElementsByClassName('arrow left')[0].style.visibility = "visible"
    if (slider.style.textIndent >= `-50%`)  {
       slider.style.textIndent= `-50%`;
       slider.getElementsByClassName('arrow right')[0].style.visibility = "hidden"    
    };
    return true; 

}


function moveRight(category) {
    let slider = document.getElementById(category)
    let textIndent = parseInt(slider.style.textIndent || 0)
    slider.style.textIndent=(textIndent+25)+"%"
    slider.getElementsByClassName('arrow right')[0].style.visibility = "visible"
    if (slider.style.textIndent >= `0%`)  {
        slider.style.textIndent=`0%`
        slider.getElementsByClassName('arrow left')[0].style.visibility = "hidden"
    };

    return true;
};

