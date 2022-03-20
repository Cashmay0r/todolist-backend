import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import router from './routes/index.js';
import cors from 'cors';
var app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(router);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
