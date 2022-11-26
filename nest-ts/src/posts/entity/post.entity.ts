import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
// Only exposed properties will be sent
// Interceptor/ serializer have 2 main functions: 1. omit/add property 2. transform property
// 2. transform property:
// Transform is to transform property
import { Transform } from 'class-transformer';
import User from 'src/users/entity/user.entity';
import Category from 'src/category/entities/category.entity';

@Entity()
class Post {
  
  @PrimaryGeneratedColumn()
  public id?: number;

 
  @Column()
  public title: string;

 
  @Column()
  public content: string;

  // manyToOne inverse
  @ManyToOne(() => User, (author: User) => author.posts)
  public author: User;

  @ManyToMany(() => Category, (category: Category) => category.posts)
  @JoinTable()
  public categories: Category[];
  
  @Column({ nullable: true })
   @Transform(value => {
    return String(value).toUpperCase()
  })
  public category?: string;
}

export default Post;