import { BaseEntity } from '../../entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Faq extends BaseEntity {
  @Column({ type: 'text' })
  question: string;

  @Column()
  answer: string;
}
