const request = require("postman-request");

const FORECAST = (lat, long, callback) => {
  const coords = `${encodeURIComponent(lat)},${encodeURIComponent(long)}`;
  const weather_token = "5666dd8e944db1221677806363e79969";
  const url = `http://api.weatherstack.com/current?access_key=${weather_token}&query=${coords}&units=f`;
    request({ url, json: true }, (err, { body }) => {
        if (err){
            callback('Unable to connect to weather service');
        } else if (body.error){
            callback('Unable to find location forecast');
        } else {
            const temp = body.current.temperature;
            const rain = body.current.precip;
            const desc = body.current.weather_descriptions[0];
            const str = `${desc}. It is currently ${temp} degrees out with a ${rain}% chance of rain`;
            callback(undefined, str);
        }
    })
};

module.exports = FORECAST;
