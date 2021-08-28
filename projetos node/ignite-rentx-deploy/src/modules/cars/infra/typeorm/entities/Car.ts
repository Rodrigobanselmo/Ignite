import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { CarImage } from './CarImage';
import { Category } from './Category';
import { Specification } from './Specification';

@Entity('cars')
class Car {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  brand: string;

  @Column()
  license_plate: string;

  @Column()
  category_id: string;

  @Column()
  daily_rate: number;

  @Column()
  fine_amount: number;

  @Column({ default: true })
  available: boolean;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToMany(() => Specification)
  @JoinTable({
    name: 'specifications_cars',
    joinColumns: [{ name: 'car_id' }],
    inverseJoinColumns: [{ name: 'specification_id' }],
  })
  specifications: Specification[];

  @OneToMany(() => CarImage, carimages => carimages.car)
  @JoinTable({
    name: 'cars_image',
    joinColumns: [{ name: 'car_id' }],
  })
  images: CarImage[];

  @CreateDateColumn()
  created_at?: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Car };
