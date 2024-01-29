import { BaseEntity } from "src/entities/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Service extends BaseEntity {
    @Column()
    title: string;

    @Column()
    content: string;

    @Column({ nullable: true })
    coverImage: string;
}
