import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage';

import { ICarImagesRepository } from '../ICarImagesRepository';

class FakeCarImagesRepository implements ICarImagesRepository {
  private carimages: CarImage[] = [];

  async create(car_id: string, images_name: string[]): Promise<CarImage[]> {
    const images = images_name.map(name => {
      const image = new CarImage();

      Object.assign(image, {
        car_id,
        name,
        created_at: new Date(),
      });

      return image;
    });

    this.carimages.push(...images);

    return images;
  }
}

export { FakeCarImagesRepository };
