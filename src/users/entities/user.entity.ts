import { BeforeInsert, BeforeUpdate, Column, Entity } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { BaseEntity } from "src/entities/base.entity";

@Entity()
export class User extends BaseEntity {
    @Column()
    email: string;

    @Column()
    password: string;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
            const saltRounds = 10;
            this.password = await bcrypt.hash(this.password, saltRounds);
        }
    }

}
