import { Request, Response } from 'express';

import { TestUseCase } from './TestUseCase';

class TestPuppeteerController {
  // para isso funcionar precisa criar a rota que tem como response o html que vamos copiar
  async handle(request: Request, response: Response): Promise<Response> {
    const testConnectionUseCase = new TestUseCase();
    const categories = await testConnectionUseCase.execute();
    response.contentType('application/pdf');
    return response.send(categories);
  }
}

export { TestPuppeteerController };
