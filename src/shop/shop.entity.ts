import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { Merchant } from "src/auth/merchant/merchant.entity";
import { BaseEntity, Column, Entity, OneToOne, PrimaryColumn } from "typeorm";

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
    @IsString()
    public shopNumber: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    public registrationNumber: string;

    @Column()
    @IsNotEmpty()
    @IsArray()
    public location: string[];

    @IsNotEmpty()
    @OneToOne(() => Merchant, (merchant) => merchant.shop)
    public owner: Merchant;
}
