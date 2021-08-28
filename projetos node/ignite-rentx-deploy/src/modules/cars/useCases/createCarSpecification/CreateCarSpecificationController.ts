import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

class CreateCarSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { specification_ids } = request.body;
    const { id } = request.params;

    const createCarSpecificationUseCase = container.resolve(
      CreateCarSpecificationUseCase,
    );

    const car = await createCarSpecificationUseCase.execute({
      car_id: id,
      specification_ids,
    });

    return response.json(car);
  }
}

export { CreateCarSpecificationController };
