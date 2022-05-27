import { Movie } from '../movie/movie.entity';
import { User } from '../user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class LikeMovie {
  
  constructor(partial?: Partial<LikeMovie>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  like!: boolean;

  @Column()
  userId: number;

  @Column()
  movieId!: number;

  @ManyToOne(() => User, user => user.likeMovies)
  user: User;

  @ManyToOne(() => Movie, movie => movie.likeMovies)
  movie!: Movie;

}