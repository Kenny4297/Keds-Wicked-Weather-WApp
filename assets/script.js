const apiKey = '0c8087e93b7bd6b5e9d6fbd5daee1b51';

//DOM variables
const body = document.getElementsByTagName("body");
const todaysWeather = document.getElementById("todays-weather");
const cityName = document.getElementById("display-city-name");
const displayDate = document.getElementById("display-date");
const temperature = document.getElementById("display-temperature");
const weatherIcon = document.getElementById("weather-icon")
const dailyHigh = document.getElementById("display-daily-high");
const dailyLow = document.getElementById("display-daily-low");
const skies = document.getElementById("display-skies")
const humidity = document.getElementById("display-humidity");
const futureInformation = document.getElementById("future-information");
const currentWeather = document.querySelector(".current-weather");
const futureInformationSection = document.querySelector(".future-information-section");
const windSpeed = document.getElementById("wind-speed");
// const historyDropDown = document.getElementById("history-dropdown");
const historyDropDown = document.getElementById("history");
let historyOption = document.createElement("option");
const userInput = document.getElementById("input-bar");

// let userPicksCity = "test test";


//Buttons
const submitButton = document.getElementById("submit");

//Resting Home Page
// futureInformationSection.classList.add("hidden");
document.querySelector(".future-forecast").classList.add("hidden");

let count = 0;

let arrayOfHistoryItems = [];

let historyArrayOfButtons = Array.from([]);


//! Old way in case I mess things up
// const addToHistory = (userPicksCity) => {
//                 console.log("addToHistory function firing")
//                 console.log(`UserPicksCity is: ${userPicksCity}`)
//     if (!(historyArrayOfButtons.includes(userPicksCity))) {
//                 console.log("If statement check")
//                 console.log(historyArrayOfButtons)
//         let historyButton = document.createElement("button");
//         historyButton.setAttribute("id", `${userPicksCity.split(' ').join("-")}`);
//         historyArrayOfButtons.push(historyButton);
//                 console.log(historyButton);
//                 // console.log(`the History Array of Buttons are: ${historyArrayOfButtons}`);
//         historyButton.innerText = `${userPicksCity}`;
//         document.querySelector(".col-12").appendChild(historyButton);
//     }
// }

const addToHistory = (userPicksCity) => {
            console.log("add to history function firing")
    if (!(historyArrayOfButtons.includes(userPicksCity))) {
        let button = document.createElement("button");
        button.setAttribute("id", `${userPicksCity.split(' ').join("-")}`);
        button.innerText = `${userPicksCity}`;
        historyArrayOfButtons.push(button);
                console.log(`History array of buttons: ${historyArrayOfButtons}`);
        document.querySelector(".col-12").appendChild(button);
    }
}

Array.from(historyArrayOfButtons).forEach(button => {
    console.log("Event listener for history buttons firing")
    button.addEventListener('click', (event) => {
        let buttonName = event.target.id;
        completeWeatherForecast(buttonName);
    })
})

//Get the current day's forecast
const returnCurrentForecast = async (event) => {
    // event.preventDefault();

    let userPicksCity = document.getElementById("input-bar").value;
    // console.log(`User picks city line 61 test: ${userPicksCity}`);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${userPicksCity}&appid=${apiKey}&units=imperial`;
    // console.log("Today's Weather Event Listener firing!")
    // console.log(userPicksCity);
    try {
        response = await fetch(url);
        data = await response.json();
        console.log(data);

        // city name 
        //&  data.name

        // the date 
        //& dayjs().$d.substring(0, 6) ((May have to adjust second argument number))

        // an icon representation of weather conditions 
        //& self-explanatory

        // the temperature 
        //& data.main.temp

        // the humidity 
        //& data.main.humidity

        //wind speed
        //& data.wind[0]


        //Display city name
        cityName.innerText = `${data.name}`;
        console.log(data.name)

        //Display the date
        displayDate.innerText = `${dayjs().$d.toString().substring(0, 10)}`;
        console.log(dayjs().$d.toString().substring(0, 6))

        //Display Weather icon here

        //Display temperature
        temperature.innerText = `Current Temperature (F): ${data.main.temp}`;
        console.log(data.main.temp)

        //Display humidity
        humidity.innerText = `Humidity: ${data.main.humidity}%`;
        console.log(data.main.humidity)


        //Display Wind Speed
        windSpeed.innerText = `Wind Speed: ${data.wind.speed}mph`;
        console.log(data.wind.speed)





        // addToHistory(userPicksCity);
    } catch (error) {
        console.log("This didn't work")
    }
};

// Get the next five Days Forecast
const returnFiveDayForecast = async (event) => {
    // console.log("firing")
    // event.preventDefault();
    
    let userPicksCity = document.getElementById("input-bar").value;
    // console.log(userPicksCity);
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${userPicksCity}&appid=${apiKey}&units=imperial`;
    // console.log(`future forecast event listener firing`)
    try {
        response = await fetch(url);
        data = await response.json();
        //Array 4 is noon for the next day, (+8 for each day noon data)
        // BELOW WORKS WITHOUT ADDING ANYTHING TO THE HTML

        // console.log(data);
        let generatedCols = '';
        for (let i = 3; i <= 36; i += 8 ) {
            generatedCols+= 
                `<div class="col-sm-4">
                        <p>Date: ${data.list[i].dt_txt.substring(0, 10)}</p>
                        <p>Temperature: ${data.list[i].main.temp}</p>
                        <p>Skies: ${data.list[i].weather[0].description}</p>
                        <p>Humidity: ${data.list[i].main.humidity}</p>
                    </div>
                `;
            // console.log(generatedCols);

            futureInformationSection.innerHTML = generatedCols;
            }
        // addToHistory();
        } catch (error) {
        console.log("Sorry this didn't work")
    }
};

// futureForecastButton.addEventListener('click', returnFiveDayForecast);


const completeWeatherForecast = async (event) => {
    event.preventDefault();
    // console.log("Complete weather function firing")
    let firstPromise = await returnCurrentForecast();
    // console.log(`The first promise returned is: ${firstPromise}`)
    let secondPromise = await returnFiveDayForecast();
    let userPicksCity = document.getElementById("input-bar").value;
    addToHistory(userPicksCity);
    // console.log(`User Picks City: ${userPicksCity}`)
}

submitButton.addEventListener('click', completeWeatherForecast);




//Event listener for history
// historyArrayOfButtons.forEach(button => {
//     button.addEventListener('click', () =>)
// })
