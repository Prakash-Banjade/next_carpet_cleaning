import { BaseEntity, Column, Entity } from "typeorm";

@Entity()
export class HeroSection extends BaseEntity {
    @Column()
    title: string;

    @Column()
    subTitle: string;

    @Column()
    description: string;

    @Column()
    image: string;
}
