import { BaseEntity } from "src/entities/base.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity } from "typeorm";
import * as bcrypt from 'bcryptjs';

@Entity()
export class Member extends BaseEntity {
    @Column()
    name: string;

    @Column()
    email: string;

    @Column({ default: null, nullable: true, select: false })
    password: string;

    @Column()
    post: string;

    @Column({ type: 'boolean', default: false })
    isAdmin?: boolean;

    @Column({ nullable: true })
    image?: string;

    @Column({ nullable: true })
    facebook?: string;

    @Column({ nullable: true })
    instagram?: string;

    @Column({ nullable: true })
    twitter?: string;

    @Column({ nullable: true })
    linkedIn?: string;

    @Column({ nullable: true })
    phone?: string;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
            const saltRounds = 10;
            this.password = await bcrypt.hash(this.password, saltRounds);
        }
    }
}
