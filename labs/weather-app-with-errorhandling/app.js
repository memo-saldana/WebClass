const request = require('request'),
      { MAPBOX_TOKEN, DARK_SKY_SECRET_KEY } = require('./credentials'),
      mapboxURL = 'https://api.mapbox.com',
      darkSkyURL = 'https://api.darksky.net';

      // City to look for
let city = 'Monterrey',
    geolocationURL = mapboxURL+`/geocoding/v5/mapbox.places/${city}.json?access_token=${MAPBOX_TOKEN}`;

request.get({url:geolocationURL, json:true}, (err, response, body) => {
  if(err || response.statusCode >= 400 || body.features.length == 0){
    if(response && response.statusCode >= 400){
        switch(response.statusCode){
          case 404:
            console.log("La ciudad dada no fue encontrada.");
          break;
          case 401:
            console.log("Tus credenciales para el api de MapBox son incorrectas.");
          break;
        } 
    } else if(err) {
      // console.log('err :', err);
      switch(err.code){
        case 'ENOTFOUND':
          console.log("No se pudo conectar con la api de MapBox.");
        break;
        default:
          console.log("Hubo un error desconocido");
      }
    } else {
      if(body.features && body.features.length == 0){
        console.log("La ciudad dada no fue encontrada.");
      }
    }
    return;
  }
  let feature = body.features[0];
  let lat = feature.center[1];
  let lng = feature.center[0];
  // console.log('lat :', lat);
  // console.log('lng :', lng);

  let weatherURL = darkSkyURL+`/forecast/${DARK_SKY_SECRET_KEY}/${lat},${lng}?units=si&lang=es`;

  request.get({url: weatherURL, json: true}, (err, response, body) => {
    if(err || response.statusCode >= 400){
      if(response && response.statusCode == 403){
        console.log("Tus credenciales para el api de DarkSky son incorrectas.");
      } else if(response && response.statusCode == 400){
        console.log("La información dada es incorrecta")
      } else {
        console.log('err :', err);
        switch(err.code){
          case 'ENOTFOUND':
            console.log("No se pudo conectar con la api de DarkSky.")
          break;
          default:
            console.log("Hubo un error desconocido");
        }
      }
      return;
    }
    let {summary, temperature, precipProbability } = body.currently;
    console.log(summary + '. Actualmente esta a '+ temperature + '°C. Hay '+ precipProbability + '% de probabilidad de lluvia.');
    
  })
})