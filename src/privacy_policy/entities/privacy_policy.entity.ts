import { BaseEntity, Column } from "typeorm";

export class PrivacyPolicy extends BaseEntity {
    @Column()
    title: string;

    @Column({ type: 'varchar' })
    content: string;
}
