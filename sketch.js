let apiURL = `https://api.weatherapi.com/v1/current.json?key=31cccdf7e57341dc9ae170022230211&q=hayward&aqi=yes`;

let weatherData;
let animationSpeed = 2;
let lineY;
let lineX1;
let lineX2;
let lineX3;

function setup() {
  createCanvas(800, 1000);
  background(50);

  var form = document.getElementById("cityForm");
  let locationInput = select('#locationInput');
  form.addEventListener('submit', handleForm);
  function handleForm(event) {
    event.preventDefault(); 
    var newLocation = locationInput.value();
    updateLocation(newLocation);
  }
  
  
  lineY = height / 2;
  lineX1 = 0;
  lineX2 = -50;
  lineX3 = 100;

  updateLocation('hayward');

}

function updateLocation(newLocation) {
  console.log('Updating location with:', newLocation);
  apiURL = `https://api.weatherapi.com/v1/current.json?key=31cccdf7e57341dc9ae170022230211&q=${newLocation}&aqi=yes`;
  loadJSON(apiURL, gotWeather);
  console.log('Updated location:', locationInput.value);
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

    if (isDay === 0) {
    
      setGradient(0, 0, width, height, color(0, 0, 20), color(15, 5, 40));
    } else {
     
      if (conditionText === "Sunny" || conditionText === "Clear") {
        setGradient(0, 0, width, height, color(0, 0, 255), color(135, 206, 250)); 
      } else if (conditionText === "Cloudy" || conditionText === "Light rain") {
        setGradient(0, 0, width, height, color(192), color(100)); 
      } else if (conditionText === "Partly cloudy") {
        setGradient(0, 0, width, height, color(135, 206, 235), color(192, 192, 192));
      } else {

        background(50);
      }
    }

    
    textSize(38);
    textAlign(CENTER);
    fill(255);
    text(`${cityName}, ${conditionText}, ${feelslikeF} (°F)`, width / 2, 75);
    text(`Wind Speed (mph): ${windMph}`, width / 2, height / 2 + 300);

    
    lineX1 += windMph;
    lineX2 += windMph*1.3;
    lineX3 += windMph/1.2  ;

    // Wind animation, this could definitely probably be an array but mehhhhh
    if (lineX1 > width + 100) {
      lineX1 = -85;
    }

    if (lineX2 > width + 140) {
      lineX2 = -100;
    }

    if (lineX3 > width + 100) {
      lineX3 = -125;
    }

    fill(255);
    noStroke();
    rect(lineX1, lineY, 85, 5, 5 ,5);
    rect(lineX2, lineY + 50, 100, 4, 5,5 );
    rect(lineX3, lineY - 25, 125, 3, 5, 5);


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
