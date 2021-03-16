let formSearchCity = document.querySelector('#search-city');
let formSearchCountry = document.querySelector('#search-country')
let formButton = document.querySelector('.form_button')
let contentCountry = document.querySelector('.content_country');
let contentCity = document.querySelector('.content_city');
let contentTemperature = document.querySelector('.content_temperature');
let contentSpeed = document.querySelector('.content_speed');
let contentHumidity = document.querySelector('.content_humidity');
let userPosition = document.querySelector('.user_position')
let selectedWeather = document.querySelector('.selected-weather')
let containerWeatherItem = document.querySelector('.container_weather_item')
 
async function getApi(city,country){
    try{
        let response = await fetch(`//api.weatherstack.com/current?access_key=4f1356484237009b61987ec98869b062&query=${city},${country}`);
        let data = await response.json()
        console.log(data)
        createContent(data);
    }
    catch(err){
        console.log(`${err} ошибка`)
    }
};

formButton.addEventListener('click',(event)=>{
    event.preventDefault()
    
    getApi(formSearchCity.value,formSearchCountry.value);
    formSearchCity.value = ""
    formSearchCountry.value = ""
    document.querySelector('.content').style.display = 'block';
    document.querySelector('.my-weather').style.display = 'none';
});

userPosition.addEventListener('click',()=>{
    navigator.geolocation.getCurrentPosition(
        function(position) {
            getApi(position.coords.latitude,position.coords.longitude)
        }
    );
})

function createContent (data){
    contentCountry.textContent = data.location.country;
    contentCity.textContent = `Weather in ${data.location.name}`;
    contentTemperature.textContent = `${data.current.temperature} °C`;
    contentHumidity.textContent = `Humidity: ${data.current.humidity} %`;
    contentSpeed.textContent = `Wind Speed: ${data.current.wind_speed} km/h`;  
    
    saveContent(data)
}

function saveContent(data){
   let storage = JSON.parse(localStorage.getItem('storageId') || "[]") 
   let obj = {
       country: data.location.country,
       city: data.location.name,
       temperature: data.current.temperature,
       humidity: data.current.humidity,
       windSpeed: data.current.wind_speed
   }

   let tr = true
   storage.forEach(el=>{
       if(el.city == obj.city){
        tr = false
       }
   })

   if(tr && storage.length < 5){
       storage.push(obj)
   }
   localStorage.setItem('storageId',JSON.stringify(storage))
}

function showSaveContent(){
    let storage = JSON.parse(localStorage.getItem('storageId'))
    let weatherItems = document.querySelectorAll('.block_weather_item')

    if(storage == null){
        console.log(('You are empty storage'))
        return
    }else if(weatherItems.length < storage.length){
        containerWeatherItem.innerHTML =''
        storage.forEach(el=>{
        let content = document.createElement('div')
        content.className = "block_weather_item"
        content.innerHTML = `
        <div class="weather_item">${el.country}  </div>
        <div class="weather_item">${el.city}:</div>
        <div class="weather_item">${el.temperature}°C</div>
        <div class="weather_item">Humidity: ${el.humidity}%</div>
        <div class="weather_item">Wind Speed: ${el.windSpeed} km/h</div>
    `
    containerWeatherItem.append(content)
    })}
    document.querySelector('.my-weather').style.display = 'block'  
}

document.querySelector('.button-clear').addEventListener('click',()=>{
    containerWeatherItem.innerHTML =''
    localStorage.clear()
    document.querySelector('.my-weather').style.display = 'none'
    document.querySelector('.content').style.display = 'block'
})

selectedWeather.addEventListener('click',()=>{
    showSaveContent()
    if(localStorage.getItem('storageId') !== null){
        document.querySelector('.content').style.display = 'none'
    }
})


