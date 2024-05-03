import { BaseEntity } from '../../entities/base.entity';
import { Service } from '../../services/entities/service.entity';
import { User } from '../../users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

export enum Status {
  PENDING = 'pending',
  SUCCESSED = 'successed',
  REJECTED = 'rejected',
}

@Entity()
export class Booking extends BaseEntity {
  @Column()
  location: string;

  @ManyToOne(() => Service, (service) => service.bookings, {
    onDelete: 'RESTRICT',
  })
  service: Service;

  @ManyToOne(() => User, (user) => user.bookings)
  user: User;

  @Column()
  message: string;

  @Column({ type: 'enum', enum: Status, default: Status.PENDING })
  status: Status;

  @Column()
  time: string;
}
