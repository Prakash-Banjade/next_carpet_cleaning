import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../entities/base.entity';

@Entity()
export class Enquiry extends BaseEntity {
  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  email: string;

  @Column({ type: 'text' })
  phone: string;

  @Column({ type: 'text' })
  message: string;
}
