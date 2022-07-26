import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { LikeMovie } from 'src/like-movie/like-movie.entity';
import { Movie } from 'src/movie/movie.entity';
import { User } from 'src/user/user.entity';
import { Token } from 'src/user/token.entity';
import { Profile } from 'src/user/profile.entity';


export default registerAs(
    'orm.config',
    (): TypeOrmModuleOptions => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        charset: 'utf8mb4_unicode_ci',
        entities: [User, Movie, LikeMovie, Token, Profile],
        synchronize: true,
        dropSchema: Boolean(parseInt(process.env.DB_DROP_SCHEMA))
    })
);