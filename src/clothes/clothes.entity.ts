import {
    IsArray,
    IsEmpty,
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsString,
    Length
} from "class-validator";
import { ObjectId } from "mongodb";
import { Merchant } from "src/auth/merchant/merchant.entity";
import { BaseEntity } from "src/modules/database/core.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity("clothes")
@Unique(["name"])
export class Clothes extends BaseEntity {
    @Column()
    @IsString()
    @IsNotEmpty()
    public name: string;

    @Column()
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    public price: number;

    @Column()
    @IsArray()
    @IsNotEmpty()
    public size: string[];

    @Column()
    @IsString()
    @IsNotEmpty()
    @Length(2, 500)
    public comment: string;

    @Column()
    @IsNumber()
    @IsNotEmpty()
    public discountRate: number;

    @Column({ array: true })
    @IsNotEmpty()
    public images: string[];

    @Column()
    public ownerId: ObjectId;

    public owner: Merchant;
}
