import 'reflect-metadata';
import express from 'express';
// src/server.ts
import routes from './routes';
import uploadConfig from './config/upload';
import './database';

const app = express();

// allowing json
app.use(express.json());

// route to visualize files de forma estática
app.use('/files', express.static(uploadConfig.directory));

// passando todas as rotas para serem escutadas
app.use(routes);

app.listen(3333, () => {
  console.log('Mãe ta on 🤸🏽‍♀️ on port 3333!');
});
