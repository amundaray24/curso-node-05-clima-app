const {searchCityClient} = require('../client/citiesClient');
const {searchWeatherByLatitudeLongitude} = require('../client/weatherClient');
const {saveRecord, loadHistoryDatabase, readRecords} = require('../db/searchHistory');

const loadHistory = () => {
    loadHistoryDatabase();
}

const listHistory = () => {
    return readRecords();
}

const searchCity = async (city) => {
    return await searchCityClient(city)
        .then((places) => {
            return places.features.map((place) => ({
                id: place.id,
                name: place.place_name,
                longitude: place.center[0],
                latitude: place.center[1]
            }));
        })
        .catch(() => {
            return [];
        });
}

const searchWeather = async (name, latitude, longitude) => {
    return await searchWeatherByLatitudeLongitude(latitude, longitude)
        .then((answer) => {
            saveRecord(name);
            const {weather, main} = answer; 
            return {
                description: weather[0].description,
                minTemperature: main.temp_min,
                maxTemperature: main.temp_max,
                temperature: main.temp
            }
        })
        .catch(() => {
            return {};
        });
}

module.exports = {
    searchCity,
    searchWeather,
    loadHistory,
    listHistory
}