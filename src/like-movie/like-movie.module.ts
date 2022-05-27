import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeMovie } from './like-movie.entity';
import { LikeMovieService } from './like-movie.service';
import { LikeMovieController } from './like-movie.controller';

@Module({
    imports:[
        TypeOrmModule.forFeature([LikeMovie])
    ],
    providers: [LikeMovieService],
    controllers: [LikeMovieController]
})
export class LikeMovieModule {}
