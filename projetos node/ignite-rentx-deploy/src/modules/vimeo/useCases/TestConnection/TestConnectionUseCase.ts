// var Vimeo = require("vimeo").Vimeo;
import { Vimeo } from 'vimeo';

class TestConnectionUseCase {
  async execute(): Promise<string> {
    const CLIENT_ID = '134c80e724ca5534a53e5fe1d0c28ab1120a9e3c';
    const CLIENT_SECRET =
      'fh6SDHk81PDip4Rygvolf8m0z4FmOrdwYrtEuizrGI4+QHozl5Dwo1ovfGNHTtf5Av5GGQdqPUuq8j4tkAlFL4ejwETJsNZ6K72HoDBDji0EWhLgGA7L5V8uEQRoKL6f';
    const ACCESS_TOKEN = '827d3e9e98fc7d2d9691f6434d01c604';
    const client = new Vimeo(CLIENT_ID, CLIENT_SECRET, ACCESS_TOKEN);

    client.request(
      {
        method: 'GET',
        path: '/tutorial',
      },
      (error, body, status_code, headers) => {
        if (error) {
          console.log(error);
        }
        console.log('body', body);
        console.log('status_code', status_code);
        console.log('headers', headers);
      },
    );

    return 'test';
  }
}

export { TestConnectionUseCase };
