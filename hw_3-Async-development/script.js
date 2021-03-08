let formSearchCity = document.querySelector('#search-city');
let formSearchCountry = document.querySelector('#search-country')
let formButton = document.querySelector('.form_button')
let contentCountry = document.querySelector('.content_country');
let contentCity = document.querySelector('.content_city');
let contentTemperature = document.querySelector('.content_temperature');
let contentSpeed = document.querySelector('.content_speed');
let contentHumidity = document.querySelector('.content_humidity');

async function getApi(city ='dnepropetrovsk',country = 'ukraine'){
    try{
        let response = await fetch(`//api.weatherstack.com/current?access_key=4f1356484237009b61987ec98869b062&query=${city},${country}`);
        let data = await response.json()
        console.log(data)
        return addContentInfo(data);
    }
    catch(err){
        console.log(err)
    }
};

formButton.addEventListener('click',(event)=>{
    event.preventDefault()
    getApi(formSearchCity.value,formSearchCountry.value);
    formSearchCity.value = ""
    formSearchCountry.value = ""
});

window.onload = ()=>{
    getApi()
};

function addContentInfo (dat){
    contentCountry.textContent = dat.location.country;
    contentCity.textContent = dat.location.name;
    contentTemperature.textContent = `Temperature ${dat.current.temperature} °C`;
    contentHumidity.textContent = `Humidity ${dat.current.humidity} %`;
    contentSpeed.textContent = `Wind Speed ${dat.current.wind_speed} km/h`;   
}





    