document.addEventListener(
  "DOMContentLoaded",
  navigator.geolocation.getCurrentPosition(getPosition)
);

function getPosition(position) {
  const coords = position.coords;
  getData(coords);
}

async function getData(coords) {
  try {
    const request = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=5a370712714d76e5c533b5ca1389528b&lang=es&units=metric`
    );
    const data = await request.json();
    createHTML(data);
  } catch (error) {
    console.log(error);
  }
}

function createHTML(data) {
  const principalData = document.querySelector(".principalData");
  const secondaryData = document.querySelector(".secondaryData");

  principalData.innerHTML = `<div class="principalDataContainer">
            <h1 class="cityName text-white text-center">${data.name}</h1>
            <div class="temperature text-white text-center">${data.main.temp} °C</div>
            <div class="weather text-center">${data.weather[0].description}</div>
          </div>`;
  secondaryData.innerHTML = `<div class="currentData">
            <h3 class=""text-center>Actualmente</h3>
            <div class="cards">
              <div class="day1">
                <div>Temp. Maxima</div>
                <div class="text-white max">${data.main.temp_max} °C</div>
              </div>
              <div class="day2">
                <div>Temp. Minima</div>
                <div class="text-white min">${data.main.temp_min} °C</div>
              </div>
              <div class="day3">
                <div>Humedad</div>
                <div class="text-white humidity">${data.main.humidity} %</div>
              </div>
              <div class="day4">
                <div>Viento</div>
                <div class="text-white wind">${data.wind.speed} m/s</div>
              </div>
            </div>
          </div>`;
}
