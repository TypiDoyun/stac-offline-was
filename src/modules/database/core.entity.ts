import {
    CreateDateColumn,
    ObjectId as ObjectIdType,
    ObjectIdColumn,
    UpdateDateColumn
} from "typeorm";
export class BaseEntity {
    @ObjectIdColumn()
    public _id: ObjectIdType;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;
}
