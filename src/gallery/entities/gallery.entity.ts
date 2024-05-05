import { Service } from 'src/services/entities/service.entity';
import { BaseEntity } from '../../entities/base.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class Gallery extends BaseEntity {
  @Column()
  title: string;

  @Column({ type: 'simple-array' })
  images: string[];

  @OneToOne(() => Service, (service) => service.gallery, { nullable: true })
  @JoinColumn()
  service: Service;
}
