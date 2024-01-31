import { BaseEntity } from "src/entities/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Service extends BaseEntity {
    @Column({ type: 'text' })
    title: string;

    @Column({ type: 'longtext' })
    content: string;

    @Column({ nullable: true, type: 'text' })
    coverImage: string;
}
