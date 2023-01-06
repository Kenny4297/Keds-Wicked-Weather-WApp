const apiKey = '0c8087e93b7bd6b5e9d6fbd5daee1b51';

//DOM variables
const body = document.getElementsByTagName("body");
const todaysWeather = document.getElementById("todays-weather");
const cityName = document.getElementById("display-city-name");
const temperature = document.getElementById("display-temperature");
const dailyHigh = document.getElementById("display-daily-high");
const dailyLow = document.getElementById("display-daily-low");
const skies = document.getElementById("display-skies")
const humidity = document.getElementById("display-humidity");
const futureInformation = document.getElementById("future-information");
const currentWeather = document.querySelector(".current-weather");
const futureInformationSection = document.querySelector(".future-information-section");
// const historyDropDown = document.getElementById("history-dropdown");
const historyDropDown = document.getElementById("history");
let historyOption = document.createElement("option");


//Buttons
const submitButton = document.getElementById("submit");
const userInput = document.getElementById("input-bar");
const futureForecastButton = document.getElementById("future-forecast-button");

//Resting Home Page
currentWeather.classList.add("hidden");
futureInformationSection.classList.add("hidden");

let count = 0;
let arrayOfHistoryItems = [];

const addToHistory = () => {
    const userPicksCity = document.getElementById("input-bar").value;
    // console.log(`User picks city: ${userPicksCity}`)

    let historyOption = document.createElement("option");
    // console.log(`HistoryOption: ${historyOption}`);

    historyOption.innerHTML = `<option id='${count}'>${userPicksCity}</option>`;
    // historyOption.innerHTML = `class='specific-history-item'>${userPicksCity}`;

    historyDropDown.appendChild(historyOption);
    arrayOfHistoryItems.push(historyOption);

    count++

    historyDropDown.addEventListener('click', (event) => {
        console.log("historyToInput event listener firing")
        let element = event.target;
        returnCurrentForecast(element);
    })
}   

const historyToInput = (event) => {
    //Get the value of the drop down bar and add an event listener to it

}

historyOption.addEventListener('click', historyToInput)

//Get the current day's forecast
const returnCurrentForecast = async (event) => {
    event.preventDefault();
    currentWeather.classList.remove("hidden");
    const userPicksCity = document.getElementById("input-bar").value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${userPicksCity}&appid=${apiKey}&units=imperial`;
    // console.log("Event Listener firing!")
    // console.log(userPicksCity);
    try {
        response = await fetch(url);
        data = await response.json();
        // console.log(data);
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

        addToHistory();
    } catch (error) {
        console.log("This didn't work")
    }
};

submitButton.addEventListener('click', returnCurrentForecast);
// Get the next five Days Forecast
const returnFiveDayForecast = async (event) => {
    console.log("firing")
    event.preventDefault();
    futureInformationSection.classList.remove("hidden");
    const userPicksCity = document.getElementById("input-bar").value;
    console.log(userPicksCity);
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${userPicksCity}&appid=${apiKey}&units=imperial`;
    console.log(`future forecast event listener firing`)
    try {
        response = await fetch(url);
        data = await response.json();
        console.log(data);
        //Array 4 is noon for the next day, (+8 for each day noon data)
        // BELOW WORKS WITHOUT ADDING ANYTHING TO THE HTML
        let generatedCols = '';
        // for (let i = 4; i <= 36; i += 8 ) {
        //     //Date: data.list[#of 3hours intervals].dt_text
        //     console.log(data.list[i].dt_txt)

        //     //Temperature: data.list[4].main.temp
        //     console.log(data.list[i].main.temp)

        //     //Daily High: data.list[i].main.temp_max
        //     console.log(data.list[i].main.temp_max)

        //     //Daily Low: data.list[i].main.temp_min
        //     console.log(data.list[i].main.temp_min)

        //     //Skies: data.list[i].weather[0].description
        //     console.log(data.list[i].weather[0].description)

        //     //Humidity: data.list[i].main.humidity
        //     console.log(data.list[i].main.humidity)
        // }
        for (let i = 3; i <= 36; i += 8 ) {
            generatedCols+= 
                `<div class="col-2">
                        <p>Date: ${data.list[i].dt_txt}</p>
                        <p>Temperature: ${data.list[i].main.temp}</p>
                        <p>Daily High: ${data.list[i].main.temp_max}</p>
                        <p>Daily Low: ${data.list[i].main.temp_min}</p>
                        <p>Skies: ${data.list[i].weather[0].description}</p>
                        <p>Humidity: ${data.list[i].main.humidity}</p>
                    </div>
                `;
            // console.log(generatedCols);

            futureInformation.innerHTML = generatedCols;
            }
        } catch (error) {
        console.log("Sorry this didn't work")
    }
};

futureForecastButton.addEventListener('click', returnFiveDayForecast);






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


