import { IsArray, IsNotEmpty, IsEmpty, IsString } from "class-validator";
import { Column, Entity } from "typeorm";
import { User } from "../user/user.entity";
import { Shop } from "src/shop/shop.entity";

@Entity("merchant")
export class Merchant extends User {
    @Column()
    @IsArray()
    @IsNotEmpty()
    public location: number[];

    @Column()
    @IsEmpty()
    public address: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    public residentNumber: string;

    @Column({
        nullable: true
    })
    @IsEmpty()
    public shop: Shop;
}
