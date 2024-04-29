// const API_URl = "https://api.weatherapi.com";
const weatherForm = document.querySelector(".weather__top");
const weatherSearchInput = document.querySelector("#weather-search");
const weatherTitle = document.querySelector(".weather__bottom__title");
const weatherImg = document.querySelector(".weather__bottom__img");
const weatherDegrees = document.querySelector(
  ".weather__bottom__degrees__text"
);
const weatherCondition = document.querySelector(".weather__bottom__reference");

document.addEventListener("DOMContentLoaded", () => {
  fetchWeatherData();
});

weatherForm.addEventListener("click", (evt) => {
  evt.preventDefault();
  fetchWeatherData(weatherSearchInput.value);
});

async function fetchWeatherData(region = "Tashkent") {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=644f6ce0ca9e401ebb891832211707&q=${region}&days=7&aqi=yes&alerts=yes`
  );

  await response
    .json()
    .then((res) => renderWeatherData(res))
    .catch((err) => console.log(err));
}

function renderWeatherData(data) {
  console.log(data);

  weatherTitle.innerHTML = `${data.location.country}. ${data.location.name} `;
  weatherImg.src = data.current.condition.icon;
  weatherDegrees.innerHTML = `${data.current.temp_c}˚`;
  weatherCondition.textContent = data.current.condition.text;
}
