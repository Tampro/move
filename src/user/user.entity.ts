import { LikeMovie } from '../like-movie/like-movie.entity';
import { Movie } from '../movie/movie.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {

  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;
  @Column({
      unique:true
  })
  email : string;

  @Column()
  password: string;

  @OneToMany(type => Movie, movie => movie.user)
  movies: Movie[];

  @OneToMany(() => LikeMovie, likeMovie => likeMovie.user)
  likeMovies: LikeMovie[];
}