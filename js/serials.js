let serials = document.getElementById("serials");
let sCode = "17fa80dc";
let inputSerials = "Serial";

function fetchs(sCode, input) {
  fetch(`http://www.omdbapi.com/?apikey=${sCode}&s=${input}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error req");
      }
      return response.json();
    })
    .then((data) => {
      createCards(data, serials);
    })
    .catch((error) => {
      return error;
    });
}

function createCards(arr, container) {
  arr.Search.forEach((element) => {
    let div = document.createElement("div");
    div.classList.add("divBorder");
    div.style.display = "flex";
    div.style.alignItems = "center";
    let div2 = document.createElement("div");
    div2.style.marginLeft = "20px";
    let img = document.createElement("img");
    img.style.width = "100px";
    img.src = `${element.Poster}`;
    let h1 = document.createElement("h1");
    h1.style.color = "white";
    h1.style.fontSize = "25px";
    h1.style.paddingTop = "20px";
    h1.innerText = `${element.Title}`;
    let p = document.createElement("p");
    p.style.color = "white";
    p.innerText = `${element.Year}`;
    div.appendChild(img);
    div2.appendChild(h1);
    div2.appendChild(p);
    div.appendChild(div2);
    container.appendChild(div);
  });
}

fetchs(sCode, inputSerials);

let search = document.getElementById("search");
let btn = document.getElementById("btn");

btn.addEventListener("click", function () {
  if (search.value !== "") {
    let inputSearches = search.value;
    localStorage.setItem("searchInput", inputSearches);
    window.location.href = "searches.html";
  }
});
