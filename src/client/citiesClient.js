const {URLSearchParams} = require('url');
const config = require('../config/configuration.json');

const searchCityClient = async (city) => {

  const {token, url} = config.geolocation;
  const {base, routes} = url;
  
  const parameters = new URLSearchParams({
    access_token: token,
    limit: 5,
    language: 'es'
  }).toString();
  
  const requestUrl = `${base}${routes.base}${routes.places}?${parameters}`.replace('{{city}}',city);
  
  const initSearch = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    cache: 'no-cache'
  };

  return await fetch(requestUrl,initSearch)
    .then((places) => {
      return places.json();
    })
    .catch((error) => {
      throw error;
    });
}

module.exports = {
  searchCityClient
}