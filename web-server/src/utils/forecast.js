const request = require('postman-request');

const forecast = (lattitude, longitude, callback)=>{
    const WeatherURL = `http://api.weatherstack.com/current?access_key=5b82889ca352f5c23fcefd1ea99080e6&query=${lattitude},${longitude}&units=f`

    const optionObject = {
        url: WeatherURL, 
        json: true
    }

    request(optionObject, (error, res)=>{
        
        if(error){
            callback('Unable to connect with weather service', undefined)
        }else if (res.body.error) {
            callback('Unable to find location', undefined)
        }else{
            const data = res.body;
            const current = data.current
            const currentWeather = `${current.weather_descriptions[0]} throughout the day. With a temperature of ${current.temperature} degrees. Humidity of ${current.humidity} and feels like ${current.feelslike} degrees.`    
            callback(undefined, currentWeather)
        }

    })

        

    }

    module.exports = forecast
    
