import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Car } from './Car';

@Entity('cars_image')
class CarImage {
  @PrimaryColumn()
  id: string;

  @Column()
  image_name: string;

  @Column()
  car_id: string;

  @ManyToOne(() => Car, car => car.images)
  @JoinTable({
    name: 'cars',
    joinColumns: [{ name: 'car_id' }],
  })
  car: Car;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { CarImage };
