import { BaseEntity } from "src/entities/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Gallery extends BaseEntity {
    @Column()
    title: string;

    @Column({ type: 'simple-array' })
    images: string[];
}
