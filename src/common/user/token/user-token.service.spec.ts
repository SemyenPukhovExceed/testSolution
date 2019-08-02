import { Test, TestingModule } from '@nestjs/testing';

import { UserTokenService } from '../../../common/user/token/user-token.service';

describe('UserTokenService', () => {
  let app: TestingModule;
  
  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [UserTokenService],
    }).compile();
  });

  it('should return valid token', () => {
    const userTokenService = app.get<UserTokenService>(UserTokenService);
    expect(userTokenService.generateToken()).toMatch(/^([a-zA-Z0-9_-]){32}$/);
  });
});
