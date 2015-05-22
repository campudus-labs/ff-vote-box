import express from 'express';
import passport from 'passport';

let authRouter = express.Router();

authRouter.get('/logout', function (req, res) {
    req.logout();
    res.writeHead(200, {'content-type': 'text/plain'});
    res.end('Logged out');
});

authRouter.post('/login', passport.authenticate('local'), function (req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.writeHead(200, {'content-type': 'text/plain'});
    res.end('Logged in');
});

class Authenticator {
    constructor() {
        this.value = 0;
    }

    check(username, password, done) {
        return done(null, {"username": username});
    }
}

export default {
    ROUTER: authRouter,
    AUTHENTICATOR: new Authenticator()
};


