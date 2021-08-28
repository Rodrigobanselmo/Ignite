import { ICreateSpecificationDTO } from '@modules/cars/dtos/ICreateSpecificationDTO';
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

import { ISpecificationsRepository } from '../ISpecificationsRepository';

class FakeSpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[] = [];

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    });

    this.specifications.push(specification);

    return specification;
  }

  async list(): Promise<Specification[]> {
    return this.specifications;
  }

  async findByName(name: string): Promise<Specification | undefined> {
    const specification = this.specifications.find(
      specification => specification.name === name,
    );
    return specification;
  }

  async findById(id: string): Promise<Specification | undefined> {
    const specification = this.specifications.find(
      specification => specification.id === id,
    );
    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specification = this.specifications.filter(specification =>
      ids.includes(specification.id),
    );
    return specification;
  }
}

export { FakeSpecificationsRepository };
