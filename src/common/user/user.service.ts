import { Injectable } from '@nestjs/common';

import { User } from './user';
import { UserTokenService } from './token/user-token.service';

@Injectable()
export class UserService {
  constructor(private readonly userTokenService: UserTokenService) {}

  private users = [
    new User('admin@admin.ru', '12345678'),
    new User('user@user.ru', '87654321'),
  ];

  public authenticateUser(user: User): boolean {
    return this.users.some(u => u.equals(user));
  }

  public getToken(): string {
    return this.userTokenService.generateToken();
  }
  
}
