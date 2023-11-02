let apiURL = `http://api.weatherapi.com/v1/current.json?key=31cccdf7e57341dc9ae170022230211&q=94542&aqi=yes`;

let weatherData; // Variable to store the weather data
let animationSpeed = 2;
let lineY;
let lineX; // X-coordinate for the line

function setup() {
  createCanvas(600, 800);
  background(50);

  lineY = height / 2;
  lineX1 = 0; // Initialize the X-coordinate for the line
  lineX2 = -50; // Initialize the X-coordinate for the line
  lineX3 = 100; // Initialize the X-coordinate for the line

  setInterval(updateWeather, 200); // Update weather every 30 minutes (in milliseconds)
  updateWeather(); // Initial update
}

function updateWeather() {
  loadJSON(apiURL, gotWeather);
}

function gotWeather(data) {
  // Store the weather data in the global variable
  weatherData = data;
}

function draw() {
  background(50);
  // Check if weatherData is available and not undefined
  if (weatherData) {
    let cityName = weatherData.location.name;
    let stateName = weatherData.location.region;
    let precipIn = weatherData.current.precip_in;
    let windMph = weatherData.current.wind_mph;
    let feelslikeF = weatherData.current.feelslike_f;
    let conditionText = weatherData.current.condition.text; // Added to get the condition text

    // Display city, state, precipitation, wind speed, feels like, and condition on the canvas
    textSize(32);
    textAlign(CENTER);
    fill(255); // Set text color to white
    text(`${cityName}, ${conditionText}, ${feelslikeF} (°F)`, width / 2, 75);
    text(`Wind Speed (mph): ${windMph}`, width / 2, height / 2 + 200);

    // Update the X-coordinate for the line based on animationSpeed
    lineX1 += windMph;
    lineX2 += windMph + 0.5;
    lineX3 += windMph - 0.5;

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
  }
}
