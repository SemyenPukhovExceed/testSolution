import { Test, TestingModule } from '@nestjs/testing';

import { UserTokenService } from '../../common/user/token/user-token.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user';

describe('UserTokenService', () => {
  let app: TestingModule;
  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [UserTokenService, UserService],
    }).compile();
  });

  it('should return true if credentials is valid', () => {
    const userService = app.get<UserService>(UserService);
    const user = new User('admin@admin.ru', '12345678');
    expect(userService.authenticateUser(user)).toBe(true);
  });
  
  it('should return false if credentials is invalid', () => {
    const userService = app.get<UserService>(UserService);
    const user = new User('admin@admin.ru', 'error');
    expect(userService.authenticateUser(user)).toBe(false);
  });
});
