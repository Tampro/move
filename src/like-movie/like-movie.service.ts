import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LikeMovie } from './like-movie.entity';

@Injectable()
export class LikeMovieService {
    constructor(
        @InjectRepository(LikeMovie) protected readonly likeMovieRepository: Repository<LikeMovie>
     ){
     }
 
     public async save(body){
         return this.likeMovieRepository.save(body);
     }


}
