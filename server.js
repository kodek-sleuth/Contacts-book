import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import http from 'http';
import contactRoutes from './app/routes/contanctRouter';
import route from './app/routes/random';
import view from './app/routes/view';

require('dotenv').config();

const app = express(); // Connecting app to express

const port = process.env.PORT || 3000;

const server = http.createServer(app);

app.use(morgan('dev')); // Enabling data to be logged to console

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
mongoose.set('useFindAndModify', false);

if (process.env.NODE_ENV === 'DB_URL_TEST') {
  mongoose.connect(process.env.DB_URL_TEST, { useNewUrlParser: true })
    .then(() => console.log('Connection Successful'))
    .catch(error => console.error(error));
}

if (process.env.NODE_ENV === 'DB_URL') {
  mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
    .then(() => console.log('Connection Successful'))
    .catch(error => console.error(error));
}

app.use('/contacts', contactRoutes);
app.use('/contacts', route);
app.use('/contacts', view);
// Routes which should handle requests
app.use('/contacts', contactRoutes);
app.all('*', (_req, res) => {
  res.status(400).json({
    status: 400,
    message: 'route doesnot exist',
  });
});
server.listen(port);

export default app;
