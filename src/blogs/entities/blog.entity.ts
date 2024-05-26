import { User } from '../../users/entities/user.entity';
import { BaseEntity } from '../../entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Blog extends BaseEntity {
  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'longtext' })
  content: string;

  @Column({ nullable: true })
  coverImage: string; // filename
}
