const apiKey = '0c8087e93b7bd6b5e9d6fbd5daee1b51';

//DOM variables
const cityName = document.getElementById("display-city-name");
const displayDate = document.getElementById("display-date");
const temperature = document.getElementById("display-temperature");
const weatherIcon = document.getElementById("weather-icon");
const dailyLow = document.getElementById("display-daily-low");
const skies = document.getElementById("display-skies");
const humidity = document.getElementById("display-humidity");
const currentWeather = document.querySelector(".current-weather");
const futureInformationSection = document.querySelector(".future-information-section");
const windSpeed = document.getElementById("wind-speed");
const userInput = document.getElementById("input-bar");
const historyRow = document.querySelector(".history-row");
let userPicksCity = document.getElementById("input-bar").value;

//Setting up the user error warning
let userErrorWarning = document.createElement("p");
userErrorWarning.setAttribute("id", "user-error-warning");
userErrorWarning.innerHTML = `<p>Sorry, your request was inadequate. Either the city you entered doesn't exist in our system, or you messed up. Please try again, either with a map or a dictionary, or quite possibly, both.</p>`;
document.querySelector(".input-column").appendChild(userErrorWarning);

//Submit Button
const submitButton = document.getElementById("submit");

//Resting Home Page
document.querySelector(".future-forecast").classList.add("hidden");
currentWeather.classList.add('hidden');
historyRow.classList.add('hidden');
userErrorWarning.classList.add('hidden');

//Display to the user what happens if the city doesn't exist
const userErrorFunction = () => {
    currentWeather.classList.add('hidden');
    historyRow.classList.add('hidden');
    userErrorWarning.classList.remove('hidden');
}

//Adding the options to their history
let historyArrayOfButtons = [];
const addToHistory = (event) => {
    let userPicksCity = document.getElementById("input-bar").value;
 
    if (!(historyArrayOfButtons.includes(userPicksCity))) {
        historyArrayOfButtons.push(userPicksCity);

        //Creating a new button
        let cityHistoryButton = document.createElement("button");

        //Setting the class to that specific button
        cityHistoryButton.setAttribute("class", "history-item");

        //Adding the button text
        cityHistoryButton.innerText = `${userPicksCity}`;

        document.querySelector(".history").append(cityHistoryButton);

        //Submit button for city history
        cityHistoryButton.addEventListener('click', (event) => {
            event.preventDefault();
            completeWeatherForecast(cityHistoryButton.innerText);
        })
    }
}

//Get the current day's forecast
const returnCurrentForecast = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    try {
        response = await fetch(url);
        data = await response.json();

        //Display city name
        cityName.innerText = `${data.name}`;
        console.log(data.name)

        //Display the date
        displayDate.innerText = `${dayjs().$d.toString().substring(0, 10)}`;

        //Display Weather icon here
        weatherIcon.innerHTML = `<img src='http://openweathermap.org/img/w/${data.weather[0].icon}.png'>`

        //Display skies here
        skies.innerHTML = `${data.weather[0].description}`

        //Display temperature
        temperature.innerHTML = `Current Temperature: ${data.main.temp}&deg;F`;

        //Display humidity
        humidity.innerText = `Humidity: ${data.main.humidity}%`;

        //Display Wind Speed
        windSpeed.innerText = `Wind Speed: ${data.wind.speed}mph`;

        addToHistory();

    } catch (error) {
        userErrorFunction();
    }
};

// Get the next five Days Forecast
const returnFiveDayForecast = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
    try {
        response = await fetch(url);
        data = await response.json();

        //Creating the future forecast section
        let generatedCols = '';
        for (let i = 3; i <= 36; i += 8 ) {
            generatedCols+= 
            `<div class="card future-forecast-css">
                <p><u>${data.list[i].dt_txt.substring(0, 10)}</u></p>
                <p>Temperature: ${data.list[i].main.temp}&deg;F</p>
                <img class="icon-images" src='http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png'>
                <p class="skies-description">Skies: ${data.list[i].weather[0].description}</p>
                <p>Humidity: ${data.list[i].main.humidity}</p>
            </div>
            `;
            // col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mx-0 my-0 
            futureInformationSection.innerHTML = generatedCols;
            }
        } catch (error) {
    }
};

//The single function for running both current and future forecast
const completeWeatherForecast = async (userPicksCity) => {
    currentWeather.classList.remove('hidden');

    historyRow.classList.remove('hidden');

    userErrorWarning.classList.add("hidden");

    let firstPromise = await returnCurrentForecast(userPicksCity);
    let secondPromise = await returnFiveDayForecast(userPicksCity);
};


//Submit button event listener
submitButton.addEventListener('click', (event) => {
    event.preventDefault();

    let userPicksCity = document.getElementById("input-bar").value;

    completeWeatherForecast(userPicksCity);
});

