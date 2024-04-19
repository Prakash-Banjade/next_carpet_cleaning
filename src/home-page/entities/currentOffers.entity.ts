import { BaseEntity } from "../../entities/base.entity"
import { Column, Entity } from "typeorm"

@Entity()
export class CurrentOffer extends BaseEntity {
    @Column({ type: 'text' })
    title: string

    @Column({ type: 'text' })
    description: string

    @Column({ type: 'text', nullable: true })
    image?: string
}