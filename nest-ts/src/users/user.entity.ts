import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
// Only exposed properties will be sent
// Interceptor/ serializer have 2 main functions: 1. omit/add property 2. transform property
// 1. add/ remove property:
// Expose helps to add property (NEEDED AS CONTROLLER CLASS has SerializeOptions excludeAll)
// Exclude helps to remove property (NEEDED AS CONTROLLER CLASS has SerializeOptions excludeAll)

import { Exclude, Expose } from 'class-transformer';

@Entity()
class User {
  @ApiProperty({
    type: Number,
    description: 'Auto-generated',
  })
  @PrimaryGeneratedColumn()
  public id?: number;

  @Expose()
  @ApiProperty({
    type: String
  })
  @Column({ unique: true })
  public email: string;

  @Column({ nullable: true })
  public loggedIn?: string;
  
  @Expose()
  @ApiProperty({
    type: String
  })
  @Column()
  public name: string;
//  1. Remove property
  @Exclude()
  @ApiProperty({
    type: String
  })
  @Column()
  public password: string;
}
 
export default User;