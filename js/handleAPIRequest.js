function handleHTTPRequest(searchString) {
  let request = new XMLHttpRequest();
  let query = searchString;

  request.onreadystatechange = function() {
    console.log(this.status);
    if (this.readyState == 4 && this.status == 200) {
      try {
        let data = JSON.parse(this.response);
        displayResults(data.drinks, query);
      } catch (e) {
        displayResults([], query);
      }
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

function displayResults(data, searchString) {
  //This method generates DOM elements for the search page
  //A super container is used to house the text "Showing results for: x"
  //as well as holding the CSS grid of search results
  const super_container = document.querySelector(".super-container");
  const container = document.createElement("div");
  container.classList.add("search-results");
  const resultsText = document.createElement("p");
  if (data.length != 0) {
    resultsText.innerText = `Showing results for: ${searchString}`;
  } else {
    resultsText.innerText = "Your search didn't return any results";
  }
  super_container.appendChild(resultsText);

  //Create "Search result cards" to append to the CSS grid
  data.forEach(e => {
    const resultCard = document.createElement("div");
    resultCard.classList.add("result-card");
    const link_to = document.createElement("a");
    link_to.href = `./detail.html#${e.idDrink}`;
    const drinkName = document.createElement("h3");
    drinkName.innerText = e.strDrink;
    const drinkImg = document.createElement("img");
    drinkImg.src = e.strDrinkThumb;
    const img_link_to = document.createElement("a");
    img_link_to.href = `./detail.html#${e.idDrink}`;
    link_to.appendChild(drinkName);
    img_link_to.appendChild(drinkImg);
    resultCard.appendChild(link_to);
    resultCard.appendChild(img_link_to);
    container.appendChild(resultCard);
  });

  super_container.appendChild(container);
}

function parseSearch(variable) {
  //Parse search variable from URL query ?search=xxxx
  let query = window.location.search.substring(1);
  //split for multiple queries ex: ?search=coffee&?alcoholic=true
  let vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    let pair = vars[i].split("=");
    if (validateInput(pair[0]) && validateInput(pair[1])) {
      if (decodeURIComponent(pair[0]) == variable) {
        return decodeURIComponent(pair[1]);
      }
    }
  }
  console.log("Query variable %s not found", variable);
}

function validateInput(strSearch) {
  //Validate user input by regex. Allowed characters are
  //alphanumeric, +, %
  if (strSearch == "") {
    alert("Error: Input is empty!");
    return false;
  }
  const re = /^[\w +%]+$/;

  if (!re.test(strSearch)) {
    alert("Error: Input contains invalid characters!");
    return false;
  }
  return true;
}

const query = parseSearch("search");
handleHTTPRequest(query);
