import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
// Only exposed properties will be sent
// Interceptor/ serializer have 2 main functions: 1. omit/add property 2. transform property
// 2. transform property:
// Transform is to transform property
import { Transform } from 'class-transformer';

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


  @Column({ nullable: true })
  @ApiProperty({
    type: String
  })
  @Transform(value => {
    if (value !== null) {
      return value;
    }
  })
  public category?: string;
}

export default Post;