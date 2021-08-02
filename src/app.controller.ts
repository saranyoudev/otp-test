import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import SendOtpDto from './dto/send-otp.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('otp')
  async getOTP(@Body(ValidationPipe) sendOtpDto: SendOtpDto): Promise<void> {
    const { phoneNumber, message } = sendOtpDto;
    await this.appService.sendMessage(phoneNumber, message);
    return;
  }
}
