const path = require('path')
const express = require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Paths 
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, './templates/views')
const partialPath = path.join(__dirname, './templates/partials')

//set up handlebars
app.set('view engine', 'hbs')
app.set('views', viewsPath) //for handlebars
app.use(express.static(publicDirectory)) //for static files
hbs.registerPartials(partialPath) //for partials

//Set up satic directory to serve 
app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Use this site to get your weather!'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About me',
        name: 'Steve Bazelais'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help Page',
        name: 'Some Text on how to help you'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send('Error: Incorrect Address')
    }

    geocode(req.query.address,(error, { lattitude, longitude, location} = {})=>{
        if(error){
            return res.send({ error })
        }

        forecast(lattitude, longitude, (error, forecastData)=>{
            if (error){
                return res.send({ error })
            }else{
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            }
            
        })
    })

  
})

app.get('*', (req, res)=>{
    res.send('<h1>Page Not Found</h1>')
})



app.listen(3000, ()=>{
    console.log('Sever running...')
})