document.querySelector(".btn").addEventListener("click", function (c) {
    c.preventDefault();

    let weatherIcon = document.querySelector(".weather-icon");
    let city = document.querySelector(".input-city").value;
    let id = "6637ac61cd710c6d04d79e055c9e877a";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${id}`;
    let n = "North", e = "East";

    document.querySelector(".buffering").style.display = "block";

    fetch(url)
      .then(i => {
        // console.log(i)
        if (!i.ok) {
          document.querySelector(".err").style.display = "block";
          document.querySelector(".weather-detail").style = "visibility: hidden"
        }
        return i.json()
      })
      .then(i => {

        document.querySelector(".buffering").style.display = "none";

        document.querySelector(".temp").innerHTML = `${Math.round((i.main.temp) - 273.15)}°C`;
        document.querySelector(".city").innerHTML = `${i.name}`
        document.querySelector(".wind").innerHTML = `${i.wind.speed} km/h`
        document.querySelector(".humidity").innerHTML = `${i.main.humidity} %`

        if (i.coord.lat < 0) { n = "South" }
        if (i.coord.lon < 0) { e = "West" }

        document.querySelector(".lat").innerHTML = `Latitude : <strong>${i.coord.lat}&deg; ${n}</strong>`
        document.querySelector(".lon").innerHTML = `Longitude : <strong>${i.coord.lon}&deg; <strong>${e}</strong>`
        document.querySelector(".err").style.display = "none";
        document.querySelector(".weather-detail").style = "visibility: visible"

        console.log(i);

        if (i.weather[0].main == "Clouds" || i.weather[0].main == "Haze") {
          weatherIcon.src = "Images/clouds.png";
          document.querySelector(".card").style.background = "linear-gradient(135deg,#74978e, #8a8895)";
        }
        else if (i.weather[0].main == "Clear") {
          weatherIcon.src = "Images/clear.png";
          document.querySelector(".card").style.background = "linear-gradient(135deg,#f39df3, #e5ac6b)";
          document.querySelector(".card").style.color = "#3e3e3e";
        }
        else if (i.weather[0].main == "Snow") {
          weatherIcon.src = "Images/snow.png";
          document.querySelector(".card").style.background = "linear-gradient(135deg,#a3f3f3, #b3e3e3)";
          document.querySelector(".card").style.color = "#3e3e3e";
        }
        else if (i.weather[0].main == "Rain") {
          weatherIcon.src = "Images/rain.png";
        }
        else if (i.weather[0].main == "Drizzle") {
          weatherIcon.src = "Images/drizzle.png";
        }
        else if (i.weather[0].main == "Mist") {
          weatherIcon.src = "Images/mist.png";
        }
      })

  })