const apiKey = '0c8087e93b7bd6b5e9d6fbd5daee1b51';

//DOM variables
const todaysWeather = document.getElementById("todays-weather");
const cityName = document.getElementById("display-city-name");
const temperature = document.getElementById("display-temperature");
const dailyHigh = document.getElementById("display-daily-high");
const dailyLow = document.getElementById("display-daily-low");
const skies = document.getElementById("display-skies")
const humidity = document.getElementById("display-humidity")

//Buttons
const submitButton = document.getElementById("submit");
const userInput = document.getElementById("input-bar");
const futureForecastButton = document.getElementById("future-forecast-button");


//Get the current day's forecast
const returnCurrentForecast = async (event) => {
    event.preventDefault();
    const userPicksCity = document.getElementById("input-bar").value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${userPicksCity}&appid=${apiKey}&units=imperial`;
    console.log("Event Listener firing!")
    console.log(userPicksCity);
    try {
        response = await fetch(url);
        data = await response.json();
        console.log(data);
        //Display the title
        todaysWeather.innerText = "Todays Weather:"

        //Display the current temperature
        temperature.innerText = `Current Temperature (F): ${data.main.temp}`;

        //Display the daily high
        dailyHigh.innerText = `High: ${data.main.temp_max}`

        //Display the daily Low
        dailyLow.innerText = `Low: ${data.main.temp_min}`

        //Display the skies
        skies.innerText = `Skies: ${data.weather[0].description}`

        //Display Humidity
        humidity.innerText = `Humidity: ${data.main.humidity}%`


        //Display the current 'forecast' (rain, sen, ect)
    } catch (error) {
        console.log("This didn't work")
    }
};

submitButton.addEventListener('click', returnCurrentForecast);

// Get the next five Days Forecast
const returnFiveDayForecast = async () => {
    event.preventDefault();
    const userPicksCity = document.getElementById("input-bar").value;
    console.log(userPicksCity);
    const url = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${userPicksCity}&cnt=5&appid=${apiKey}`;
    console.log(`future forecast event listener firing`)
    try {
        response = await fetch(url);
        data = await response.json();
        console.log(data);
        // let generatedCol = '';
        //HOW TO GET THE FIRST 5 DAYS Forecast
            //Temperature -> data.list[count].
    } catch (error) {
        console.log("Sorry this didn't work")
    }
};

futureForecastButton.addEventListener('click', () => returnFiveDayForecast());



//Response example
// {
//     "coord": {
//       "lon": 10.99,
//       "lat": 44.34
//     },
//     "weather": [
//       {
//         "id": 501,
//         "main": "Rain",
//         "description": "moderate rain",
//         "icon": "10d"
//       }
//     ],
//     "base": "stations",
//     "main": {
//       "temp": 298.48,
//       "feels_like": 298.74,
//       "temp_min": 297.56,
//       "temp_max": 300.05,
//       "pressure": 1015,
//       "humidity": 64,
//       "sea_level": 1015,
//       "grnd_level": 933
//     },
//     "visibility": 10000,
//     "wind": {
//       "speed": 0.62,
//       "deg": 349,
//       "gust": 1.18
//     },
//     "rain": {
//       "1h": 3.16
//     },
//     "clouds": {
//       "all": 100
//     },
//     "dt": 1661870592,
//     "sys": {
//       "type": 2,
//       "id": 2075663,
//       "country": "IT",
//       "sunrise": 1661834187,
//       "sunset": 1661882248
//     },
//     "timezone": 7200,
//     "id": 3163858,
//     "name": "Zocca",
//     "cod": 200
//   }


