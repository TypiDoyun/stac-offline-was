import { BadRequestException } from "@nestjs/common";
import { Transform } from "class-transformer";
import {
    IsArray,
    IsEmpty,
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsString,
    Length,
    Max,
    Min
} from "class-validator";
import { BaseEntity } from "src/modules/database/core.entity";
import { Column, Entity } from "typeorm";

@Entity("clothes")
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
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    @Max(10)
    public size: Size;

    @Column()
    @IsString()
    @IsNotEmpty()
    @Length(2, 20)
    public comment: string;

    @Column()
    @IsNumber()
    @IsNotEmpty()
    public discountRate: number;

    @Column()
    @IsArray()
    @IsNotEmpty()
    @Transform(({ value }) => {
        if (!value.every((item) => item.constructor.name === "String"))
            throw new BadRequestException(["tags must be string array"]);
        return value;
    })
    public tags: string[];

    @Column()
    @IsEmpty()
    public images: string[];
}

export enum Size {
    FREE,
    XS,
    S,
    M,
    L,
    XL,
    TWO_XL
}
