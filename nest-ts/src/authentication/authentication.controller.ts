import { Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import User from 'src/users/user.entity';
import { AuthenticationService } from './authentication.service';
import { RegisterDto } from './dto/register.dto';
import JwtAuthenticationGuard from './guards/jwt.auth.guard';
import LocalAuthenticationGuard from './guards/local.auth.guard';
import { Request, Response } from 'express';
import { ApiBody } from '@nestjs/swagger';

// Express reqiest o,ported for this
interface RequestWithUser extends Request {
    body: {
        user: User
    },
    user: User
}

@Controller('authentication')
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService) { }

    @Post('register')
    async register(@Body() registrationData: RegisterDto) {
        return this.authenticationService.register(registrationData);
    }

    @HttpCode(200)
    @UseGuards(LocalAuthenticationGuard)
    @Post('login')
    @ApiBody({
        schema: {
            properties: {
                'name': { type: 'string' },
                'password': { type: 'string' }
            }
        }
     })
    // normally 
    async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
        const { user } = request;
        console.log({user, request})
        const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
        response.setHeader('Set-Cookie', cookie);
        user.password = undefined;
        return response.send(user);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Post('logout')
    async logOut(@Res() response: Response) {
        response.setHeader('Set-Cookie', this.authenticationService.getCookieForLogOut());
        return response.sendStatus(200);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Get()
    authenticate(@Req() request: RequestWithUser) {
        const user = request.user;
        user.password = undefined;
        return user;
    }
}
