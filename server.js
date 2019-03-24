import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import router from './src/routes/index';

const server = express();

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(express.json());
server.use(router);

server.get('/', (req, res) => {
  res.send(' Julius Welcome\'s you to Banka');
});

server.use('*', (req, res) => res.status(404).json({
  status: '404',
  message: 'route not found',
}));

const port = process.env.PORT || 3000;

server.listen(port, () => { console.log(`Listening on port ${port}`); });
