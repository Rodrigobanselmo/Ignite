import { FakeCarImagesRepository } from '@modules/cars/repositories/fakes/FakeCarImagesRepository';
import { FakeCarsRepository } from '@modules/cars/repositories/fakes/FakeCarsRepository';
import { AppError } from '@shared/errors/AppError';
import { UploadCarImagesUseCase } from './UploadCarImagesUseCase';

let uploadImageCarUseCase: UploadCarImagesUseCase;
let fakeCarsRepository: FakeCarsRepository;
let fakeCarImagesRepository: FakeCarImagesRepository;

describe('UploadCarImage', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();
    fakeCarImagesRepository = new FakeCarImagesRepository();

    uploadImageCarUseCase = new UploadCarImagesUseCase(
      fakeCarsRepository,
      fakeCarImagesRepository,
    );
  });

  it('Should be able to upload image to car', async () => {
    const car = await fakeCarsRepository.create({
      name: 'Name',
      brand: 'Brand',
      category_id: 'category',
      daily_rate: 20,
      description: 'description',
      fine_amount: 60,
      license_plate: 'asd1234',
    });

    const images = await uploadImageCarUseCase.execute({
      car_id: car.id,
      images_name: ['filename', 'filename2'],
    });

    expect(images).toHaveLength(2);
  });

  it('Should not be able to upload image to car with a non-car', async () => {
    await expect(
      uploadImageCarUseCase.execute({
        car_id: 'non-car-id',
        images_name: ['filename'],
      }),
    ).rejects.toEqual(new AppError('Invalid Car'));
  });
});
