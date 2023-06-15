import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { UserRepository } from '../../database';
import { SignInDto, SignUpDto } from '@/common/dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { encodePassword, isPasswordValid } from '@/common/helpers';
import { LoggerService } from '@/common/helpers/logger.helper';
import { MailService } from '@/mail/mail.service';
import * as otpGenerator from 'otp-generator';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly logger: LoggerService,
        private readonly mailService: MailService
    ) { }

    async signUp(input: SignUpDto) {
        const user = await this.userRepository.findByEmail(input.email);
        if (user) {
            throw new BadRequestException('User already exists');
        }

        const password = await encodePassword(input.password);

        const newUser = this.userRepository.create({ ...input, password });
        const otp = this.generateNumericOtp();
        await this.mailService.sendOtp(input, otp);
        return this.userRepository.save(newUser);
    }

    generateNumericOtp(){
        return otpGenerator.generate(4, {specialChars: false, upperCaseAlphabets: false, lowerCaseAlphabets: false, digit: true});
    }

    async signIn(input: SignInDto) {
        const user = await this.userRepository.findByEmail(input.email);
        if (!user) {
            throw new BadRequestException('User does not exist');
        }

        const isPasswordMatch = await isPasswordValid(input.password, user.password);
        if (!isPasswordMatch) {
            throw new BadRequestException('Invalid password');
        }

        const { accessToken, refreshToken } = await this.getTokens(user.id, user.email);

        await this.updateRefreshToken(user.id, refreshToken);

        return {
            ...user,
            accessToken,
            refreshToken
        };
    }

    async logOut(userId: string) {
        this.logger.log(`Logging out user ${userId}`);
        return this.updateRefreshToken(userId, null);
    }

    async refreshTokens(userId: string, refreshToken: string) {
        const user = await this.userRepository.findById(userId);

        if (!user || !user.refreshToken)
            throw new ForbiddenException('Access Denied');

        const refreshTokenMatches = await isPasswordValid(refreshToken, user.refreshToken);

        if (!refreshTokenMatches) throw new ForbiddenException('Access Invaid Denied');

        const tokens = await this.getTokens(user.id, user.email);

        await this.updateRefreshToken(user.id, tokens.refreshToken);

        return tokens;
    }

    private async updateRefreshToken(userId: string, refreshToken?: string | null) {
        const hashedRefreshToken = refreshToken ? await encodePassword(refreshToken) : null;
        await this.userRepository.update({ id: userId }, {
            refreshToken: hashedRefreshToken,
        });
    }

    private async getTokens(userId: string, username: string) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: userId,
                    username,
                },
                {
                    secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
                    expiresIn: '1m',
                },
            ),
            this.jwtService.signAsync(
                {
                    sub: userId,
                    username,
                },
                {
                    secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
                    expiresIn: '7d',
                },
            ),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }

}
