import { ICarImagesRepository } from '@modules/cars/repositories/ICarImagesRepository';
import { getRepository, Repository } from 'typeorm';

import { CarImage } from '../entities/CarImage';

class CarImagesRepository implements ICarImagesRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }

  async create(car_id: string, images_name: string[]): Promise<CarImage[]> {
    const imagesObj = images_name.map(name => {
      const image = this.repository.create({
        car_id,
        image_name: name,
      });
      return image;
    });

    const images = await this.repository.save(imagesObj);

    return images;
  }
}

export { CarImagesRepository };
