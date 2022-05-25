import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { MovieController } from './movie.controller';

@Module({
    imports:[
        TypeOrmModule.forFeature([Movie])
    ],
    controllers: [MovieController]
})
export class MovieModule {}
