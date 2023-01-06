const {URLSearchParams} = require('url');
const config = require('../config/configuration.json');

const searchWeatherByLatitudeLongitude = async (latitude,longitude) => {

  const {token, url} = config.weather;
  const {base, routes} = url;
  
  const parameters = new URLSearchParams({
    appid: token,
    units: 'metric',
    lang: 'es',
    lat: latitude,
    lon: longitude
  }).toString();
  
  const requestUrl = `${base}${routes.base}${routes.weather}?${parameters}`;
  
  const initSearch = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    cache: 'no-cache'
  };

  return await fetch(requestUrl,initSearch)
    .then((weather) => {
      return weather.json();
    })
    .catch((error) => {
      throw error;
    });
}

module.exports = {
  searchWeatherByLatitudeLongitude
}