import { BaseEntity } from '../../entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Service extends BaseEntity {
  @Column({ type: 'text' })
  title: string;

  @Column()
  content: string;

  @Column({ nullable: true, type: 'text' })
  coverImage: string;
}
