import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movie.entity';

@Module({
    imports:[
        TypeOrmModule.forFeature([Movie])
    ]
})
export class MovieModule {}
