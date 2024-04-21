import { Booking } from '../../bookings/entities/booking.entity';
import { BaseEntity } from '../../entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Service extends BaseEntity {
  @Column({ type: 'text' })
  title: string;

  @Column()
  content: string;

  @Column({ nullable: true, type: 'text' })
  coverImage: string;

  @OneToMany(() => Booking, (booking) => booking.service, { nullable: true })
  bookings: Booking[]
}
