const request = require('request');

const geoCoding = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWRoaXNoMjkiLCJhIjoiY2tna2xmeTdnMTk4YzJ6dGU4ZmMzdjA5ZCJ9.NScSHD5pAPa4Tn63_M6J2A&limit=1';
  
  request({url, json: true}, (err, res) => {
    if(err)
      callback('Unable to connect to location services');
    else if(!res.body.features.length)
      callback('unable to find location. try other location');
    else{
      const data = res.body;
      const long = data.features[0].center[0];
      const lat = data.features[0].center[1];
      const location = data.features[0].place_name;
      callback(undefined, {lat, long, location});
    }
  })
}

module.exports = geoCoding;