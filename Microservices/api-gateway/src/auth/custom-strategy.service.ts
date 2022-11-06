import { Strategy } from 'passport-custom'
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class CustomStrategy extends PassportStrategy(Strategy, 'custom') {
  constructor(@Inject('AUTH_SERVICE') private client: ClientProxy) {
    super();
  }

  async validate(req: Request): Promise<Boolean> {
    const accessToken = req?.headers['authorization']?.replace('Bearer', '')?.trim() ?? "";
    console.log('accessToken', accessToken)
    const valid = await this.client
      .send({ cmd: 'authenticate' }, accessToken)
      .toPromise();
    console.log(valid)
    if (!valid) throw new UnauthorizedException();
    return valid;
  }
}
