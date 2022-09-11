// fetch("http://localhost:8000/api/v1/titles/574")
//    .then(reponse => reponse.json())
//    .then(data => {
//       let p = document.getElementById("abc");
//       for (let i = 0; i < 7; i++) {
//         let img = document.createElement("img");
//         img.src = data.image_url;
//     //   img.alt = data.title;
//         p.appendChild(img);
//       }
//     })
// let p = 'http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page=2';
// let u = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score"

// fetch(u)
//    .then(reponse => reponse.json())
//    .then(data => {
//         let p = data["results"]
//         for (let i of p){
//             let img = document.createElement("img");
//             img.src = i.image_url;
//             img.alt = i.title;
//             abc.appendChild(img);
//         }
//     })

const urlApi = "http://localhost:8000/api/v1/titles/"

function getDataFromResultsKey(getUrlApi) {
    fetch(getUrlApi)
        .then(response => response.json())
        .then(data => {
            return data.results
        })
}

