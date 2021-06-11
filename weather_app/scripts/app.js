const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

const forecast = new Forecast();

const updateUI = (data) => {
  const { cityDetails, weather } = data;
  details.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
    <span>${weather.Temperature.Metric.Value}</span>
    <span>&deg;C</span>
    </div>
  `;

  //remove the d-none class
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }

  //update icon
  const iconSrc = `./images/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  //update the day/night image
  const timeSrc = weather.IsDayTime ? "./images/day.svg" : "./images/night.svg";
  time.setAttribute("src", timeSrc);

  //console.log(cityDetails, weather);
};

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  //update the ui with new city
  forecast
    .updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));

  //set local storage
  localStorage.clear();
  localStorage.setItem("city", city);
});

if (localStorage.getItem("city")) {
  forecast
    .updateCity(localStorage.getItem("city"))
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
}
