const inquirer = require('inquirer');
require('colors');

const menuOptions = [
  {
    type: 'list',
    name: 'options',
    message: 'Choose one option',
    choices: [
      {value: 1 , name: `${'1.'.green} Buscar Ciudad`,},
      {value: 2 , name: `${'2.'.green} Historial Consultado`,},
      {value: 0 , name: `${'0.'.green} Salir`}
    ]
  }
]

const showMenu = async () => {
  console.clear();
  console.log('==============================='.green);
  console.log('==== Selecciona una Opción ===='.blue);
  console.log('==============================='.green);

  const {options} = await inquirer.prompt(menuOptions);
  return options;
}

const pause = async ( empty ) => {

  if (empty !== null){
    const question = [
      {
        type: 'input',
        name: 'enter',
        message: empty ? `${'No existen busquedas anteriores'.red}, Pulsa ${'ENTER'.green} para continuar` : `Pulsa ${'ENTER'.green} para continuar`
      }
    ];
  
    console.log('\n');
    await inquirer.prompt(question);
  }
}


const readInput = async ( message ) => {
  const question = [
    {
      type: 'input',
      name: 'input',
      message,
      validate(value) {
        if (value.length === 0) return 'Enter a valid text';
        return true;
      }
    }
  ];

  const {input} = await inquirer.prompt(question);
  return input;
}

const showPlaces = async ( places ) => {
  
  
  const choices = places.map((place,index) => {
    const order = `${index + 1}.`.green;
    return {
      value: place.id,
      name: `${order} ${place.name}`
    }
  });

  choices.unshift(
    {
      value: -1,
      name: `${'0.'.green} Cancelar!`
    }
  );

  const selectOptions = [
    {
      type: 'list',
      name: 'id',
      message: 'Selecciona el lugar',
      choices
    }
  ];
  
  const {id} = await inquirer.prompt(selectOptions);
  return id;
}

const showSelectedPlace = async ( place , weather) => {
  console.log('\nInformación de la ciudad:\n'.blue);
  console.log('Ciudad: '.green, place.name);
  console.log('Latitud: '.green, place.latitude);
  console.log('Longitud: '.green, place.longitude);
  console.log('Temperatura Actual: '.green, weather.temperature);
  console.log('Temperatura Mínima: '.green, weather.minTemperature);
  console.log('Temperatura Máxima: '.green, weather.maxTemperature);
}

const showHistory = (history) => {
  console.log('\n');
  history.forEach((record,index) => {
    const order = `${index + 1}.`.green;
    console.log(`${order} ${record} `);
  });
}


module.exports = {
  pause,
  showMenu,
  readInput,
  showPlaces,
  showSelectedPlace,
  showHistory
}