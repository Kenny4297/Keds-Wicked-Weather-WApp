const apiKey = 'ad2cae37ac5c021fea8ed5bec3928079';

const kelvinToFahrenheit = (temp) => {
    return Math.round(1.8 * (temp-273) + 32, 2);
}

//DOM variables
const cityName = document.getElementById("display-city-name");
const temperature = document.getElementById("display-temperature");
const submitButton = document.getElementById("submit");
const userInput = document.getElementById("input-bar");


awaitFunctionInsteadOfPromise = async () => {
    event.preventDefault();
    const userPicksCity = document.getElementById("input-bar").value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${userPicksCity}&appid=${apiKey}`;
    console.log("Event Listener firing!")
    console.log(userPicksCity);
    try {
        response = await fetch(url);
        data = await response.json();
        console.log(data);
        cityName.innerText = data.name;
        console.log(data.main.temp)
        temperature.innerText = kelvinToFahrenheit(data.main.temp);
    } catch (error) {
        console.log("This didn't work")
}
};

submitButton.addEventListener('click', () => awaitFunctionInsteadOfPromise());

