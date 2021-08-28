import { app } from './app';
// process.env.PORT
app.listen(3333, () =>
  console.log(`Server is running on http://${process.env.HOST}:${3333}/`),
);
