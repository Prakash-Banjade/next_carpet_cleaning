import { BaseEntity } from "src/entities/base.entity";
import { Column } from "typeorm";

export class TopQuality extends BaseEntity {

    @Column({ nullable: true })
    image: string;

    @Column()
    title: string;

    @Column()
    description: string;
}