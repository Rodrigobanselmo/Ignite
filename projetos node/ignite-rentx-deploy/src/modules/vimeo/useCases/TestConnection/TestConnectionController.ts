import { Request, Response } from 'express';

import { TestConnectionUseCase } from './TestConnectionUseCase';

class TestConnectionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const testConnectionUseCase = new TestConnectionUseCase();
    const categories = await testConnectionUseCase.execute();
    return response.json({ teste: categories });
  }
}

export { TestConnectionController };
