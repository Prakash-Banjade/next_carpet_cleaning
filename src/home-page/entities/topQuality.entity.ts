import { BaseEntity } from "../../entities/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class TopQuality extends BaseEntity {
    @Column({ nullable: true })
    image: string;

    @Column()
    title: string;

    @Column({ type: 'longtext' })
    description: string;
}