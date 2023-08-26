import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { compare } from "bcryptjs";

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    public async getUserIfRefreshTokenMatches(
        refreshToken: string,
        id: string
    ) {
        const user = await this.userRepository.findUserById(id);

        if (!user) return;

        const isCorrect = compare(refreshToken, user.currentHashedRefreshToken);

        if (isCorrect) return user;
    }
}
