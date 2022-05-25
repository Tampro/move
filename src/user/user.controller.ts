import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { TokenService } from './token.service';
import { MoreThanOrEqual } from 'typeorm';
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private tokenService: TokenService,
  ) {}

  @Post('register')
  async register(@Body() body: any) {
    if (body.password !== body.passwordConfirm) {
      throw new BadRequestException('Password do not match');
    }
    return this.userService.save({
      username: body.username,
      password: await bcryptjs.hash(body.password, 12),
    });
  }

  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.userService.findOne({ username });
    if (!user) {
      throw new BadRequestException('invalid credentials');
    }

    if (!(await bcryptjs.compare(password, user.password))) {
      throw new BadRequestException('invalid credentials');
    }

    const accessToken = await this.jwtService.signAsync(
      {
        id: user.id,
      },
      { expiresIn: '30s' },
    );

    const refreshToken = await this.jwtService.signAsync({
      id: user.id,
    });

    const expiredAt = new Date();
    expiredAt.setDate(expiredAt.getDate() + 7);

    await this.tokenService.save({
        userId : user.id,
        token: refreshToken,
        expiredAt
    });

    response.status(200);
    // set the cookie in 1 week
    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return {
      token: accessToken,
    };
  }

  @Get('me')
  async user(@Req() request: Request) {
    try {
      const accessToken = request.headers.authorization.replace('Bearer ', '');
      const {id} = await this.jwtService.verifyAsync(accessToken);
      const {password, ...data} = await this.userService.findOne({id});
      return data;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  @Post('refresh')
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ){
      try {
          const refreshToken = request.cookies['refreshToken'];
          const {id} = await this.jwtService.verifyAsync(refreshToken);
          const tokenEntity = await this.tokenService.findOne({
              userId: id,
              expiredAt: MoreThanOrEqual(new Date())
          });
          if (!tokenEntity) {
            throw new UnauthorizedException();
          }
          response.status(200);
          const token = await this.jwtService.signAsync({id},
            { expiresIn: '30s' },
          )
          return {
              token
          };
      } catch (e) {
        throw new UnauthorizedException();
      }
  }

  @Post('logout')
  async logout(
    @Req() request:Request,
    @Res({passthrough:true}) response: Response
  ){
      const refreshToken = request.cookies['refreshToken'];
      await this.tokenService.delete({token:refreshToken})
      response.clearCookie('refreshToken');
      return {
          message: 'success'
      }
  }
}
