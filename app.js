const { 
  pause,
  showMenu,
  readInput,
  showPlaces,
  showSelectedPlace,
  showHistory
} = require('./src/helpers/helpersMenus');

const { 
  searchCity,
  searchWeather,
  loadHistory,
  listHistory
} = require('./src/services/citiesServices');

const main = async () => {
  let opt;
  loadHistory();
  do {
    opt = await showMenu();
    let empty = false;
    switch (opt) {
      case 1:
        const city = await readInput('Cuidad: ');
        const places = await searchCity(city);
        const selected = await showPlaces(places);
        if (selected === -1) continue;
        const selectedPlace = places.find( place =>  place.id === selected);
        const weather = await searchWeather(selectedPlace.name, selectedPlace.latitude,selectedPlace.longitude);
        await showSelectedPlace(selectedPlace, weather);
      break;
      case 2:
        const history = listHistory();
        if (history.length > 0) {
            showHistory(history);
            break;
        }
        empty = true;
      break;        
    }

    if (opt!==0) await pause(empty);

  } while (opt !== 0);
  
}

main();