import { BaseEntity } from '../../entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Location extends BaseEntity {
  @Column({ unique: true })
  title: string;
}
