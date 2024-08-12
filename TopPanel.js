// Fetch current time and date
function getCurrentTimeAndDate() {
    const currentDate = new Date();
    const currentTime = currentDate.toLocaleTimeString();
    const currentDay = currentDate.toLocaleDateString();
  
    document.getElementById("current-time").textContent = currentTime;
    document.getElementById("current-date").textContent = currentDay;
  }
  
  // Fetch current weather
  function getCurrentWeather() {
    const apiKey = "3e5375e4e6b0bcf722cee713718c51b9";
    const city = "Cyberjaya";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const weatherDescription = data.weather[0].description;
        const temperature = Math.round(data.main.temp - 273.15); // Convert Kelvin to Celsius
  
        document.getElementById("current-weather").textContent = `${weatherDescription}, ${temperature}°C`;
      })
      .catch(error => {
        console.error("Error fetching weather data:", error);
      });
  }
  
  // Update time and date every second
  setInterval(getCurrentTimeAndDate, 1000);
  
  // Fetch current weather once
  getCurrentWeather();