import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { MovieModule } from './movie/movie.module';
import { LikeMovieModule } from './like-movie/like-movie.module';
import ormConfig from './config/orm.config';
import ormConfigProd from './config/orm.config.prod';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConfig],
      expandVariables: true,
      envFilePath: `${process.env.NODE_ENV}.env`
    }),
    TypeOrmModule.forRootAsync({
      useFactory: process.env.NODE_ENV !== 'production'
        ? ormConfig : ormConfigProd
    }),
    UserModule,
    MovieModule,
    LikeMovieModule,
  ],
})
export class AppModule {}
