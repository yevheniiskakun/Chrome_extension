

let image_url;
let bare_url;
let description_text;

let lon;
let lat;
let temperature = document.querySelector(".temp");
let summary = document.querySelector(".summary");
let loc = document.querySelector(".location");
let icon = document.querySelector(".icon");
const kelvin = 273;

quote_list = ["What you spend years building may be destroyed overnight. Build anyway", "This isn't about the past! It's about the future!", "If at first you don't succeed... succeed later than originally planned.", "Never dig straight down", "Keep calm and play Minecraft"];


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      //console.log(position);
      lon = position.coords.longitude;
      lat = position.coords.latitude;
  
      // API ID
      const api = "6d055e39ee237af35ca066f35474e9df";
  
      // API URL
      const base =
`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&` +
`lon=${lon}&appid=6d055e39ee237af35ca066f35474e9df`;
  
      // Calling the API
      fetch(base)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          //console.log(data);
          temperature.textContent = 
              Math.floor(data.main.temp - kelvin) + '';
          
          //loc.textContent = data.name + ", " + data.sys.country;

          let weather_description = data.weather[0].description;


          function create_url(random_int){
            if(weather_description.includes("clouds") == true){
              bare_url = 'Clouds/' + random_int + '.png';
              image_url = "url('Clouds/" + random_int + ".png')"
              description_text = 'clouds';
            }else if(weather_description.includes("snow") == true){
              bare_url = 'Snow/' + random_int + '.png';
              image_url = "url('Snow/" + random_int + ".png')";
              description_text = 'snow';
            }else if(weather_description.includes("rain") == true){
              bare_url = 'Rain/' + random_int + '.png';
              image_url = "url('Rain/" + random_int + ".png')";
              description_text = 'rain';
            }else if(weather_description.includes("mist") == true){
              bare_url = 'Mist/' + random_int + '.png';
              image_url = "url('Mist/" + random_int + ".png')";
              weather_description = 'mist';
            }else if(weather_description.includes("clear") == true){
              bare_url = 'Clear/' + random_int + '.png';
              image_url = "url('Clear/" + random_int + ".png')"
              description_text = 'clear sky';
            }else if(weather_description.includes("thunderstorm") == true){
              bare_url = 'Thunderstorm/' + random_int + '.png';
              image_url = "url('Thunderstorm/" + random_int + ".png')";
              description_text = "thunderstorm";
            }
            document.getElementById("summary").innerHTML = description_text;
            let quote_random_int = getRandomInt(0, 10);
            if(quote_list[quote_random_int] == undefined){
              document.getElementById("quote").innerHTML = quote_list[1];
            }else{
              document.getElementById("quote").innerHTML = quote_list[quote_random_int];
            }
           
          }

         

          let random_int = getRandomInt(0, 10);
          //console.log("Random number", random_int)
          create_url(random_int);

        // Check if image exist
        fetch(bare_url, { method: 'HEAD' })
        .then(res => {
            if (res.ok) {
              document.body.style.backgroundImage = image_url; // if exist show it
            } else {
                console.log('Image does not exist.');
            }
        }).catch((err) => {                                    // if not   
          random_int = getRandomInt(0, 1);                     // search for another
          create_url(random_int);
          document.body.style.backgroundImage = image_url;
        });
        // -------------------------------------
          
          document.body.style.backgroundRepeat = "no-repeat";
          document.body.style.backgroundSize = "100% 100%";
        });
    });
  }
});
