import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from '@/common/dto';
import { AccessTokenGuard } from '@/common/guards/access-token.guards';
import { RefreshTokenGuard } from '@/common/guards/refresh-token.guards';
import { GetCurrentUser, GetCurrentUserId } from '@/common/decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  async signUp(@Body() user: SignUpDto) {
    return this.authService.signUp(user);
  }

  @Post('signin')
  async signIn(@Body() body: SignInDto) {
    return this.authService.signIn(body);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout/:userId')
  async logOut(@GetCurrentUserId() userId) {
    console.log(userId, '****');
    return this.authService.logOut(userId);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@GetCurrentUserId() userId: string, @GetCurrentUser('refreshToken') refreshToken: string) {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
