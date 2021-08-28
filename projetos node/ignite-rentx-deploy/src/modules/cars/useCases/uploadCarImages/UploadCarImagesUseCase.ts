import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage';
import { ICarImagesRepository } from '@modules/cars/repositories/ICarImagesRepository';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('CarImagesRepository')
    private carImagesRepository: ICarImagesRepository,
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<CarImage[]> {
    // verifica se existe o carro
    const car = await this.carsRepository.findById(car_id);

    if (!car) {
      throw new AppError('Invalid Car');
    }

    // faz o upload do arquivo

    // salva a imagem no banco
    const images = await this.carImagesRepository.create(car_id, images_name);
    return images;
  }
}

export { UploadCarImagesUseCase };
