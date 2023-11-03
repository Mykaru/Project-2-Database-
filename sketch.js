let apiURL = `https://api.weatherapi.com/v1/current.json?key=31cccdf7e57341dc9ae170022230211&q=94542&aqi=yes`;

let weatherData;
let animationSpeed = 2;
let lineY;
let lineX; 

function setup() {
  createCanvas(800, 600);
  background(50);

  lineY = height / 2;
  lineX1 = 0; 
  lineX2 = -50; 
  lineX3 = 100;

  setInterval(updateWeather, 200);
  updateWeather();
}

function updateWeather() {
  loadJSON(apiURL, gotWeather);
}

function gotWeather(data) {
  weatherData = data;
}

function draw() {
  
  if (weatherData) {
    let cityName = weatherData.location.name;
    let stateName = weatherData.location.region;
    let precipIn = weatherData.current.precip_in;
    let windMph = weatherData.current.wind_mph;
    let feelslikeF = weatherData.current.feelslike_f;
    let conditionText = weatherData.current.condition.text;
    let isDay = weatherData.current.is_day;

    if (conditionText === "Sunny" && isDay === 1) {
    
      setGradient(0, 0, width, height, color(0, 0, 255), color(135, 206, 250)); 
    } else if (conditionText === "Cloudy" && isDay === 1) {
      
      setGradient(0, 0, width, height, color(192), color(192)); 
    } else if ((conditionText === "Sunny" || conditionText === "Clear") && isDay === 0) {
      
      setGradient(0, 0, width, height, color(0, 0, 20), color(15, 5, 40));
    } else if (conditionText === "Cloudy" && isDay === 0) {
      
      setGradient(0, 0, width, height, color(5, 5, 10), color(20, 20, 30));
    } else {
      
      background(50);
    }

    
    textSize(32);
    textAlign(CENTER);
    fill(255);
    text(`${cityName}, ${conditionText}, ${feelslikeF} (°F)`, width / 2, 75);
    text(`Wind Speed (mph): ${windMph}`, width / 2, height / 2 + 200);

    
    lineX1 += windMph;
    lineX2 += windMph*1.2;
    lineX3 += windMph/1.2  ;

    // Wrap the line around the screen
    if (lineX1 > width + 100) {
      lineX1 = -100;
    }

    if (lineX2 > width + 100) {
      lineX2 = -100;
    }

    if (lineX3 > width + 100) {
      lineX3 = -100;
    }

    // Wind animation
    fill(255);
    noStroke();
    rect(lineX1, lineY, 85, 2);
    rect(lineX2, lineY + 50, 100, 2);
    rect(lineX3, lineY - 25, 145, 2);


    function setGradient(x, y, w, h, c1, c2) {
      noFill();
      for (let i = y; i <= y + h; i++) {
        let inter = map(i, y, y + h, 0, 1);
        let c = lerpColor(c1, c2, inter);
        stroke(c);
        line(x, i, x + w, i);
      }
    }

  }
}
