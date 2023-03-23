import * as OtpGenerator from 'otp-generator';
import * as bcrypt from 'bcrypt';

// Generate Numeric OTP
export const generateNumericOtp = (length: number = 6): string => {
    return OtpGenerator.generate(
        length,
        {
            specialChars: false,
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            digits: true
        }
    );
}

// Encode User Password
export const encodePassword = (password: string): string => {
    const salt: string = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);
}

// Validate User's password
export const isPasswordValid = (password: string, userPassword: string): boolean => {
    return bcrypt.compareSync(password, userPassword);
}