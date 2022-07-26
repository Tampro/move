import { Expose } from "class-transformer";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { LikeMovie } from '../like-movie/like-movie.entity';
import { Movie } from '../movie/movie.entity';
import { Profile } from "./profile.entity";

@Entity()
export class User {

  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column({
    unique: true
  })
  @Column({ unique: true })
  @Expose()
  username: string;

  @Column({ unique: true })
  @Expose()
  email: string;

  @Column()
  password: string;

  @Column()
  @Expose()
  firstName: string;

  @Column()
  @Expose()
  lastName: string;

  @OneToOne(() => Profile)
  @JoinColumn()
  @Expose()
  profile: Profile;

  @OneToMany(type => Movie, movie => movie.user)
  movies: Movie[];

  @OneToMany(() => LikeMovie, likeMovie => likeMovie.user)
  likeMovies: LikeMovie[];
}