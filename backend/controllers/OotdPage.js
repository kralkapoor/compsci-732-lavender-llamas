const db = require('../database/pool');

// DAO to greet the user on the OOTD page with their first name 
async function fetchUserFirstName(email) {
    try {
      const result = await new Promise((resolve, reject) => {
        // Use db.get for a single row query instead of db.all
        db.get(`SELECT DISTINCT firstName FROM Users WHERE email = ?`, [email], (err, row) => {
          if (err) {
            console.error('Error executing query:', err);
            reject(err); // Reject the promise in case of an error
          } else {
            resolve(row); // Resolve the promise with the retrieved row
          }
        });
      });
  
      // Check if result exists before accessing the firstName property
      return result ? result.firstName : null;
    } catch (err) {
      console.error('Error fetching user first name:', err);
      // Handle the error appropriately (e.g., return null or throw an error)
      return null;
    }
  }
  

module.exports = { fetchUserFirstName };