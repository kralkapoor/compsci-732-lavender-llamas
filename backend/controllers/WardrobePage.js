const db = require("../database/pool");

async function addWardrobeItem(data) {

  return new Promise((resolve, reject) => {
    db.run('insert into clothingItem (user_email, category_id, color, style, sleeves, pattern) values (?, ?, ?, ?, ?, ?)', 
    [data.user_email.email, data.category_id, data.color, data.style, data.sleeves, data.pattern], function(err) {
      if (err) {
        reject(err)
      } else {
        resolve(this.changes);
      }
    })
  })
}

module.exports = { addWardrobeItem };
