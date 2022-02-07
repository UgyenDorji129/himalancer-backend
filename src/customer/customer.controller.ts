import { Body, Controller, Post } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CustomerService } from './customer.service';

@Controller('himalancer')
export class CustomerController {
  constructor(private readonly userService: CustomerService) {}

  @Post('register-customer')
  async register(
    @Body('cid') cid: string,
    @Body('dob') dob: string,
    @Body('phone') phone: string,
    @Body('password') password: string,
    @Body('email') email: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 12);

    const newCustomer = { dob, phone, email, cid, password: hashedPassword };

    return await this.userService.registerCustomer(newCustomer);
  }

  @Post('customerByPhone')
  async findCustomerByPhone(@Body('phone') phone: string) {
    const result = await this.userService.findCustomerByPhone(phone);
    return result;
  }

  @Post('customerById')
  async findCustomerById(@Body('id') id: string) {
    try {
      const result = await this.userService.findCustomerById(id);
      return result;
    } catch (e) {
      return e;
    }
  }
}
