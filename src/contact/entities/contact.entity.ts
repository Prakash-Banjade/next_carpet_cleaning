import { BaseEntity } from "src/entities/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Contact extends BaseEntity {
    @Column({ type: 'simple-array', nullable: true })
    phone: string[]

    @Column({ type: 'text', nullable: true })
    address: string;

    @Column({ type: 'text', nullable: true })
    email: string;

    @Column({ type: 'text', nullable: true })
    facebook: string;

    @Column({ type: 'text', nullable: true })
    instagram: string;

    @Column({ type: 'text', nullable: true })
    twitter: string;

    @Column({ type: 'text', nullable: true })
    linkedIn: string;

    @Column({ type: 'text', nullable: true })
    website: string;
}
