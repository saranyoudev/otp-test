import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import SendOtpDto from './dto/send-otp.dto';
import * as ClickSend from '../node_modules/clicksend/api.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('otp')
  getOTP(@Body(ValidationPipe) sendOtpDto: SendOtpDto) {
    try {
      const { code, phoneNumber, message } = sendOtpDto;
      const smsMessage = new ClickSend.SmsMessage();

      const senderId = '+66977063102';

      smsMessage.from = senderId;
      smsMessage.to = code + phoneNumber;
      smsMessage.body = message;

      const smsCollection = new ClickSend.SmsMessageCollection();
      smsCollection.messages = [smsMessage];

      const smsApi = new ClickSend.SMSApi(
        'saranyou_p_dev@outlook.com',
        '852F3BA9-A35D-7386-77FD-D6B4920CEB27',
      );
      smsApi.smsSendPost(smsCollection);

      return smsMessage;
    } catch (e) {
      throw new InternalServerErrorException({
        message: e.message ?? e,
      });
    }
  }
}
