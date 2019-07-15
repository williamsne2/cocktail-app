let request = new XMLHttpRequest();

request.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    let data = JSON.parse(this.response);
    console.log(data);
    window.location.replace(`../src/detail.html#${data.drinks[0].idDrink}`);
  }
};

request.open("GET", `https://the-cocktail-db.p.rapidapi.com/random.php`);
request.setRequestHeader("X-RapidAPI-Host", "the-cocktail-db.p.rapidapi.com");
request.setRequestHeader(
  "X-RapidAPI-Key",
  "6fad2980aemsh16291fe6b352e61p1eab62jsn14e16795ce08"
);

request.send();
