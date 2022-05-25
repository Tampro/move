import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcryptjs from 'bcryptjs';
@Controller('user')
export class UserController {

    constructor(
        private userService: UserService
    ){
    }

    @Post('register')
    async register(@Body() body: any){
        if (body.password !== body.passwordConfirm) {
            throw new BadRequestException("Password do not match");
        }
        return this.userService.save({
            username:body.username,
            password: await bcryptjs.hash(body.password, 12)
        });
    }

    @Post('login')
    login(@Body() body: any){
        return body;
    }
}
