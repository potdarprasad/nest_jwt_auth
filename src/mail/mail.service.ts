import { SignUpDto } from '@/common/dto';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) { }

  async sendOtp(user: SignUpDto, otp: string) {
    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Auth App! Confirm your Email',
      template: './sendOtp.hbs',// `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        name: user.firstName + " " + user.lastName,
        otp,
      },
    });
  }
}

