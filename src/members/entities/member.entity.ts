import { BaseEntity } from "src/entities/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Member extends BaseEntity {
    @Column()
    name: string;

    @Column({ nullable: true })
    email: string;

    @Column()
    post: string;

    @Column({ nullable: true })
    image?: string;

    @Column({ nullable: true })
    facebook?: string;

    @Column({ nullable: true })
    instagram?: string;

    @Column({ nullable: true })
    twitter?: string;
}
