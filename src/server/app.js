import express from 'express';
import bodyParser from 'body-parser';
import topicRouter from './topicRouter';

let app = express();
let topicIdCounter = 0;
let ideaIdCounter = 0;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use(topicRouter);

app.listen(8181);
