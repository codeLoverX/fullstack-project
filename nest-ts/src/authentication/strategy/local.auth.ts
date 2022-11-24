import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthenticationService } from '../authentication.service';
import User from 'src/users/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  /*  *

  
  Q1) PASSPORT IS NOT SAVING ME WORK FOR LOCAL STRATEGY!

  It's not saving me any work. I have to write the configuration, the callback, and the user schema. To me, 
  it's just easier for me to just write a middleware for that.

  If you're just using the local strategy, yeah, no point. But when you have requirements to auth with google, 
  fb, twitter, local, and maybe some other sites logins, it ends up being a lot of code written for a task 
  that has been done many times before. This is the purpose of passport.        
  
  *   */

  constructor(private authenticationService: AuthenticationService) {
    super({ usernameField: 'email' });
  }
  
  async validate(email: string, password: string): Promise<User> {
    return this.authenticationService.getAuthenticatedUser(email, password);
  }
}