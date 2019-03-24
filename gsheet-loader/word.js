const DB = require('./db');

class Word {
  truncate() {
    return DB('words')
      .truncate();
  }

  insert(data) {
    return DB('words')
      .insert({ german_word: data[0], english_word: data[1] });
  }
}

module.exports = new Word();
