import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from '@/database';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { LoggerService } from '@/common/helpers/logger.helper';
import { MailModule } from '@/mail/mail.module';

@Module({
  imports: [
    JwtModule.register({}),
    DatabaseModule,
    MailModule
  ],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy, LoggerService]
})
export class AuthModule { }
