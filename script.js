const searchInput = document.querySelector('.search-input');

const API_KEY = '44753763a6be4204a1492957240210';

async function getWeatherDetails(cityName){
    const API_URL = ` http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}`;

    try{
        const response = await fetch(API_URL);
        const data = await response.json();

        console.log(data);
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