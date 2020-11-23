import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import routes from './routes';
import uploadConfig from './config/upload';
import './database';
import AppError from './errors/AppError';

const app = express();

// allowing json
app.use(express.json());

// route to visualize files de forma estática
app.use('/files', express.static(uploadConfig.directory));

// passando todas as rotas para serem escutadas
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('Mãe ta on 🤸🏽‍♀️ on port 3333!');
});
