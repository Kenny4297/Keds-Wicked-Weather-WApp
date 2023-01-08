const apiKey = '0c8087e93b7bd6b5e9d6fbd5daee1b51';

//DOM variables
const body = document.getElementsByTagName("body");
const todaysWeather = document.getElementById("todays-weather");
const cityName = document.getElementById("display-city-name");
const displayDate = document.getElementById("display-date");
const temperature = document.getElementById("display-temperature");
const weatherIcon = document.getElementById("weather-icon");

const dailyHigh = document.getElementById("display-daily-high");
const dailyLow = document.getElementById("display-daily-low");
const skies = document.getElementById("display-skies");
const humidity = document.getElementById("display-humidity");
const futureInformation = document.getElementById("future-information");
const currentWeather = document.querySelector(".current-weather");
const futureInformationSection = document.querySelector(".future-information-section");
const windSpeed = document.getElementById("wind-speed");
const historyDropDown = document.getElementById("history");
let historyOption = document.createElement("option");
const userInput = document.getElementById("input-bar");
const historyRow = document.querySelector(".history-row");

let userPicksCity = document.getElementById("input-bar").value;
//Buttons
const submitButton = document.getElementById("submit");

//Resting Home Page
// futureInformationSection.classList.add("hidden");
document.querySelector(".future-forecast").classList.add("hidden");

let count = 0;

currentWeather.classList.add('hidden');
historyRow.classList.add('hidden');

// let arrayOfHistoryItems = [];

let historyArrayOfButtons = [];

const addToHistory = (event) => {
    // event.preventDefault();

    let userPicksCity = document.getElementById("input-bar").value;
 
    if (!(historyArrayOfButtons.includes(userPicksCity))) {
        //Adding the city to the array of buttons so the history buttons do not keep repeating the same city
        historyArrayOfButtons.push(userPicksCity);


        //Creating a new button
        let cityHistoryButton = document.createElement("button");
            // console.log(cityHistoryButton);


        //Setting the class to that specific button
        cityHistoryButton.setAttribute("class", "history-item");
            console.log(cityHistoryButton);


        //Adding the button text
        cityHistoryButton.innerText = `${userPicksCity}`;
            console.log(cityHistoryButton);


        // cityHistoryButton.innerHTML = `<button class="history-item">${userPicksCity}</button>`;
        //     console.log(cityHistoryButton);
        document.querySelector(".history").append(cityHistoryButton);

        //Submit button for city history
        cityHistoryButton.addEventListener('click', (event) => {
            event.preventDefault();
            console.log(`city history button: ${cityHistoryButton.innerText}`)
            completeWeatherForecast(cityHistoryButton.innerText);
        })
    }
}


//===============================================================================

//Get the current day's forecast
const returnCurrentForecast = async (city) => {
    // event.preventDefault();

    // let city = document.getElementById("input-bar").value;
    // console.log(`User picks city line 61 test: ${userPicksCity}`);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    // console.log("Today's Weather Event Listener firing!")
    // console.log(userPicksCity);
    try {
        response = await fetch(url);
        data = await response.json();
        // console.log(data);

        //Display city name
        cityName.innerText = `${data.name}`;
        console.log(data.name)

        //Display the date
        displayDate.innerText = `${dayjs().$d.toString().substring(0, 10)}`;
        // console.log(dayjs().$d.toString().substring(0, 6))

        //Display Weather icon here
        weatherIcon.innerHTML = `<img src='http://openweathermap.org/img/w/${data.weather[0].icon}.png'>`
        //Display skies here
        skies.innerHTML = `${data.weather[0].description}`

        //Display temperature
        temperature.innerHTML = `Current Temperature: ${data.main.temp}&deg;F`;
        // console.log(data.main.temp)

        //Display humidity
        humidity.innerText = `Humidity: ${data.main.humidity}%`;
        // console.log(data.main.humidity)


        //Display Wind Speed
        windSpeed.innerText = `Wind Speed: ${data.wind.speed}mph`;
        // console.log(data.wind.speed)

        // addToHistory(userPicksCity);
    } catch (error) {
        console.log("This didn't work")
    }
};

// Get the next five Days Forecast
const returnFiveDayForecast = async (city) => {
    // console.log("firing")
    // event.preventDefault();
    
    let userPicksCity = document.getElementById("input-bar").value;
    // console.log(userPicksCity);
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
    // console.log(`future forecast event listener firing`)
    try {
        response = await fetch(url);
        data = await response.json();
        //Array 4 is noon for the next day, (+8 for each day noon data)
        // BELOW WORKS WITHOUT ADDING ANYTHING TO THE HTML

        console.log(data);
        let generatedCols = '';
        for (let i = 3; i <= 36; i += 8 ) {
            generatedCols+= 
            `<div class="card col-sm-2 mx-1 my-1 future-forecast-css" style="width: 18rem;">
                <p><u>Date: ${data.list[i].dt_txt.substring(0, 10)}</u></p>
                <p>Temperature: ${data.list[i].main.temp}&deg;F</p>
                <img class="icon-images" src='http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png'>
                <p>Skies: ${data.list[i].weather[0].description}</p>
                <p>Humidity: ${data.list[i].main.humidity}</p>
            </div>
            `;




                // `<div class="col-sm-4 future-forecast-css">
                //         <p><u>Date: ${data.list[i].dt_txt.substring(0, 10)}</u></p>
                //         <p>Temperature: ${data.list[i].main.temp}&deg;F</p>
                //         <img src='http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png'>
                //         <p>Skies: ${data.list[i].weather[0].description}</p>
                //         <p>Humidity: ${data.list[i].main.humidity}</p>
                //     </div>
                // `;
            // console.log(generatedCols);

            futureInformationSection.innerHTML = generatedCols;
            }
        // addToHistory();
        } catch (error) {
        console.log("Sorry this didn't work")
    }
};

// futureForecastButton.addEventListener('click', returnFiveDayForecast);

const completeWeatherForecast = async (userPicksCity) => {
    // event.preventDefault();
    currentWeather.classList.remove('hidden');

    historyRow.classList.remove('hidden');


    console.log("Complete weather function firing")
    let firstPromise = await returnCurrentForecast(userPicksCity);
    // console.log(`The first promise returned is: ${firstPromise}`)
    let secondPromise = await returnFiveDayForecast(userPicksCity);
    // let userPicksCity = document.getElementById("input-bar").value;
    addToHistory();
    // console.log(`User Picks City: ${userPicksCity}`)
}

//Regular button
submitButton.addEventListener('click', (event) => {
    event.preventDefault();

    let userPicksCity = document.getElementById("input-bar").value;

    completeWeatherForecast(userPicksCity)
});




    








//Event listener for history
// historyArrayOfButtons.forEach(button => {
//     button.addEventListener('click', () =>)
// })
