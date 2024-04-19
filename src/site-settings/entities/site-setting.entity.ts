import { BaseEntity } from "src/entities/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class SiteSettings extends BaseEntity {
    @Column()
    title: string;

    @Column()
    tagline: string;

    @Column({ nullable: true })
    primaryImage: string;

    @Column({ nullable: true })
    secondaryImage: string;
}