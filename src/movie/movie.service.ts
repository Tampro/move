import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';

@Injectable()
export class MovieService {
    constructor(
        @InjectRepository(Movie) protected readonly movieRepository: Repository<Movie>
     ){
     }
 
     public async save(body){
         return this.movieRepository.save(body);
     }

     public async getAll( ){
        return await this.movieRepository
        .createQueryBuilder('m')
        .leftJoinAndSelect('m.likeMovies', 'lm')
        .innerJoinAndSelect('m.user', 'u')
        .orderBy('m.id', 'DESC')
        .getMany();
    }
}
