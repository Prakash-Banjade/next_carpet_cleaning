import { BaseEntity } from "../../entities/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class GalleryPage extends BaseEntity {
    @Column({ nullable: true })
    bannerImage: string; // filename

    
}