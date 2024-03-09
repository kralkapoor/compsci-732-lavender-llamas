const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const db = require('../database/pool')

// Serialize user email into the session
passport.serializeUser((user, done) => {
    done(null, user.email);
});

// Deserialize user by email
passport.deserializeUser((email, done) => {
  db.get('SELECT * FROM UserSession WHERE user_email = ?', [email], (err, user) => {
      if (err) {
          return done(err);
      }
      if (!user) {
          return done(null, false, { message: 'User not found.' });
      }
      return done(null, user);
  });
});


passport.use(new LocalStrategy(
  
    (username, password, done) => {
        // Use db.get for single row queries
        db.get('SELECT * FROM Users WHERE email = ?', [username], (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!bcrypt.compareSync(password, user.password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));

function login(req, res, next) {
    passport.authenticate('local', { session: true }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: info.message });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }

            db.get('SELECT * FROM UserSession WHERE user_email = ?', [user.email], (err, row) => {
                if (err) {
                    console.error('Error in session handling:', err);
                    return next(err);
                }
                if (!row) {
                    db.run('INSERT INTO UserSession (user_email, session_id) VALUES (?, ?)', [user.email, req.sessionID], (err) => {
                        if (err) {
                            console.error('Error inserting session:', err);
                            return next(err);
                        }
                        return res.status(200).json({ message: 'Logged in' });
                    });
                } else {
                    db.run('UPDATE UserSession SET session_id = ? WHERE user_email = ?', [req.sessionID, user.email], (err) => {
                        if (err) {
                            console.error('Error updating session:', err);
                            return next(err);
                        }
                        return res.status(200).json({ message: 'Logged in' });
                    });
                }
            });
        });
    })(req, res, next);
}

async function logout(req, res) {
    db.run('UPDATE UserSession SET session_id = NULL WHERE session_id = ?', [req.sessionID], function(err) {
      if (err) {
        console.error('Error setting session ID to NULL:', err);
        res.status(500).json({ message: 'Error logging out' });
      } else {
        res.status(200).json({ message: 'Logged out successfully' });
      }
    });
  }
  
  async function checkAuthenticated(req, res) {
    db.get('SELECT * FROM UserSession WHERE session_id = ?', [req.sessionID], (err, row) => {
      if (err) {
        console.error('Error checking session ID:', err);
        res.status(500).json({ isAuthenticated: false });
      } else if (row) {
        res.json({ isAuthenticated: true });
      } else {
        res.json({ isAuthenticated: false });
      }
    });
  }

  function getEmail(req, res) {
    if (req.user && req.user.user_email) {
      res.json({ email: req.user.user_email });
      
    } else {
      console.error('No user found with session ID:', req.sessionID);
      res.status(404).json({ message: 'User not found' });
    }
  }

  module.exports = {
    login,
    logout,
    checkAuthenticated,
    getEmail,
    passport,
};