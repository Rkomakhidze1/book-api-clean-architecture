import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import { createConnection } from 'typeorm';
import { errorHandler } from './middleware/error-handler';
import bodyParser from 'body-parser';
import { bookRouter } from './routes/book-routes';
import { authorRouter } from './routes/author-routes';
import { currentUser } from './middleware/current-user';
import { authRouter } from './routes/auth-routes';

const app = express();

app.use(bodyParser.json());

app.use(currentUser);

app.use('/api/auth', authRouter);
app.use('/api/books', bookRouter);
app.use('/api/authors', authorRouter);

app.use(errorHandler);

app.listen(3000, async () => {
  await createConnection();
  console.log('db conneted');
  console.log('server started');
});

export { app };
