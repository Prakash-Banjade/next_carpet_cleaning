import { BaseEntity } from "../../entities/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class ContactPage extends BaseEntity {
    @Column({ nullable: true })
    bannerImage: string; // filename

    @Column()
    title: string;

    @Column()
    content: string;

}