import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import PostgresErrorCode from 'src/database/postgresErrorCode.enum';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RegisterDto } from './dto/register.dto';
import { TokenPayload } from 'src/interfaces/common.ts/common.interface';



/*  *
    * Authentication means checking the identity of user. It provides an answer to a question: who is the user?
    * Authorization is about access to resources. It answers the question: is user authorized to perform this operation?
    * 
    * When we use bcrypt, we define salt rounds. It boils down to being a cost factor and controls the time needed to receive a result. Increasing it by one doubles the time. The bigger the cost factor, the more difficult it is to reverse the hash with brute-forcing. Generally speaking, 10 salt rounds should be fine.
    * 
    * Using bcrypt might be an intensive task for the CPU. Fortunately, our bcrypt implementation uses a thread pool that allows it to run in an additional thread. Thanks to that, our application can perform other tasks while generating the hash.
*/

@Injectable()
export class AuthenticationService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {
        /*
        syntatic TS sugar. no need to write things like:

        this.usersService = usersService
        this.jwtService = jwtService
        this.configService = configService
        */
    }

    public async register(registrationData: RegisterDto) {
        const hashedPassword = await bcrypt.hash(registrationData.password, 10);
        try {
            const createdUser = await this.usersService.create({
                ...registrationData,
                password: hashedPassword
            });
            createdUser.password = undefined;
            return createdUser;
        } catch (error) {
            if (error?.code === PostgresErrorCode.UniqueViolation) {
                throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
            }
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async getAuthenticatedUser(email: string, plainTextPassword: string) {
        try {
            const user = await this.usersService.getByEmail(email);
            await this.verifyPassword(plainTextPassword, user.password);
            return user;
        } catch (error) {
            throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
        }
    }

    private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
        const isPasswordMatching = await bcrypt.compare(
            plainTextPassword,
            hashedPassword
        );
        if (!isPasswordMatching) {
            throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
        }
    }


    public getCookieWithJwtToken(userId: number) {
        const payload: TokenPayload = { userId };
        const token = this.jwtService.sign(payload);
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
    }

    public getCookieForLogOut() {
        return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
    }
}