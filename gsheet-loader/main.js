const { google } = require('googleapis');
const Promise = require('bluebird');
const word = require('./word');

const SPREADSHEET_ID = '1gNRhIlGhDTdA_oJ81xycz565bEcKj5VoxoO0KG9CBj0';

const readSheet = (auth) => {
  const sheets = google.sheets({ version: 'v4', auth });

  const promise = Promise.resolve(
    sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Words'
    })
  );

  promise
    .then(res => res.data.values)
    .then((rows) => Promise.all([rows, word.truncate()]))
    .spread((rows, _ignore) => Promise.mapSeries(rows.map(data => () => word.insert(data)), (dbAction) => Promise.resolve(dbAction())))
    .then(() => console.log('Words inserted'))
    .catch(console.error);
};

module.exports = readSheet;
