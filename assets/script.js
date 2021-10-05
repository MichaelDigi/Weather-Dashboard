let history = document.getElementById("history");
let RealTimeWeather = document.getElementById("RtWeather");
let search = document.getElementById("searchbtn");
let API = "8bacb2a3683409af8aa1b6efbb113ea6";

search.addEventListener("click", function (event) {
  event.preventDefault();
  let searchCity = document.getElementById("search").value;
  console.log(searchCity);
  localStorage.setItem("history", searchCity);
  let city = localStorage.getItem("history");
  let button = document.createElement("button");
  button.innerText = city;
  button.classList.add("btn", "btn-outline-success");
  history.appendChild(button);

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      displayCityInfo(data);
      let lat = Object.values(data.coord)[1];
      let lon = Object.values(data.coord)[0];

      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${API}`
      )
        .then(function (reply) {
          return reply.json();
        })
        .then(function (info) {
          console.log(info);
          document.querySelector("#UvIndex").innerHTML =
            "UV Index " + info.current.uvi;
          sevenDayIcon(info);
          sevenDayTemp(info);
          sevenDayWind(info);
          SevenDayHum(info);
        });
    });
});

function displayCityInfo(info) {
  document.querySelector("#citysearched").innerHTML =
    info.name + "/" + moment().format("MMMM do, YYYY") + "-";
  document.querySelector("#temp").innerHTML = "Temp: " + info.main.temp + "℃";
  document.querySelector("#humidity").innerHTML =
    "Humidity: " + info.main.humidity + "%";
  document.querySelector("#windSpeed").innerHTML =
    "Wind speed: " + info.wind.speed + " meter/sec";
}

function sevenDay() {
  document.getElementById("date1").innerText = moment()
    .add(1, "d")
    .format("MMMM Do, YYYY");
  document.getElementById("date2").innerText = moment()
    .add(2, "d")
    .format("MMMM Do, YYYY");
  document.getElementById("date3").innerText = moment()
    .add(3, "d")
    .format("MMMM Do, YYYY");
  document.getElementById("date4").innerText = moment()
    .add(4, "d")
    .format("MMMM Do, YYYY");
  document.getElementById("date5").innerText = moment()
    .add(5, "d")
    .format("MMMM Do, YYYY");
}
sevenDay();

function sevenDayIcon(info) {
  let img1 = info.daily[0].weather[0].icon;
  let img2 = info.daily[1].weather[0].icon;
  let img3 = info.daily[2].weather[0].icon;
  let img4 = info.daily[3].weather[0].icon;
  let img5 = info.daily[4].weather[0].icon;
  document.querySelector("#img1").src =
    "http://openweathermap.org/img/wn/" + img1 + ".png";
  document.querySelector("#img2").src =
    "http://openweathermap.org/img/wn/" + img2 + ".png";
  document.querySelector("#img3").src =
    "http://openweathermap.org/img/wn/" + img3 + ".png";
  document.querySelector("#img4").src =
    "http://openweathermap.org/img/wn/" + img4 + ".png";
  document.querySelector("#img5").src =
    "http://openweathermap.org/img/wn/" + img5 + ".png";
}

function sevenDayTemp(info) {
  document.querySelector("#temp1").innerHTML =
    "Temp: " + info.daily[0].temp.day + "℃";
  document.querySelector("#temp2").innerHTML =
    "Temp: " + info.daily[1].temp.day + "℃";
  document.querySelector("#temp3").innerHTML =
    "Temp: " + info.daily[2].temp.day + "℃";
  document.querySelector("#temp4").innerHTML =
    "Temp: " + info.daily[3].temp.day + "℃";
  document.querySelector("#temp5").innerHTML =
    "Temp: " + info.daily[4].temp.day + "℃";
}

function sevenDayWind(info) {
  document.querySelector("#wind1").innerHTML =
    "Wind: " + info.daily[0].wind_speed + " m/sec";
  document.querySelector("#wind2").innerHTML =
    "Wind: " + info.daily[1].wind_speed + " m/sec";
  document.querySelector("#wind3").innerHTML =
    "Wind: " + info.daily[2].wind_speed + " m/sec";
  document.querySelector("#wind4").innerHTML =
    "Wind: " + info.daily[3].wind_speed + " m/sec";
  document.querySelector("#wind5").innerHTML =
    "Wind: " + info.daily[4].wind_speed + " m/sec";
}

function SevenDayHum(info) {
  document.querySelector("#hum1").innerHTML =
    "Humidity: " + info.daily[0].humidity + "%";
  document.querySelector("#hum2").innerHTML =
    "Humidity: " + info.daily[1].humidity + "%";
  document.querySelector("#hum3").innerHTML =
    "Humidity: " + info.daily[2].humidity + "%";
  document.querySelector("#hum4").innerHTML =
    "Humidity: " + info.daily[3].humidity + "%";
  document.querySelector("#hum5").innerHTML =
    "Humidity: " + info.daily[4].humidity + "%";
}
