import { BaseEntity } from "src/entities/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Pricing extends BaseEntity {
    @Column()
    name: string;

    @Column({ type: 'integer' })
    price: number;

    @Column({ type: 'enum', enum: ['month', 'year'] })
    per: ['month', 'year'];

    @Column({ type: 'simple-array' })
    description: string[];
}
