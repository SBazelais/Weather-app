const request = require('postman-request')

const geocode = (address, callback)=>{
    const  geocodingURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic2JhemVsYWlzIiwiYSI6ImNrYmFyMjA2eDBrcXAycXBnNXprN3V5a3AifQ.1KE5O3lxjh5N-9BErQJ5Zw&limit=1`;

    const geocodingObject =  {
        url: geocodingURL,
        json: true
    }


    request(geocodingObject, (error, res)=>{
        
        if(error){
            callback('Unable to connect to weather service', undefined)
        }else if (res.body.features.length === 0) {
            callback('Unable to find location. Please try another search', undefined)
        }else{
            const geoData = res.body;
            const data = geoData.features[0].center;
            const longitude = data[0];
            const lattitude = data[1];
            const location = geoData.features[0].place_name;

            callback(undefined, 
                {
                    longitude, 
                    lattitude,
                    location
                })
        }
        
    })

    

}

module.exports = geocode;