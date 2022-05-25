import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeMovie } from './like-movie.entity';

@Module({
    imports:[
        TypeOrmModule.forFeature([LikeMovie])
    ]
})
export class LikeMovieModule {}
