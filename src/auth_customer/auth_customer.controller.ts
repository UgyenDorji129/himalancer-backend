import { Body, Controller, Post } from '@nestjs/common';
import { AuthCustomerService } from './auth_customer.service';

@Controller('himalancer')
export class AuthCustomerController {
  constructor(private readonly authCustomerService: AuthCustomerService) {}

  @Post('login-customer')
  async loginCUstomerWithPhone(
    @Body('phone') phone: string,
    @Body('password') password: string,
  ) {
    try {
      return await this.authCustomerService.loginCustomer({ password, phone });
    } catch (e) {
      return e;
    }
  }
}
