import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { MovieModule } from './movie/movie.module';
import { LikeMovieModule } from './like-movie/like-movie.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'movie',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    MovieModule,
    LikeMovieModule,
  ],
})
export class AppModule {}
