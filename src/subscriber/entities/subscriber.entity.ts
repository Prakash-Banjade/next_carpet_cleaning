import { BaseEntity } from "../../entities/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Subscriber extends BaseEntity {
    @Column()
    email: string;
}
