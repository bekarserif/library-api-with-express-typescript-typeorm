import env from './env';
import expressApp from './loaders/expressApp';
import 'reflect-metadata';
const port = env.APP.PORT;

async function bootstrapApp() {
  expressApp.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

bootstrapApp();
