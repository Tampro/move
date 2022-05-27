import { User } from './user.entity';

test('User should be initialized through constructor', () => {
  const user = new User({
    email: 'tam@tam.com',
    password: '123456',
  });
  expect(user).toEqual({
    email: 'tam@tam.com',
    password: '123456'
  });
});
