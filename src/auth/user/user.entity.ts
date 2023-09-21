import { Exclude } from "class-transformer";
import {
    IsNotEmpty,
    IsNumberString,
    IsPhoneNumber,
    IsString,
    Length
} from "class-validator";
import { BaseEntity } from "src/modules/database/core.entity";
import { Column, Entity, Unique } from "typeorm";
import { Merchant } from "../merchant/merchant.entity";

@Entity("user")
@Unique(["id"])
export class User extends BaseEntity {
    @Column()
    @IsString()
    @IsNotEmpty()
    @Length(6, 12)
    public id: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    @Length(1, 8)
    public username: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    @Length(6, 15)
    @Exclude({ toPlainOnly: true })
    public password: string;

    @Column()
    @IsNumberString()
    @IsNotEmpty()
    @Length(0, 11)
    @IsPhoneNumber("KR")
    public phoneNumber: string;

    @Column()
    @IsNumberString()
    @IsNotEmpty()
    @Length(6)
    public birthday: string;

    @Column({ nullable: true })
    @IsString()
    @Exclude({ toPlainOnly: true })
    public currentHashedRefreshToken?: string;

    public isMerchant(): this is Merchant {
        return this instanceof Merchant;
    }
}
