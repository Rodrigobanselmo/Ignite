import { Request, Response } from 'express';

import { TestUseCase } from './TestUseCase';

class TransformPdfAController {
  async handle(request: Request, response: Response): Promise<Response> {
    const testConnectionUseCase = new TestUseCase();
    const categories = await testConnectionUseCase.execute();
    console.log('qwe');
    return response.send(categories);
  }
}

export { TransformPdfAController };
