import { LikeMovie } from './like-movie.entity';

test('User should be initialized through constructor', () => {
  const likeMovie = new LikeMovie({
    like: true,
    userId: 1,
    movieId: 1
  });
  expect(likeMovie).toEqual({
    like: true,
    userId: 1,
    movieId: 1
  });
});
