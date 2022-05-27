import { LikeMovie } from '../like-movie/like-movie.entity';
import { User } from '../user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Movie {

  constructor(partial?: Partial<Movie>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    charset: 'utf8mb4',
    collation: 'utf8mb4_general_ci',
  })
  title: string;

  @Column({
    type: 'text',
    charset: 'utf8mb4',
    collation: 'utf8mb4_general_ci',
  })
  description: string;

  @Column()
  youtubeId: string;

  @Column()
  userId: number;

  @ManyToOne((type) => User, (user) => user.movies)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => LikeMovie, (likeMovie) => likeMovie.movie)
  likeMovies: LikeMovie[];
}
