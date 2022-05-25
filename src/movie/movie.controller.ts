import { Body, Controller, Post } from '@nestjs/common';

@Controller('movie')
export class MovieController {

    @Post('share')
    share(@Body() body: any){
        return body;
    }

    @Post('list')
    list(@Body() body: any){
        return body;
    }
}
