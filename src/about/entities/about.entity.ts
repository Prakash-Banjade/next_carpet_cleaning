import { BaseEntity } from "../../entities/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class AboutPage extends BaseEntity {
    @Column()
    title: string;

    @Column()
    content: string;

    @Column({ nullable: true })
    coverImage: string;

    @Column({ nullable: true })
    bannerImage: string;
}
