const db = require('./database');

(async () => {
  const connection = await db.getConnection();
  console.log('Connected to database');
  connection.release();
  process.exit();
})().catch((error) => {
  console.error('Error connecting to database:', error);
  process.exit(1);
});
