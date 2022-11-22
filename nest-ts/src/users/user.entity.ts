import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
class User {
  @ApiProperty({
    type: Number,
    description: 'Auto-generated',
  })
  @PrimaryGeneratedColumn()
  public id?: number;
 
  @ApiProperty({
    type: String
  })
  @Column({ unique: true })
  public email: string;
 
  @ApiProperty({
    type: String
  })
  @Column()
  public name: string;
 
  @ApiProperty({
    type: String
  })
  @Column()
  public password: string;
}
 
export default User;