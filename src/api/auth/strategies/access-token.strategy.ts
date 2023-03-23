import { LoggerService } from '@/common/helpers/logger.helper';
import { UserRepository } from '@/database';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

type JwtPayload = {
  sub: string;
  username: string;
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logger: LoggerService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_SECRET,
      ignoreNotBefore: true,
    });
  }

  async validate(payload: JwtPayload) {
    const { sub: userId, username } = payload;

    const user = await this.userRepository.findByEmail(username);

    if (!user) {
      this.logger.error(`Unauthorised access`, userId);
      throw new UnauthorizedException();
    }
    console.log('validate ****', payload);
    return payload;
  }
} 