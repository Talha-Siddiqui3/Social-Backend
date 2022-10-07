import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '31556952s' }, //1 year
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
