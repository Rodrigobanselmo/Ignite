import { Request, Response } from 'express';

import { TestUseCase } from './TestUseCase';

class TestController {
  async handle(request: Request, response: Response): Promise<Response> {
    const testConnectionUseCase = new TestUseCase();
    console.log(request.body);
    const categories = await testConnectionUseCase.execute(request.body);
    return response.send(categories);
  }
}

export { TestController };
