import { Body, Controller, Get, Post } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {

    constructor(
        private movieService: MovieService
    ){
    }

    @Post('share')
    async share(@Body() body: any){

        return await this.movieService.save({
            title:body.title,
            description: body.description,
            youtubeUrl: body.youtubeUrl,
            userId: body.userId
        });
    }

    @Get()
    async findAll(){
        const events = await this.movieService.getAll();
        return events;
    }
}
