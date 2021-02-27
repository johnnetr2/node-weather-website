const request = require('request')

const geocode = (address, callback) => {
    const encoded = encodeURI(address);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encoded}.json?access_token=pk.eyJ1Ijoiam9obm5ldHIiLCJhIjoiY2tsZTl0emZvMW42cDJuczhhNzc2d29nMyJ9.Dqcf_dWdStsjajzMH34wiw&limit=1`
    
    request({ url: url, json: true },(error, {body}) => {
    
        if (error) {
            callback('Unable to connect to location')
        } else if (body.message || body.features.length === 0) {
            callback('Unable to find to location')
        } else { 
            const long = body.features[0].center[0]
            const lat = body.features[0].center[1]
            const location = body.features[0].place_name
            callback(undefined, {
                lat,
                long,
                location
            })
        }
    })
    
    }
    
    module.exports = geocode
    