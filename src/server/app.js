import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser';
import passport from 'passport';
import authRouter from './auth';
import topicRouter from './topicRouter';

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use(cookieParser("secret"));
app.use(session({secret : 'keyboard cat', saveUninitialized : true, resave : true}));
app.use(passport.initialize());
app.use(passport.session());

app.use(authRouter);
app.use(topicRouter);

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send({message : err.message, error : err});
});

app.listen(8181);
