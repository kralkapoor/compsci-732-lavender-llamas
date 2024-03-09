const db = require('../database/pool');

async function registerUser(data) {
  return new Promise((resolve, reject) => {
    // Check if the email already exists
    db.get('SELECT COUNT(*) AS count FROM Users WHERE email = ?', [data.email], (err, row) => {
      if (err) {
        reject(err);
      } else if (row.count > 0) {
        // If the email exists, throw an error
        reject(new Error('An account with that email already exists'));
      } else {
        // If the email is unique, insert new user data
        db.run('INSERT INTO Users (firstName, lastName, email, password, location, gender) VALUES (?, ?, ?, ?, ?, ?)',
          [data.firstName, data.lastName, data.email, data.password, data.location, data.gender], function(err) {
            if (err) {
              reject(err);
            } else {
              resolve(this.lastID); // lastID is the rowid of the last inserted row
            }
          });
      }
    });
  });
}

// Remember to export your function
module.exports = { registerUser };

