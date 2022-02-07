import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto } from './dto/auth-login.dto';
import * as bcrypt from 'bcryptjs';
import { CustomerService } from '../customer/customer.service';

@Injectable()
export class AuthCustomerService {
  constructor(
    private customerService: CustomerService,
    private jwtService: JwtService,
  ) {}

  async loginCustomer(authLoginDto: AuthLoginDto) {
    try {
      const user = await this.validateCustomer(
        authLoginDto.phone,
        authLoginDto.password,
      );

      const payload = {
        userId: user.id,
        userName: user.name,
      };

      return {
        access_token: this.jwtService.sign(payload),
        success: true,
      };
    } catch (e) {
      return {
        message: e,
        success: false,
      };
    }
  }

  private async validateCustomer(phone: string, password: string) {
    const foundUser = String(
      await this.customerService.findCustomerByPhone(phone),
    );
    if (!foundUser) {
      throw new NotFoundException('Invalid creditential');
    }

    const user = await this.customerService.findCustomerById(foundUser);
    if (!user) {
      throw new NotFoundException('Invalid creditential');
    }

    if (await bcrypt.compare(password, user.password)) {
      return user;
    } else {
      throw new UnauthorizedException('Invalid Credientials');
    }
  }
}
