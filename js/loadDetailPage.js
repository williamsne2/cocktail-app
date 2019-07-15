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
  const drinkName = document.createElement("h1");
  drinkName.innerText = data.strDrink;
  const alcoholic = document.createElement("h3");
  alcoholic.innerText = `(${data.strAlcoholic})`;
  const drinkImg = document.createElement("img");
  drinkImg.src = data.strDrinkThumb;
  const ingredientsHeader = document.createElement("h3");
  ingredientsHeader.classList.add("ingredients-header");
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

  const img_ingredients_span = document.createElement("span");
  img_ingredients_span.classList.add("img-ingredients-span");
  const ingredientsTable = document.createElement("span");
  ingredientsTable.classList.add("ingredients-table");
  container.appendChild(drinkName);
  container.appendChild(alcoholic);
  img_ingredients_span.appendChild(drinkImg);
  ingredientsTable.appendChild(ingredientsHeader);
  ingredientsTable.appendChild(ingredients);
  img_ingredients_span.appendChild(ingredientsTable);
  container.appendChild(img_ingredients_span);
  container.appendChild(instructions);
  container.appendChild(glass);
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
