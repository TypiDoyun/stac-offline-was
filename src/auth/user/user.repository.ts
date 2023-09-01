import { DataSource, FindOptionsWhere, Repository } from "typeorm";
import { User } from "./user.entity";
import { UserSignUpDto } from "../dto/user-sign-up.dto";
import { ConflictException, Injectable } from "@nestjs/common";
import { genSalt, hash } from "bcryptjs";
import { ObjectId } from "mongodb";

@Injectable()
export class UserRepository {
    private readonly repository: Repository<User>;

    constructor(private readonly dataSource: DataSource) {
        this.repository = this.dataSource.getRepository(User);
    }

    public async canCreate(id: string) {
        return !(await this.findUserById(id));
    }

    public async createUser(userSignUpDto: UserSignUpDto) {
        const { password } = userSignUpDto;

        const salt = await genSalt();
        const hashedPassword = await hash(password, salt);

        const user = this.repository.create({
            ...userSignUpDto,
            password: hashedPassword
        });

        try {
            return await this.repository.save(user);
        } catch (error) {
            if (error.code === 11000)
                throw new ConflictException("user id already exists");
            throw error;
        }
    }

    public async findOneUser(options: FindOptionsWhere<User>) {
        return await this.repository.findOneBy(options);
    }

    public async findUserById(id: string): Promise<User | undefined> {
        return await this.repository.findOneBy({ id });
    }

    public async findUserByOId(objectId: ObjectId): Promise<User | undefined> {
        return await this.repository.findOneBy({
            _id: objectId
        });
    }

    public async updateRefreshToken(id: string, refreshToken: string) {
        await this.repository.update(
            { id },
            { currentHashedRefreshToken: refreshToken }
        );
    }
}
