import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './user.entity';

@Entity()
class Address {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public street: string;

    @Column()
    public city: string;

    @Column()
    public country: string;


    @OneToOne(
        // two-way relationship between user and address
        () => User,
        //  linked by user.address column
        (user: User) => user.address)
    public user: User;
}

export default Address;

/*
    Bi-directional relations allow you to join relations from both sides using QueryBuilder:

    const profiles = await dataSource
    .getRepository(Profile)
    .createQueryBuilder("profile")
    .leftJoinAndSelect("profile.user", "user")
    .getMany()
*/