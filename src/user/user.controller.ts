import { Body, Controller, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
    @Post('register')
    register(@Body() body: any){
        return body;
    }

    @Post('login')
    login(@Body() body: any){
        return body;
    }
}