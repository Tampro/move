import { LikeMovie } from 'src/like-movie/like-movie.entity';
import { Movie } from 'src/movie/movie.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
      unique:true
  })
  username : string;

  @Column()
  password: string;

  @OneToMany(type => Movie, movie => movie.user)
  movies: Movie[];

  @OneToMany(() => LikeMovie, likeMovie => likeMovie.user)
  likeMovies: LikeMovie[];
}