const db = require('../database/pool');

// Get user data from database
async function getProfile(userEmail) {
    return new Promise((resolve, reject) => {
      console.log(`reached getProfile: ${userEmail}`)
      db.get('SELECT * FROM Users WHERE email = ?', [userEmail], (err, row) => {
          if (err) {
              console.error('Error executing query:', err);
              reject(err);
          } else {
              resolve(row); // Resolve the promise with the retrieved row
          }
      });
  });
}
        
// Update user profile without updating user password and email
async function updateProfile(user) {

    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE Users SET firstName = ?, lastName = ?, location = ?, gender = ?, skinTone = ? WHERE email = ?',
        [user.firstName, user.lastName, user.location, user.gender, user.skinTone, user.email],
        function(err) {
          if (err) {
            console.error('Error executing query:', err);
            reject(err);
          } else {
            resolve(this.changes); // Resolves with the number of rows updated
          }
        }
      );
    });

}

// Update user's password only
async function updatePassword(user, hashedPassword) {

  return new Promise((resolve, reject) => {
    db.run('update users set password = ? where email = ?', [hashedPassword, user.email], function(err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.changes);
      }
    })
  })

}

module.exports = { getProfile, updateProfile, updatePassword };