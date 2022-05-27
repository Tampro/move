import { Body, Controller, Post } from '@nestjs/common';
import { LikeMovieService } from './like-movie.service';

@Controller('like-movie')
export class LikeMovieController {
    constructor(
        private likeMovieService: LikeMovieService
    ){
    }
    
    @Post()
    async save(@Body() body: any){
        return await this.likeMovieService.save({
            like:body.like,
            userId: body.userId,
            movieId: body.movieId
        });
    }
}
