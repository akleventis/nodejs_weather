const request = require('postman-request')

const geocode = (address, callback) => {
    const map_token = 'pk.eyJ1Ijoic2Vuc2F6biIsImEiOiJja3VsZnZldWkwMTZlMm5wbTV6MzJ6M2FmIn0.c6QfPJLWP7V6Z6CxEnCnaw'
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${map_token}&limit=1`
    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to location services')
        } else if (!body.features) {
            callback('Unable to find location.')
        } else if (body.features.length === 0) {
            callback('Unable to find location.')
        } else {
            callback(undefined, {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode