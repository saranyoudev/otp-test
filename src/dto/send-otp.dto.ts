import { IsNotEmpty, IsString } from 'class-validator';

export default class SendOtpDto {
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
