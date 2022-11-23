import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthenticationController } from './authentication.controller';
import { JwtStrategy } from './strategy/jwt.auth';
import { LocalStrategy } from './strategy/local.auth';
@Module({
  imports: [
    // must mention the dependencies used in files of the module except for the module file itself
    // so they will be instatied by the compiler
    UsersModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
        },
      }),
    }),
  ],
  // Anything mentioned with @Injectable wil be used again and again in the class. Need to be mentioned here
  providers: [AuthenticationService, LocalStrategy, JwtStrategy],
  controllers: [AuthenticationController]
})
export class AuthenticationModule {}
