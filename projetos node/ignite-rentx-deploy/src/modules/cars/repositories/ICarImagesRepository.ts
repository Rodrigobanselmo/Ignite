import { CarImage } from '../infra/typeorm/entities/CarImage';

interface ICarImagesRepository {
  create(car_id: string, images_name: string[]): Promise<CarImage[]>;
}

export { ICarImagesRepository };
