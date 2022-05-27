import { Movie } from './movie.entity';

test('User should be initialized through constructor', () => {
  const movie = new Movie({
    title: "test",
    description: 'test 1',
    youtubeId: 'test',
    userId: 1
  });
  expect(movie).toEqual({
    title: "test",
    description: 'test 1',
    youtubeId: 'test',
    userId: 1
  });
});
