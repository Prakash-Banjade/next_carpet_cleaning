import { FileSystemStoredFile } from "nestjs-form-data";
import { BaseEntity } from "src/entities/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Blog extends BaseEntity {
    @Column({ type: 'text' })
    title: string;

    @Column({ type: 'text' })
    content: string;

    @Column({ nullable: true })
    coverImage: string; // filename
}
