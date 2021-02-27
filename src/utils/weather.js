const request = require('request')



const weather = (center, callback) => {

    const url = `http://api.weatherstack.com/current?access_key=f8f007e490dcee4946f44979bc2b09a2&query=${center}&units=f`

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback(error, undefined)
        } else if (response.body.error) {
            callback(undefined, response.body.error)
        } else {

            const { temperature:currentDegree, precip, weather_descriptions:description } = response.body.current

            callback(undefined, {
                description,
                currentDegree,
                precip
            })

        }
    })
}

module.exports = weather