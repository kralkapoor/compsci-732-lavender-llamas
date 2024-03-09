const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Resolve the database file path
const dbPath = path.resolve(__dirname, 'db-sqlite.db');

// Open a database connection
let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

module.exports = db;
