import { BaseEntity } from "src/entities/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class PrivacyPolicy extends BaseEntity {
    @Column()
    title: string;

    @Column({ type: 'varchar' })
    content: string;
}
