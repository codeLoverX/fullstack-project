import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
// Only exposed properties will be sent
// Interceptor/ serializer have 2 main functions: 1. omit/add property 2. transform property
// 1. add/ remove property:
// Expose helps to add property (NEEDED AS CONTROLLER CLASS has SerializeOptions excludeAll)
// Exclude helps to remove property (NEEDED AS CONTROLLER CLASS has SerializeOptions excludeAll)

import { Exclude, Expose } from 'class-transformer';
import Address from './address.entity';
import Post from 'src/posts/entity/post.entity';

// All @Expose here are for auth controller 
@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Expose()
  @Column({ unique: true })
  public email: string;
  @Column({ nullable: true })
  public loggedIn?: string;

  @Expose()
  @Column()
  public name: string;

  // no @Column() as this is not a column but another table
  // 1 user has 1 one address
  @OneToOne(() => Address, {
    // Everytime you fetch user, you get address
    // Only one side of relatioship can be eager
    // If you use QueryBuilder eager relations are disabled, you have to use leftJoinAndSelect to load the relation.
    eager: true,
    // Everytime you save a user
    //  You save an address too
    cascade: true,
    nullable: true
  })
  // We also added @JoinColumn which is required and must be set only on one side of the relation. 
  // The side you set @JoinColumn on, that side's table will contain a "relation id" and foreign keys to target entity table.
  @JoinColumn()
  // no Expose for AuthController
  public address?: Address;


  //  1. Remove property
  @Exclude()
  @Column()
  public password: string;

  // inverse relationship
  @OneToMany(() => Post, (post: Post) => post.author)
  public posts: Post[];
}

export default User;

/*
Example how to save such a 1-1 relation :

const address = new address()
address.street = "male"
....
await dataSource.manager.save(address)

const user = new User()
user.name = "Joe Smith"
....
user.address = address
await dataSource.manager.save(user)

With cascades enabled you can save this relation with only one save call.
To load user with address inside you must specify relation in FindOptions:

const users = await dataSource.getRepository(User).find({
    relations: {
        address: true,
    },
})

Or using QueryBuilder you can join them:

const users = await dataSource
    .getRepository(User)
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.address", "address")
    .getMany()
*/