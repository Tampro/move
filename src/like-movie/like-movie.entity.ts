import { Movie } from 'src/movie/movie.entity';
import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class LikeMovie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  like!: boolean;

  @Column()
  userId!: number;

  @Column()
  movieId!: number;

  @ManyToOne(() => User, user => user.likeMovies)
  user!: User;

  @ManyToOne(() => Movie, movie => movie.likeMovies)
  movie!: Movie;

}