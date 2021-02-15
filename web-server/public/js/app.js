const weatherForm = document.querySelector('form');
const search = document.querySelector('input')
const weatherLocation = document.querySelector('#location')
const weatherForecast = document.querySelector('#forecast')
const error = document.querySelector('#error')




weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    const location = search.value

    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
       response.json().then((data)=>{
        if(data.error){
            error.textContent = data.error
            weatherLocation.textContent = ''
            weatherForecast.textContent = ''
            search.value = ''
        }else{
            weatherLocation.textContent = data.location
            weatherForecast.textContent = data.forecast
            search.value = ''
            error.textContent = ''

        }
       })
                
    })
    
})