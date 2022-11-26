import { Module } from '@nestjs/common';
// import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './entity/user.entity';
import Address from './entity/address.entity';

@Module({
  // TYpeorm table 
  imports: [
    TypeOrmModule.forFeature([Address]),
    TypeOrmModule.forFeature([User]),
],

  // controllers: [UsersController],
  //  a service/ Injectable must be in provider
  providers: [UsersService],
  //  to be used outside the module
  exports: [UsersService]
})
export class UsersModule { }
