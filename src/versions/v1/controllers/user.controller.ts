import { Controller, Post, Body, Res } from '@nestjs/common';
import { UserService } from '../../../common/user/user.service';
import { User } from '../../../common/user/user';
import UserDto from './dto/userDto';

@Controller('v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  login(@Body() user: UserDto, @Res() res) {
    if (!user.email || !user.password) {
      return res.status(404).send({ message: 'Invalid data' });
    }

    const authenticated = this.userService.authenticateUser(
      new User(user.email, user.password),
    );
    if (authenticated) {
      return res.status(200).send({ token: this.userService.getToken() });
    }

    return res.status(401).send({
      statusCode: 401,
      error: 'Unauthorized',
    });
  }
}
