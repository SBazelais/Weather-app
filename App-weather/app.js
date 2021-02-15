const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const place = process.argv[2];

if (place){

    geocode(place, (error, { lattitude, longitude, location} = {})=>{
        if (error){
            return console(error)
        }
    
        forecast(lattitude, longitude, location, (error, forecastData)=>{
            if (error){
                return console.log(error)
            }else{
                console.log(forecastData)
            }
            
        })
    })
    

}else{
    console.log('Please provide a location')
}



