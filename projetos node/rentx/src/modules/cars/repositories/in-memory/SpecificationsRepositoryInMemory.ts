import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from "../ISpecificationsRepository";

class SpecificationsRepositoryInMemory implements ISpecificationRepository {
  specifications: Specification[] = [];

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specfication = new Specification();

    Object.assign(specfication, {
      name,
      description,
    });

    this.specifications.push(specfication);

    return specfication;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.specifications.filter((specification) =>
      ids.includes(specification.id)
    );
  }

  async findByName(name: string): Promise<Specification> {
    return this.specifications.find(
      (specification) => specification.name === name
    );
  }
}

export { SpecificationsRepositoryInMemory };
