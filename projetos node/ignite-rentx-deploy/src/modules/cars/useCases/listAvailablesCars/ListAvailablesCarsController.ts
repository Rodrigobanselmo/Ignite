import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAvailablesCarsUseCase } from './ListAvailablesCarsUseCase';

class ListAvailablesCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { brand, category_id, name } = request.query;
    const listAvailablesCarsUsecase = container.resolve(
      ListAvailablesCarsUseCase,
    );

    const cars = await listAvailablesCarsUsecase.execute({
      brand: brand as string,
      category_id: category_id as string,
      name: name as string,
    });

    return response.json(cars);
  }
}

export { ListAvailablesCarsController };
