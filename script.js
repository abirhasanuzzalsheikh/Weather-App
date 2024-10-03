const searchInput = document.querySelector('.search-input');
const currentWeatherDiv = document.querySelector('.current-weather');
const hourlyWeatherDiv = document.querySelector('.hourly-weather .weather-list');

const API_KEY = '44753763a6be4204a1492957240210';
const weatherCode = {
    clear:[1000],
    clouds:[1003,1006,1009],
    mist:[1030,1135,1147],
    rain:[1063,1150,1168,1171,1180,1183,1198,1201,1240,1243,1246,1276],
    moderate_heavy_rain:[1186,1189,1192,1195,1243,,1246],
    snow:[1066,1069,1072,1114,1117,1204,1207,1210,1213,1216,1219,1222,1225,1237,1249,1252,1255,1258,1261,1264,1279,1282],
    thunder:[1087,1279,1282],
    thunder_rain:[1273,1276]
}

function displayHourlyForecast(hourlyData){
    const currentHour = new Date().setMinutes(0,0,0);
    const next24Hours = currentHour + 24 * 60 * 60 * 1000;

    const next24HoursData = hourlyData.filter(({time})=> {
        const forecastTime = new Date(time).getTime();
        return forecastTime >= currentHour && forecastTime <= next24Hours;
    });

    hourlyWeatherDiv.innerHTML = next24HoursData.map(item => {
    const temperature = Math.floor(item.temp_c);
    const time = item.time;
    const weatherIcon = Object.keys(weatherCode).find(icon=> weatherCode[icon].includes(item.condition.code));

    return ` <li class="weather-item">
                        <p class="time">${time}</p>
                        <img src="iconImage/${weatherIcon}.svg" class="weather-icon">
                        <p class="tempareture">${temperature}&deg;</p>
                    </li>`;
  }).join('');;
}

async function getWeatherDetails(cityName){
    const API_URL = ` http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=2`;

    try{
        const response = await fetch(API_URL);
        const data = await response.json();

        const temperature = Math.floor(data.current.temp_c);
        const description = data.current.condition.text;
        const weatherIcon = Object.keys(weatherCode).find(icon=> weatherCode[icon].includes(data.current.condition.code));


        currentWeatherDiv.querySelector('.temperature').innerHTML = `${temperature}<span>&deg;C</span>`;
        currentWeatherDiv.querySelector('.weather-icon').src = `iconImage/${weatherIcon}.svg`;
        currentWeatherDiv.querySelector('.descriptions').innerText = description;


        const combinedHourlyData = [...data.forecast.forecastday[0].hour, ...data.forecast.forecastday[1].hour];
       displayHourlyForecast(combinedHourlyData);
    } catch(error){
        console.log(error);
    }
}

searchInput.addEventListener('keyup', (e)=>{
    const cityName = searchInput.value.trim();

    if(e.key === 'Enter' && cityName){
       getWeatherDetails(cityName)
    }
})