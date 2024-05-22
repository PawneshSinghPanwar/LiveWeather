console.log("Hello JS!")

const apiKey = "09fd0f826432e9c106d43799da5b4013";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search button")
const weatherIcon = document.querySelector(".weather-icon")

async function checkWeather(city) {
    const response = await fetch(apiURL + city + `&appid=${apiKey}`);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block"
        document.querySelector(".weather").style.display = "none"
    }
    else{
        document.querySelector(".error").style.display = "none"
        document.querySelector(".weather").style.display = "block"
    }

    const data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "Km/h";

    if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "images/clouds.png";
    }

    else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "images/clear.png";
    }

    else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "images/rain.png";
    }

    else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "images/drizzle.png";
    }

    else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "images/mist.png";
    }
}

searchBtn.addEventListener("click", () => {
    search();
});

searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        search();
    }
});

function search() {
    const city = searchBox.value;
    if (city) {
        checkWeather(city);
    } else {
        console.error('Please enter a city name');
    }
}


