import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  signUser(phoneNumber: string) {
    return this.jwtService.sign({ phoneNumber });
  }

  verifyRequest(accessToken: string): boolean {
    try {
      this.jwtService.verify(accessToken);
      return true;
    } catch (e) {
      console.error(e)
      return false;
    }
  }
}
