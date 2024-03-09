const db = require('../database/pool');

// Used in the weatherProxy route to get the user's location for accurate weather conditions
async function fetchUserLocation(email) {
  try {
    const result = await new Promise((resolve, reject) => {
      // Use db.get for single row queries instead of db.all
      db.get(`SELECT location FROM Users WHERE email = ?`, [email], (err, row) => {
        if (err) {
          console.error('Error executing query:', err);
          reject(err); // Reject the promise in case of an error
        } else {
          resolve(row); // Resolve the promise with the retrieved row
        }
      });
    });

    return result ? result.location : null; // Check if result exists before accessing the location
  } catch (err) {
    console.error('Error fetching user location:', err);
    // Handle the error appropriately (e.g., return null or throw an error)
    return null;
  }

}

module.exports = { fetchUserLocation };