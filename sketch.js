function setup() {
  createCanvas(400, 400);
  background(100)

  let url = 'http://api.weatherapi.com/v1/current.json?key=31cccdf7e57341dc9ae170022230211&q=94587&aqi=yes';
  loadJSON(url, gotWeather);
}

function gotWeather(weather) {
  
}

function draw () {
  rect(width/2, height/2, 50, 50 )
}
