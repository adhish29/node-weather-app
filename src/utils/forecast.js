const request = require('request');

const foreCasting = (lat, long, callback) => {
  url = "http://api.weatherstack.com/current?access_key=47773c74483193937c05a57c5c9b3499&query=" + lat + "," + long;

  request({url, json: true}, (err, res) => {
    if(err)
      callback("can't connect to forecasting service");
    else if(res.body.error)
      callback('unable to find weather');
    else{
      const data = res.body;
      callback(undefined, {
        temp : data.current.temperature,
        feelsLike: data.current.feelslike
      });
    }

  })
  
}


module.exports = foreCasting;