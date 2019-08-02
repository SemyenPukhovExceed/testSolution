import { Test, TestingModule } from '@nestjs/testing';

import { UserController } from '../controllers/user.controller';
import { UserService } from '../../../common/user/user.service';
import { UserTokenService } from '../../../common/user/token/user-token.service';

describe('UserController', () => {
  let app: TestingModule;
  const response = {
    body: {},
    code: -1,
    send(body?: any) {
      this.body = body;
      return this;
    },
    status(code: number) {
      this.code = code;
      return this;
    },
  };

  const error = {
    statusCode: 401,
    error: 'Unauthorized',
  };

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserTokenService, UserService],
    }).compile();
  });

  it('should return 401 status and error object if credentials are invald', () => {
    const userController = app.get<UserController>(UserController);

    expect(
      userController.login({ email: 'Erro', password: 'err' }, response).body,
    ).toMatchObject(error);
    expect(
      userController.login({ email: 'Erro', password: 'err' }, response).code,
    ).toBe(401);
  });

  it('should return valid token if credentials is valid"', () => {
    const userController = app.get<UserController>(UserController);

    expect(
      userController.login(
        { email: 'admin@admin.ru', password: '12345678' },
        response,
      ).code,
    ).toBe(200);

    expect(
      userController.login(
        { email: 'admin@admin.ru', password: '12345678' },
        response,
      ).body.token,
    ).toMatch(/^([a-zA-Z0-9_-]){32}$/);
  });
});
