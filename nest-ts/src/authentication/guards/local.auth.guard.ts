// import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// import { Observable } from 'rxjs';

// @Injectable()
// export class LocalAuthGuard implements CanActivate {
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     return true;
//   }
// }

// No need to write the guard yeahhh

@Injectable()

export default class LocalAuthenticationGuard extends AuthGuard('local') {

    // session guard 
    
    // activate session here so many lines of code
    // async canActivate(context: ExecutionContext): Promise<boolean> {
    //     // check the email and the password
    //     await super.canActivate(context);

    //     // initialize the session
    //     const request = context.switchToHttp().getRequest();
    //     await super.logIn(request);

    //     // if no exceptions were thrown, allow the access to the route
    //     return true;
    // }

}
// Basically searches for any implementation of passport-local in this app


