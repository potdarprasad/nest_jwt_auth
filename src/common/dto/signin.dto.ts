import { IsEmail, IsNotEmpty } from "class-validator";

export class SignInDto {
    @IsNotEmpty({ message: 'Email Is Required' })
    @IsEmail({}, { message: 'Email must be valid email address' })
    email: string;

    @IsNotEmpty({ message: 'Password is required' })
    password: string;
}