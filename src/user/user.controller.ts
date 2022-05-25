import { BadRequestException, Body, Controller, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
@Controller('user')
export class UserController {

    constructor(
        private userService: UserService,
        private jwtService: JwtService
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
    async login(
        @Body('username') username: string,
        @Body('password') password: string,
        @Res({passthrough: true}) response: Response
    ){
        const user = await this.userService.findOne({username});
        if (!user) {
            throw new BadRequestException("invalid credentials");
        }

        if (!await bcryptjs.compare(password, user.password)) {
            throw new BadRequestException("invalid credentials");
        }

        const accessToken = await this.jwtService.signAsync({
            id:user.id
        },{expiresIn:'30s'});

        const refreshToken = await this.jwtService.signAsync({
            id: user.id
        });

        // set the cookie in 1 week
        response.cookie('refreshToken',refreshToken,{
            httpOnly:true,
            maxAge: 7 * 24 * 60 * 60 * 1000 
        })
        
        return {
            token: accessToken
        };
    }
}
