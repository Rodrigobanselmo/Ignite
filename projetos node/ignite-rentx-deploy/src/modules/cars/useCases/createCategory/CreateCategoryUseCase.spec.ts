import { FakeCategoriesRepository } from '@modules/cars/repositories/fakes/FakeCategoriesRepository';
import { AppError } from '@shared/errors/AppError';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let createCategoryUseCase: CreateCategoryUseCase;
let fakeCategoriesRepository: FakeCategoriesRepository;
describe('Create Category', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    createCategoryUseCase = new CreateCategoryUseCase(fakeCategoriesRepository);
  });

  it('Should be able to create a new category', async () => {
    const category = await createCategoryUseCase.execute({
      name: 'Name',
      description: 'description',
    });

    expect(category).toHaveProperty('id');
  });

  it('Should not be able to create a new category with same name', async () => {
    await createCategoryUseCase.execute({
      name: 'Name',
      description: 'description',
    });
    await expect(
      createCategoryUseCase.execute({
        name: 'Name',
        description: 'description',
      }),
    ).rejects.toEqual(new AppError('This category already exist'));
  });
});
