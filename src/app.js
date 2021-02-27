const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const weather = require('./utils/weather.js')

//Define paths for Express config
const app = express()
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)


//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)



app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Johnny'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weat31321331her App',
        name: 'Joh323131nny'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Title blabla',
        name: 'Nameblabal'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send([{
            error: 'You must type in an address'
        }])
    } else {
        const address = req.query.address
        geocode(address, (error, data) => {
            if (error) {
                res.send([{
                    error: error
                }
                ])
            } else {
                const { lat, long, location } = data // Object destructuring
                const centerString = `${lat},${long}`
                weather(centerString, (error, data) => {
                    if (error) {
                        res.send([{
                            error: error
                        }
                        ])
                    } else {
                        const { description, currentDegree, precip } = data
                        console.log(`Currently at ${location}, the weather is ${description} and the current degree is ${currentDegree}. The chance for rain is ${precip}`)
                        res.send([{
                            forecast: description[0],
                            location: location,
                            Temperature: currentDegree,
                            Precipitation: precip
                        }
                        ])
                    }
                })
            }
        })
    }
})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({ product: [] })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Title',
        name: 'Name',
        errorMessage: '404 not found'
    })
})


app.listen(3000, () => {
    console.log('Server is up')
})




