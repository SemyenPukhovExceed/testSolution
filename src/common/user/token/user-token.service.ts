import { Injectable } from '@nestjs/common';
import * as randomstring from 'randomstring';

@Injectable()
export class UserTokenService {
  public generateToken(): string {
    return randomstring.generate();
  }
  
}
