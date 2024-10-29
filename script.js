window.onload = function () {
  let cardsAll = document.getElementById("cardsAll");
  let cardsPopular = document.getElementById("cardsPopular");
  let cardsNew = document.getElementById("cardsNew");
  let cardsOther = document.getElementById("cardsOther");
  let sCode = "17fa80dc";
  let inputs = ["Super", "War", "Friends", "Love"];

  function fetchs(sCode, input, cards) {
    fetch(`http://www.omdbapi.com/?apikey=${sCode}&s=${input}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error req");
        }
        return response.json();
      })
      .then((data) => {
        createCards(data, cards);
      })
      .catch((error) => {
        return error;
      });
  }

  function createCards(arr, container) {
    arr.Search.forEach((element) => {
      let div = document.createElement("div");
      div.style.display = "flex";
      div.style.alignItems = "center";
      div.style.padding = "20px";
      div.style.border = "2px solid grey";
      div.style.borderRadius = "10px";
      div.style.height = "200px"
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

  fetchs(sCode, inputs[0], cardsAll);
  fetchs(sCode, inputs[1], cardsPopular);
  fetchs(sCode, inputs[2], cardsNew);
  fetchs(sCode, inputs[3], cardsOther);

  let search = document.getElementById("search");
  let btn = document.getElementById("btn");

  btn.addEventListener("click", function () {
    if (search.value !== "") {
      let inputSearches = search.value;
      localStorage.setItem("searchInput", inputSearches);
      window.location.href = "./page/searches.html";
    }
  });
};
