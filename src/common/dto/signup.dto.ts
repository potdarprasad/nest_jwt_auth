import { IsEmail, IsNotEmpty } from "class-validator";

export class SignUpDto {
    @IsNotEmpty({ message: 'First Name Is Required' })
    firstName: string;

    @IsNotEmpty({ message: 'Last Name Is Required' })
    lastName: string;

    @IsNotEmpty({ message: 'Email Is Required' })
    @IsEmail({}, { message: 'Email must be valid email address' })
    email: string;

    @IsNotEmpty({ message: 'Password is required' })
    password: string;
}