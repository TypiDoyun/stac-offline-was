import { IsArray, IsNotEmpty, IsEmpty } from "class-validator";
import { Column, Entity } from "typeorm";
import { User } from "../user/user.entity";
import { ObjectId } from "mongodb";

@Entity("merchant")
export class Merchant extends User {
    @Column()
    @IsArray()
    @IsNotEmpty()
    public location: number[];

    @Column({
        nullable: true
    })
    @IsEmpty()
    public shop: ObjectId;
}
