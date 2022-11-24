// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
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
export default class JwtAuthenticationGuard extends AuthGuard('jwt') {}
// Basically searches for any implementation of passport-local in this app