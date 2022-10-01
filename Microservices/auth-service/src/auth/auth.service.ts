import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  signUser(userID: number, phoneNumber: string) {
    return this.jwtService.sign({ userID, phoneNumber });
  }
}
