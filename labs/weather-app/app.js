const request = require('request'),
      { MAPBOX_TOKEN, DARK_SKY_SECRET_KEY } = require('./credentials'),
      mapboxURL = 'https://api.mapbox.com',
      darkSkyURL = 'https://api.darksky.net';

      // City to look for
let city = 'Monterrey',
    geolocationURL = mapboxURL+`/geocoding/v5/mapbox.places/${city}.json?access_token=${MAPBOX_TOKEN}`;

request.get({url:geolocationURL, json:true}, (err, response, body) => {
  if(err) return console.log('err :', err);
  let feature = body.features[0];
  let lat = feature.center[1];
  let lng = feature.center[0];
  let weatherURL = darkSkyURL+`/forecast/${DARK_SKY_SECRET_KEY}/${lat},${lng}?units=si&lang=es`;

  request.get({url: weatherURL, json: true}, (err, response, body) => {
    if(err) return console.log('err :', err);
    
    let {summary, temperature, precipProbability } = body.currently;
    console.log(summary + '. Actualmente esta a '+ temperature + '°C. Hay '+ precipProbability + '% de probabilidad de lluvia.');
    
  })
})