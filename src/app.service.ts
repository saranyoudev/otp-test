import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import request from 'request';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async sendMessage(phoneNumber: string, message: string): Promise<void> {
    try {
      const smsProviders = this.configService.get('smsProvider');

      const requestOptions = {
        method: 'POST',
        uri: smsProviders.path,
        json: true,
        body: {
          messages: [
            {
              to: phoneNumber,
              body: message,
            },
          ],
        },
        auth: {
          username: smsProviders.username,
          password: smsProviders.password,
        },
      };

      request(requestOptions);
    } catch (e) {
      throw new InternalServerErrorException({ message: e.message ?? e });
    }
  }
}
