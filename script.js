// This is an object called "weather" with an API key and two methods: "fetchWeather" and "displayWeather"
let weather = {
  apiKey: "e106b5cc7bd4bb56ee0d17771aea3ee6", 
  fetchWeather: function (city) { 
// This method fetches the weather data from the OpenWeatherMap API using the provided API key
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey)
// If the response from the API is not okay, then the user is alerted that no weather data was found
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
// If the response is okay, the data is returned in JSON format        
        return response.json();
      })
// The data is then passed to the "displayWeather" method      
      .then((data) => this.displayWeather(data));
  },
// This method takes the weather data returned from the API and updates the HTML page with the relevant information
  displayWeather: function (data) { 
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
   
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },

// This method takes the user input from the search bar and calls the "fetchWeather" method with the city name as an argument
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },

};

// This event listener is added to the search button to trigger the "search" method when clicked
document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

// This event listener is added to the search bar to trigger the "search" method when the "Enter" key is pressed
document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

// This line calls the "fetchWeather" method with the city name "Pune" to display the weather on the page by default
 weather.fetchWeather("Pune");

// This function displays the current date and time on the page and is called every second
function showDateTime() {
  let now = new Date();
  let day = now.toLocaleDateString("en-US", {weekday: "long"});
  let time = now.toLocaleTimeString("en-US");
  let datetimeStr = `${day}, ${time}`;
  document.getElementById("datetime").textContent = datetimeStr;
}

// This line sets the "showDateTime" function to run every second
setInterval(showDateTime, 1000);

