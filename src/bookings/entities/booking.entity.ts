import { BaseEntity } from "../../entities/base.entity";
import { Service } from "../../services/entities/service.entity";
import { User } from "../../users/entities/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class Booking extends BaseEntity {
    @Column()
    location: string;

    @ManyToOne(() => Service, (service) => service.bookings, {eager: true})
    service: Service;

    @ManyToOne(() => User, (user) => user.bookings)
    user: User;

    @Column()
    message: string;

    @Column()
    time: string;
}
