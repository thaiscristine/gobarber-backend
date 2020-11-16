import express from 'express';
// src/server.ts
import routes from './routes';

const app = express();

// allowing json
app.use(express.json());

// passando todas as rotas para serem escutadas
app.use(routes);

app.listen(3333, () => {
  console.log('Mãe ta on 🤸🏽‍♀️ on port 3333!');
});
