import { BaseEntity } from "src/entities/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Faq extends BaseEntity {
    @Column({ type: 'text' })
    question: string;

    @Column({ type: 'longtext' })
    answer: string;
}
