document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('city-input')
    const getWeatherBtn = document.getElementById('get-weather-btn')
    const weatherInfo = document.getElementById('weather-info')
    const cityName = document.getElementById('city-name')
    const temperatureDisplay = document.getElementById('temperature')
    const descriptionDisplay = document.getElementById('description')
    const errorMsg = document.getElementById('error-message')

    const API_KEY = "8a64ea2588176864ce2edd6e94339480"   // env variable

    getWeatherBtn.addEventListener('click', async () => {
        const city = cityInput.value.trim()
        if(!city) return;

        // the server/database u r making request to may throw an error
        // the server/database resides in another continent

        try {
           const weatherData = await fetchWeatherData(city)
           displayData(weatherData)
        } catch (error) {
            showErrorMsg()
        }

        // ****** web request using API ******

        async function fetchWeatherData(city) {
            // fetch data
            const url = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}`
            const response = await fetch(url)
            console.log(typeof response);
            console.log('RESPONSE is ', response);

            if(!response) {
                throw new Error("city not found");
                
            }
            const info = await response.json()
            return info
        }

        function displayData(data) {
            // show the data
            console.log(data);

            const {city, main, weather} = data
            city.textContent = cityName
            temperatureDisplay.textContent = `temperature: ${main.temp}`
            descriptionDisplay.textContent = `weather: ${weather[0].description}`
            

            weatherInfo.classList.remove('hidden')
            errorMsg.classList.add('hidden')
        }

        function showErrorMsg() {
            weatherInfo.classList.remove('hidden')
            errorMsg.classList.add('hidden')
        }
    })
})