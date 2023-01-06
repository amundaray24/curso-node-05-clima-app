const fs = require('fs');
const config = require('../config/configuration.json');

let history = [];

const databasePath = `${config.database.path}/${config.database.fileName}`;

const saveRecord = (record) => {
  console.log(record);
  if( history.includes(record.toLocaleLowerCase())){
    return;
  }
  history = history.splice(0,4);
  history.unshift(record.toLocaleLowerCase());
  fs.writeFileSync(databasePath, JSON.stringify({data:history}) );
}

const loadHistoryDatabase = () => {
  if( !fs.existsSync(databasePath) ) return;  
  const data = fs.readFileSync(databasePath,{ encoding: 'utf-8' });
  history = data ? JSON.parse(data).data : [];
}

const readRecords = () => {
  return history;
}

module.exports = {
  saveRecord,
  loadHistoryDatabase,
  readRecords
}