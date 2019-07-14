function handleHTTPRequest(searchString) {
  console.log(searchString);
  let request = new XMLHttpRequest();

  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log("pass");
      let data = JSON.parse(this.response);
      displayResults(data.drinks);
    }
  };

  request.open(
    "GET",
    `https://the-cocktail-db.p.rapidapi.com/filter.php?i=${searchString}`
  );
  request.setRequestHeader("X-RapidAPI-Host", "the-cocktail-db.p.rapidapi.com");
  request.setRequestHeader(
    "X-RapidAPI-Key",
    "6fad2980aemsh16291fe6b352e61p1eab62jsn14e16795ce08"
  );

  request.send();
}

function displayResults(data) {
  console.log(data);
  const container = document.querySelector(".search-results");
  data.forEach(e => {
    const resultCard = document.createElement("div");
    resultCard.classList.add("result-card");
    const drinkName = document.createElement("h3");
    drinkName.innerText = e.strDrink;
    const drinkImg = document.createElement("img");
    drinkImg.src = e.strDrinkThumb;
    resultCard.appendChild(drinkName);
    resultCard.appendChild(drinkImg);
    container.appendChild(resultCard);
    container.appendChild(document.createElement("br"));
  });
}

function parseSearch(variable) {
  let query = window.location.search.substring(1);
  let vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    let pair = vars[i].split("=");
    if (decodeURIComponent(pair[0]) == variable) {
      return decodeURIComponent(pair[1]);
    }
  }

  console.log("Query variable %s not found", variable);
}
const query = parseSearch("search");
handleHTTPRequest(query);
