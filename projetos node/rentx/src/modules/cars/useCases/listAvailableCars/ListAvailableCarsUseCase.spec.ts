import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;

describe("List available cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car name",
      description: "Car description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 26,
      brand: "Brand",
      category_id: "category",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car name",
      description: "Car description",
      daily_rate: 100,
      license_plate: "ABC-2345",
      fine_amount: 26,
      brand: "Brand to look",
      category_id: "category",
    });

    await carsRepositoryInMemory.create({
      name: "Car name",
      description: "Car description",
      daily_rate: 100,
      license_plate: "ABC-5432",
      fine_amount: 26,
      brand: "Brand not to look",
      category_id: "category",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Brand to look",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car name",
      description: "Car description",
      daily_rate: 100,
      license_plate: "ABC-3456",
      fine_amount: 26,
      brand: "Brand",
      category_id: "category_to_look",
    });

    await carsRepositoryInMemory.create({
      name: "Car name",
      description: "Car description",
      daily_rate: 100,
      license_plate: "ABC-6543",
      fine_amount: 26,
      brand: "Brand",
      category_id: "category_not_to_look",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "category_to_look",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car name to look",
      description: "Car description",
      daily_rate: 100,
      license_plate: "ABC-4567",
      fine_amount: 26,
      brand: "Brand",
      category_id: "category",
    });

    await carsRepositoryInMemory.create({
      name: "Car name not to look",
      description: "Car description",
      daily_rate: 100,
      license_plate: "ABC-7654",
      fine_amount: 26,
      brand: "Brand",
      category_id: "category",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Car name to look",
    });

    expect(cars).toEqual([car]);
  });
});
