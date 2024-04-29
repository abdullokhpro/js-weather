// // const API_URl = "https://api.weatherapi.com";
const weatherForm = document.querySelector(".weather__top");
const weatherSearchInput = document.querySelector("#weather-search");
const weatherTitle = document.querySelector(".weather__bottom__title");
const weatherImg = document.querySelector(".weather__bottom__img");
const weatherDegrees = document.querySelector(
  ".weather__bottom__degrees__text"
);
const weatherItem = document.querySelector(".weather__items");
const weatherCondition = document.querySelector(".weather__bottom__reference");

weatherForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  fetchWeatherData(weatherSearchInput.value);
});

document.addEventListener("DOMContentLoaded", () => {
  fetchWeatherData();
});

async function fetchWeatherData(region = "Tashkent") {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=644f6ce0ca9e401ebb891832211707&q=${region}&days=7&aqi=yes&alerts=yes`
  );

  await response
    .json()
    .then((res) => {
      if (res.error) {
        throw new Error("Bunday shahar mavjud emas");
      }
      renderWeatherData(res);
    })
    .catch((err) => {
      alert(err);
    });
}

function renderWeatherData(data) {
  console.log(data);

  weatherTitle.innerHTML = `${data.location.country}. ${data.location.name} `;
  weatherImg.src = data.current.condition.icon;
  weatherDegrees.innerHTML = `${data.current.temp_c}˚`;
  weatherCondition.textContent = data.current.condition.text;

  let forcastDayItems = "";
  data.forecast.forecastday[0].hour.forEach((el) => {
    forcastDayItems += `
    <div class="weather__item">
          <p>${el.time.split(" ")[1]}</p>
          <img src="${el.condition.icon}" alt="">
          <p>${el.temp_c}˚</p>
      </div>
  `;
  });

  weatherItem.innerHTML = forcastDayItems;
}
