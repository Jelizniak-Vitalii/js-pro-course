import {createContent} from './main.js'

export async function getApi(city,country){
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
