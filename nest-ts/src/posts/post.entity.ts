import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
class Post {
  @ApiProperty({
    type: Number,
    description: 'Auto-generated',
  })
  @PrimaryGeneratedColumn()
  public id?: number;

  @ApiProperty({
    type: String
  })
  @Column()
  public title: string;

  @ApiProperty({
    type: String
  })
  @Column()
  public content: string;
}

export default Post;