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
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { TokenService } from './token.service';
import { MoreThanOrEqual } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './input/create.user.dto';
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private tokenService: TokenService,
  ) {}

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    let user = await this.userService.findOne({ email });

    if (!(await this.userService.compare(password, user.password))) {
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

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = new User();

    const existingUser = await this.userService.findOne({email: createUserDto.email});

    if (existingUser) {
      throw new BadRequestException(['username or email is already taken']);
    }

    user.username = createUserDto.username;
    user.password = await this.userService.hashPassword(createUserDto.password);
    user.email = createUserDto.email;
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;

    const accessToken = await this.jwtService.signAsync(
      {
        id: user.id,
      },
      { expiresIn: '30h' },
    );

    return {
      ...(await this.userService.save(user)),
      token: accessToken
    }
  }

  @Get('me')
  async user(@Req() request: Request) {
    try {
      const accessToken = request.headers.authorization.replace('Bearer ', '');
      const {id} = await this.jwtService.verifyAsync(accessToken);
      const {password, ...data} = await this.userService.me({id});
      return data;
    } catch (e) {
      console.log(e);
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
