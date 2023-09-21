import { IsArray, IsEmpty, IsNotEmpty, IsString } from "class-validator";
import { ObjectId } from "mongodb";
import { Merchant } from "src/auth/merchant/merchant.entity";
import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity("shop")
export class Shop extends BaseEntity {
    @PrimaryColumn()
    @IsNotEmpty()
    @IsString()
    public name: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    public logo: string;

    @Column()
    @IsNotEmpty()
    public address: string;

    @Column()
    @IsArray()
    @IsEmpty()
    public location: number[];

    @Column()
    @IsNotEmpty()
    @IsString()
    public registrationNumber: string;

    @Column()
    @IsEmpty()
    public ownerId: ObjectId;

    public owner: Merchant;
}
