const url = "http://localhost:8000/api/v1/titles/?"
const queryStr = "genre=comedy&genre=animation&genre=drama&sort_by=-imdb_score"
const querySearch = new URLSearchParams(queryStr)

function urlSearch(sort){
    for (const [key,value] of querySearch){
        if (value == sort){
            search = `${key}=${value}`
            return `${url}${search}`
        }
    }
}
async function displayBestMovie(){
    let urlBestMovie = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score"
    await fetch(urlBestMovie)
        .then(response =>response.json())
        .then(data => {
            let bestFilm = data.results[0]
            let category = document.getElementById("bestMovie")
            let img = category.getElementsByTagName('img')[0]
            img.src = bestFilm.image_url
            img.alt = bestFilm.title
            
            
        })
    }


async function getUrlPagesOfCategory(sort){
    let urlPage1 = `${urlSearch(sort)}&page_size=7`
    return fetch(urlPage1)
        .then(response =>response.json())
        .then(data => {
            return data.results
            })
        }

async function displayFilmsCategory(sort, category) {
    let data =  await getUrlPagesOfCategory(sort)
    let categoryId = document.getElementById(category)
    for (let number = 0; number < data.length; number++) {
        let div = document.createElement("div")
        div.className = "movieItem"
        let img = document.createElement("img")
        img.src = data[number].image_url
        img.alt = data[number].title
        categoryId.append(div)
        div.append(img)
        };
        
};


displayBestMovie("-imdb_score","bestMovie")
displayFilmsCategory("-imdb_score","bestMovies")
displayFilmsCategory("comedy", "comedy")
displayFilmsCategory("drama", "drama")
displayFilmsCategory("animation", "animation")





// // function openImg(id){
// //     var image = document.getElementById(id)
// //     var p = image.getElementsByTagName('img')
// //     var source = p.src
    
// // }

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("bestMovie");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}





function info (data){
    // mettre une condition pour que quand on clique sur une image ca renvoi les info de limage
    let p = document.getElementById("myModal");
    let img = document.createElement("img");
    let  = document.createElement("<p> je suis la</p>")
    // img.src = data[0].image_url
    
    p.prepend(img)
}
