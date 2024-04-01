import React, { useState } from 'react'
import './WeatherApp.css'
import 'bootstrap/dist/css/bootstrap.css';

import clear_img from '../Assets/clear.png'
import cloud_img from '../Assets/cloud.png'
import drizzle_img from '../Assets/drizzle.png'
import humidity_img from '../Assets/humidity.png'
import rain_img from '../Assets/rain.png'
import snow_img from '../Assets/snow.png'
import wind_img from '../Assets/wind.png'
import search_img from '../Assets/search.png'

function WeatherApp() {
    let api_key = "82e71d1b2d6d26efaa3771f1962b384b";

    const [icon,setIcon] = useState(cloud_img)

    const search =async()=>{
        const element = document.getElementsByClassName("inputCity")
        if(element[0].value===' '){
            return 0
        }

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=metric&appid=${api_key}`;

        let response = await fetch(url);
        let data = await response.json();
       
        const humidity = document.getElementsByClassName("humidity-percent")
        const wind = document.getElementsByClassName("wind-speed")
        const temperature = document.getElementsByClassName("weather-temp")
        const location = document.getElementsByClassName("weather-location")

        humidity[0].innerHTML = data.main.humidity+"%";
        wind[0].innerHTML = Math.floor(data.wind.speed)+"km/h";
        temperature[0].innerHTML = Math.floor(data.main.temp)+"°C";
        location[0].innerHTML = data.name;

        
        if(data.weather[0].icon==='01d' || data.weather[0].icon==='01n'){
            setIcon(clear_img);
        }
        else if(data.weather[0].icon==='02d' || data.weather[0].icon==='02n'){
            setIcon(cloud_img)
        }
        else if(data.weather[0].icon==='03d' || data.weather[0].icon==='03n'){
            setIcon(drizzle_img)
        }
        else if(data.weather[0].icon==='04d' || data.weather[0].icon==='04n'){
            setIcon(drizzle_img)
        }
        else if(data.weather[0].icon==='09d' || data.weather[0].icon==='09n'){
            setIcon(rain_img)
        }
        else if(data.weather[0].icon==='10d' || data.weather[0].icon==='10n'){
            setIcon(rain_img)
        }
        else if(data.weather[0].icon==='13d' || data.weather[0].icon==='13n'){
            setIcon(snow_img)
        }
        else{
            setIcon(clear_img)
        }

    }   

  return (
    <div className='container'>
        <div className='top-bar'>
            <input type='text' className='inputCity' placeholder='search'/>
            <div className='search-img' onClick={()=>{search()}}>
                <img src={search_img} className='img' alt=""/>
            </div>
        </div>
        <div className='weather-img'>
            <img src={icon} className='cloud-icon' alt=""/>
        </div>
        <div className='weather-temp'>28°C</div>
        <div className='weather-location text-center text-white'>London</div>
        <div className='data-container'>
            <div className='element'>
                <img src={humidity_img} alt="" className='humidity-icon icon'/>
                <div className='data'>
                    <div className='humidity-percent text-center '>65%</div>
                    <div className='text-center text '>Humidity</div>

                </div>
            </div>

            <div className='element'>
                <img src={wind_img} alt="" className='wind-icon icon'/>
                <div className='data'>
                    <div className='wind-speed text-center'>18 Km/hr</div>
                    <div className='text-center text' >Wind Speed</div>
                </div>
            </div> 
        </div>
    </div>
  )
}

export default WeatherApp