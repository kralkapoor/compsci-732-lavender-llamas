const db = require("../database/pool");

async function getWardrobeItems(userEmail) {

  return new Promise((resolve, reject) => {
    db.all('SELECT ci.clothing_id, ci.color, ci.sleeves, ci.pattern, ci.style, c.main_category, c.sub_category FROM ClothingItem ci JOIN Category c ON ci.category_id = c.category_id WHERE ci.user_email = ?', [userEmail], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

async function deleteWardrobeItem(itemId) {
  return new Promise((resolve, reject) => {
    db.run('delete from ClothingItem where clothing_id = ?', [itemId], function(err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.changes);
      }
    })
  })
}

module.exports = { getWardrobeItems, deleteWardrobeItem };
