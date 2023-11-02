function setup() {
  createCanvas(600, 800);
  background(100);
  let url = 'http://api.weatherapi.com/v1/current.json?key=31cccdf7e57341dc9ae170022230211&q=94587&aqi=yes';
  loadJSON(url, gotWeather);
}

function gotWeather(weather) {
  // Extract city and state information from the JSON data
  let cityName = weather.location.name;
  let stateName = weather.location.region;

  // Display city and state information on the canvas
  textSize(16);
  textAlign(CENTER);
  fill(255); // Set text color to white
  text(`City: ${cityName}`, width / 2, height / 2 - 20);
  text(`State: ${stateName}`, width / 2, height / 2 + 20);
}

function draw() {
}
