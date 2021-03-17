import { getApi } from './getApi.js';


export function createContent (data){
    document.querySelector('.content_country').textContent = data.location.country;
    document.querySelector('.content_city').textContent = `Weather in ${data.location.name}`;
    document.querySelector('.content_temperature').textContent = `${data.current.temperature} °C`;
    document.querySelector('.content_humidity').textContent = `Humidity: ${data.current.humidity} %`;
    document.querySelector('.content_speed').textContent = `Wind Speed: ${data.current.wind_speed} km/h`;  
    
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
    let weatherItems = document.querySelectorAll('.block_weather_item');
    let containerWeatherItem = document.querySelector('.container_weather_item')

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

function callButton(){
    let formButton = document.querySelector('.form_button');
    let userPosition = document.querySelector('.user_position');
    let selectedWeather = document.querySelector('.selected-weather');
    let content = document.querySelector('.content');
    let blockSaveWeather = document.querySelector('.my-weather');

    formButton.addEventListener('click',(event)=>{
        let formSearchCity = document.querySelector('#search-city');
        let formSearchCountry = document.querySelector('#search-country')
        
        event.preventDefault()
        getApi(formSearchCity.value,formSearchCountry.value);
        formSearchCity.value = ""
        formSearchCountry.value = ""
        content.style.display = 'block';
        blockSaveWeather.style.display = 'none';
    });

    userPosition.addEventListener('click',()=>{
        navigator.geolocation.getCurrentPosition(
            function(position) {
                getApi(position.coords.latitude,position.coords.longitude)
            }
        );
    })

    document.querySelector('.button-clear').addEventListener('click',()=>{
        document.querySelector('.container_weather_item').innerHTML =''
        localStorage.clear()
        blockSaveWeather.style.display = 'none'
        content.style.display = 'block'
    })

    selectedWeather.addEventListener('click',()=>{
        showSaveContent()
        if(localStorage.getItem('storageId') !== null){
            content.style.display = 'none'
        }
    })
}
callButton()