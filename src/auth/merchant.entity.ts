import { BaseEntity } from "src/modules/database/core.entity";
import { Column, Entity } from "typeorm";

@Entity("merchant")
export class Merchant extends BaseEntity {
    @Column()
    public username: string;

    @Column()
    public password: string;
}
