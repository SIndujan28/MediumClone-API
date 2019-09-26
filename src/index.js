/* eslint-disable no-console */
import express from 'express';

import constants from './config/constants';

import './config/database';

import middlewaresConfig from './config/middlewares';

import apiRoutes from './modules/users';

const app = express();

middlewaresConfig(app);

app.get('/', (req, res) => {
  res.send('Helo amigos');
});
apiRoutes(app);
app.listen(constants.PORT, err => {
  if (err) {
    throw err;
  } else {
    console.log(`
        Death star deployed on port: ${constants.PORT}
        ----------
        Running on ${process.env.NODE_ENV}
        ----------
        Waiting for the command sir!
         `);
  }
});
