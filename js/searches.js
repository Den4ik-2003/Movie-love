window.onload = function () {
  let sCode = "17fa80dc";
  let arrow = document.getElementById("arrow");
  let content = document.getElementById("content");
  let serachesContainer = document.getElementById("serachesContainer");
  let info = [
    "Title",
    "Released",
    "Genre",
    "Country",
    "Director",
    "Writer",
    "Actors",
    "Awards",
  ];

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
        console.error(error);
      });
  }

  function cerateInfo(data) {
    content.innerHTML = "";

    serachesContainer.style.display = "none";

    let div = document.createElement("div");
    div.classList.add("div");

    let img = document.createElement("img");
    img.src = `${data.Poster}`;
    img.classList.add("img");

    let div2 = document.createElement("div");
    div2.classList.add("infoContainer");

    info.forEach((key) => {
      let div3 = document.createElement("div");
      div3.classList.add("divFlex");

      let h3 = document.createElement("h3");
      h3.innerText = `${key}:`;
      h3.classList.add("title");

      let p = document.createElement("p");
      p.innerText = `${data[key]}`;
      p.classList.add("text");

      div3.appendChild(h3);
      div3.appendChild(p);
      div2.appendChild(div3);
    });

    let btn = document.createElement("input");
    btn.type = "button";
    btn.value = "Return";
    btn.style.cursor = "pointer";
    btn.style.backgroundColor = "#1bfd9c";
    btn.style.border = "2px solid green";
    btn.style.borderRadius = "5px";
    btn.style.padding = "20px 50px";
    btn.style.fontSize = "20px";
    btn.style.fontWeight = "600";
    btn.style.textAlign = "center";

    div2.appendChild(btn);
    div.appendChild(img);
    div.appendChild(div2);
    content.appendChild(div);

    btn.addEventListener('click', function() {
      window.location.href = "./searches.html"
    })
  }

  function createCards(arr, container) {
    arr.Search.forEach((element) => {
      let div = document.createElement("div");
      div.style.display = "flex";
      div.style.alignItems = "center";
      div.style.padding = "20px";
      div.style.border = "2px solid grey";
      div.style.borderRadius = "10px";
      div.style.height = "200px";

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

      let input = document.createElement("input");
      input.type = "button";
      input.value = "Details";
      input.className = "details";
      input.style.cursor = "pointer";
      input.style.backgroundColor = "#1bfd9c";
      input.style.border = "2px solid green";
      input.style.borderRadius = "5px";
      input.style.padding = "10px 20px";
      input.style.fontWeight = "600";

      input.addEventListener("click", function () {
        fetch(`http://www.omdbapi.com/?apikey=${sCode}&i=${element.imdbID}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error req");
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
            for (let i = 0; i < info.length; i++) {
              cerateInfo(data, info[i]);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      });

      div.appendChild(img);
      div2.appendChild(h1);
      div2.appendChild(p);
      div2.appendChild(input);
      div.appendChild(div2);
      container.appendChild(div);
    });
  }

  let searches = document.getElementById("searches");
  let inputSearches = localStorage.getItem("searchInput");
  if (inputSearches) {
    fetchs(sCode, inputSearches, searches);
  }

  arrow.addEventListener("click", function () {
    window.location.href = "../index.html";
  });
};
