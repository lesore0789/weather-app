const weatherContainer = document.querySelector('.weather-container');
const searchInput = document.querySelector('.search input');
const searchButton = document.querySelector('.icon-button');
const weatherInfo = document.querySelector('.weather-info');
const highLow = document.querySelector('.high-low');
const moreInfo = document.querySelector('.more-info');
const error = document.querySelector('.not-found')


searchButton.addEventListener('click', displayWeather);
searchInput.addEventListener('keydown', (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    displayWeather();
  }
})


function displayWeather() {

  const APIKey = 'c18a37a23293efe6a8ec1346d7237092';
  const city = searchInput.value;

  if(city == '')
    return;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`).then(response => response.json()).then(json => {
  console.log(json)
    if(json.cod == '404') {
      weatherContainer.style.height = '400px';
      weatherInfo.classList.remove('active');
      highLow.classList.remove('active');
      moreInfo.classList.remove('active');
      error.classList.add('active');
      return
    }

    weatherContainer.style.height = '600px';
    weatherInfo.classList.add('active');
    highLow.classList.add('active');
    moreInfo.classList.add('active');
    error.classList.remove('active');

    const image = document.querySelector('.weather-icon');
    const city = document.querySelector('.city');
    const degrees = document.querySelector('.weather-degrees');
    const description = document.querySelector('.weather-description');
    const high = document.querySelector('.high');
    const low = document.querySelector('.low');
    const feelsLike = document.querySelector('.fl');
    const sunrise = document.querySelector('.sr');
    const sunset = document.querySelector('.ss');
    const humidity = document.querySelector('.hum');
    const wind = document.querySelector('.ws');

    switch (json.weather[0].main) {
      case 'Clear':
        image.src = 'icons/clear.svg';
        break;

      case 'Rain':
        image.src = 'icons/rain2.svg';
        break;

      case 'Snow':
        image.src = 'icons/snow1.svg';
        break;

      case 'Clouds':
        image.src = 'icons/cloudy2.svg';
        break;
      case 'Mist':
        image.src = 'icons/mist.svg';
        break;
      case 'Haze':
        image.src = 'icons/mist.svg';
        break;

      default:
        image.src = 'icons/sunny3.svg'

    }

    city.innerHTML = `${json.name}`;
    degrees.innerHTML = `${parseInt(json.main.temp)}<span>&deg;</span>`;
    description.innerHTML = `${json.weather[0].description}`;
    high.innerHTML = `${parseInt(json.main.temp_max)}<span>&deg;</span>`;
    low.innerHTML = `${parseInt(json.main.temp_min)}<span>&deg;</span>`;
    feelsLike.innerHTML = `${parseInt(json.main.feels_like)}<span>&deg;</span>`;
    sunrise.innerHTML = `${dayjs.unix(json.sys.sunrise).format('h:mm A')}`;
    sunset.innerHTML = `${dayjs.unix(json.sys.sunset).format('h:mm A')}`;
    humidity.innerHTML = `${json.main.humidity}%`;
    wind.innerHTML = `${parseInt(json.wind.speed)}mph`;

  })


}
