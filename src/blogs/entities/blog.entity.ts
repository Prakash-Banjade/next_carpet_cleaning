import { FileSystemStoredFile } from "nestjs-form-data";
import { BaseEntity } from "src/entities/base.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class Blog extends BaseEntity {
    @Column({ type: 'text' })
    title: string;

    @Column({ type: 'text' })
    content: string;

    @Column({ nullable: true })
    coverImage: string; // filename

    @ManyToOne(() => User, user => user.blogs, { eager: true })
    author: User
}
