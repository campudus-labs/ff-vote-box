import express from 'express';
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import db from './usersDb';

let authRouter = express.Router();

function findById(id, fn) {
  let user = db.get(id);
  if (user) {
    fn(null, user);
  } else {
    fn(new Error('User ' + id + ' does not exist'));
  }
}

function findByUsername(username, fn) {
  let user = db.getByUsername(username);
  if (user) {
    return fn(null, user);
  } else {
    return fn(null, null);
  }
}

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});

authRouter.get('/logout', function (req, res) {
  req.logout();
  res.writeHead(200, {'content-type' : 'text/plain'});
  res.end('Logged out');
});

authRouter.post('/login', passport.authenticate('local'), function (req, res) {
  res.end(JSON.stringify(req.user));
});

passport.use(new LocalStrategy(
  function (username, password, done) {
    process.nextTick(function () {

      findByUsername(username, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {message : 'Unknown user ' + username});
        }
        if (user.password != password) {
          return done(null, false, {message : 'Invalid password'});
        }
        return done(null, user);
      })
    });
  }
));

export default authRouter;
