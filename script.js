

//Getting Current Location and Weather data
async function getDataOfCurrentLocation(latitude, longitude) {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=aa40ba8fe3484d62b88170853232210&q=${latitude},${longitude}&aqi=yes`);
    const resp_data = await response.json();
    console.log(resp_data);
    return resp_data;
}
//success callback function of navigator
async function successFetch(resp_location) {
    console.log(resp_location);

    const lat = resp_location.coords.latitude;
    const long = resp_location.coords.longitude;

    const data = await getDataOfCurrentLocation(lat, long);
    //print weather of current location
    printWeather(data);
}
//failure callBack of Navigator 
function failToFetch() {
    console.log("failed To Fetch Your Current Location")
}
//when window load we fetch our current location 
window.addEventListener("load", () => {
    const location = navigator.geolocation.getCurrentPosition(successFetch, failToFetch);
})


//Getting City Name from User input and Dispaly Weather Details
const input = document.getElementById("city-name");
const btn = document.getElementById("clickBtn");


async function getData(city) {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=aa40ba8fe3484d62b88170853232210&q=${city}&aqi=yes`);
    const resp_data = await response.json();
    console.log(resp_data);
    return resp_data;
}

btn.addEventListener("click", async () => {
    try {
        const city = input.value;
        const data = await getData(city);
        printWeather(data);
        //clearing input field after search
        input.value = null;
    } catch {
        console.error("Error fetching weather data:", error);
    }
});
function printWeather(response) {
    document.getElementById("city").innerText = "City-Name: " + response.location.name;
    //Also changing the heading name
    let heading = document.querySelector("h3");
    heading.innerHTML = `Weather Information Of <span style="
    color: blue; 
    padding: 1px 15px;
    display: inline-block;
    border: 2px dashed #5c2718;
    border-radius: 25px;">
    ${response.location.name}</span><hr>`;
    
    document.getElementById("region").innerText = "Region: " + response.location.region;
    document.getElementById("time").innerText = "local-Time: " + response.location.localtime;
    document.getElementById("temp").innerText = "Temperature: " + response.current.temp_c + "℃";
    document.getElementById("humidity").innerText = "humidity: " + response.current.humidity;
    document.getElementById("weather-cond").innerText = "Weather: " + response.current.condition.text;
    document.getElementById("wind").innerText = "wind-Speed: " + response.current.wind_kph;
    
}

