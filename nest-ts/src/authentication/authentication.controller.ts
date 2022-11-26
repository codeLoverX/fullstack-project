import { Body, ClassSerializerInterceptor, Controller, Get, HttpCode, Post, Req, Res, SerializeOptions, UseGuards, UseInterceptors } from '@nestjs/common';
import User from '../users/entity/user.entity';
import { AuthenticationService } from './authentication.service';
import { RegisterDto } from './dto/register.dto';
import JwtAuthenticationGuard from './guards/jwt.auth.guard';
import LocalAuthenticationGuard from './guards/local.auth.guard';
import { Request, Response } from 'express';
import { ApiBody } from '@nestjs/swagger';

// Express reqiest
interface RequestWithUser extends Request {
    // The body is request.user bcs of this interface
    user: User
}

// When ClassSerializerInterceptor was applied globally, all properties of all comtrollers were exposed
//  TO PREVENT A CONTROLLER'S PROPERTY FROM BEING EXPOSED
@SerializeOptions({
    strategy: 'excludeAll'
})
@UseInterceptors(ClassSerializerInterceptor)
// INTERCEPTS ALL USER ENTITIY FROM USER MODULE
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
    // The SwaggerModule searches for all @Body(), @Query(), and @Param() decorators 
    // in route handlers to generate the API document. 
    //  IN THEIR ABSENCE WE NEED TO SPECIFY THE BODY
    @ApiBody({
        schema: {
            properties: {
                'email': { type: 'string' },
                'password': { type: 'string' }
            }
        }
    })
    // normally 
    async logIn(@Req() request: RequestWithUser,
    // Unfortunately, @Res()  interferes with the  ClassSerializerInterceptor. To prevent that, 
    // we can follow some advice from the creator of NestJS. If we use the  request.res 
    // object instead of the  @Res() decorator, we don’t put NestJS into the express-specific mode.
    // @Res() response: Response
    ) {
        const { user } = request;
        console.log({ user, request })
        const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
        // response.setHeader('Set-Cookie', cookie);
        request.res.setHeader('Set-Cookie', cookie);
        user.password = undefined;
        // return response.send(user);
        return user;
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
