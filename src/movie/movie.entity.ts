import { LikeMovie } from 'src/like-movie/like-movie.entity';
import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title : string;

  @Column()
  description: string;

  @ManyToOne(type => User, user => user.movies)
  user: User;

  @OneToMany(() => LikeMovie, likeMovie => likeMovie.movie)
  likeMovies: LikeMovie[];
}