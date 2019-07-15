function handleHTTPRequest(drinkID) {
  console.log(drinkID);
  let request = new XMLHttpRequest();

  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log("pass");
      let data = JSON.parse(this.response);
      console.log(data.drinks[0]);
      createDetail(data.drinks[0]);
    }
  };

  request.open(
    "GET",
    `https://the-cocktail-db.p.rapidapi.com/lookup.php?i=${drinkID}`
  );
  request.setRequestHeader("X-RapidAPI-Host", "the-cocktail-db.p.rapidapi.com");
  request.setRequestHeader(
    "X-RapidAPI-Key",
    "6fad2980aemsh16291fe6b352e61p1eab62jsn14e16795ce08"
  );

  request.send();
}

function generateIngredientsList(data) {
  const dict = {};
  for (var i = 0; i < 15; i++) {
    if (eval(`data.strIngredient${i + 1}`).trim() != "") {
      dict[i] = [
        eval(`data.strIngredient${i + 1}`).trim(),
        eval(`data.strMeasure${i + 1}`).trim()
      ];
    }
  }
  return dict;
}
function createDetail(data) {
  const container = document.querySelector(".drink-detail");
  const drinkName = document.createElement("h2");
  drinkName.innerText = data.strDrink;
  const alcoholic = document.createElement("h4");
  alcoholic.innerText = `(${data.strAlcoholic})`;
  const drinkImg = document.createElement("img");
  drinkImg.src = data.strDrinkThumb;
  const ingredientsHeader = document.createElement("p");
  ingredientsHeader.innerText = "Ingredients: ";

  const dict = generateIngredientsList(data);
  const ingredients = document.createElement("table");
  for (var ingredient in dict) {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    td1.innerText = dict[ingredient][0];
    const td2 = document.createElement("td");
    td2.innerText = dict[ingredient][1];
    tr.appendChild(td1);
    tr.appendChild(td2);
    ingredients.appendChild(tr);
  }

  const instructions = document.createElement("p");
  instructions.innerText = data.strInstructions;
  const glass = document.createElement("p");
  glass.innerText = `Serve in a ${data.strGlass}`;

  container.appendChild(drinkName);
  container.appendChild(alcoholic);
  container.appendChild(drinkImg);
  container.appendChild(ingredientsHeader);
  container.appendChild(ingredients);
  container.appendChild(instructions);
  container.appendChild(glass);
  container.appendChild(document.createElement("br"));
}
function parseURL(variable) {
  let drinkID = window.location.hash.substring(1);
  if (drinkID != "") {
    return drinkID;
  }
  console.log("Query variable %s not found", variable);
}

const drinkID = parseURL("#");
handleHTTPRequest(drinkID);
