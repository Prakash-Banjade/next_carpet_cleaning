import { BaseEntity } from "../../entities/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class HeroSection extends BaseEntity {
    @Column()
    title: string;

    @Column()
    subtitle: string;

    @Column({ type: 'longtext' })
    description: string;

    @Column()
    image: string;
}
