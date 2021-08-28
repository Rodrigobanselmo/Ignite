import { getRepository, Repository } from "typeorm";

import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from "@modules/cars/repositories/ISpecificationsRepository";

import { Specification } from "../entities/Specification";

class SpecificationsRepository implements ISpecificationRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({
      name,
      description,
    });

    return this.repository.save(specification);
  }

  findByIds(ids: string[]): Promise<Specification[]> {
    return this.repository.findByIds(ids);
  }

  async findByName(name: string): Promise<Specification> {
    return this.repository.findOne({ name });
  }
}

export { SpecificationsRepository };
