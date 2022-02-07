import { Body, Controller, Post } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { FreelancerService } from './freelancer.service';

@Controller('himalancer')
export class UserController {
  constructor(private readonly freelancerService: FreelancerService) {}

  @Post('register-freelancer')
  async register(
    @Body('dob') dob: string,
    @Body('phone') phone: string,
    @Body('password') password: string,
    @Body('email') email: string,
    @Body('cid') cid: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 12);
    const newFreelancer = { dob, phone, email, cid, password: hashedPassword };

    return await this.freelancerService.registerFreelancer(newFreelancer);
  }

  @Post('freelancerByPhone')
  async findFreelancerByPhone(@Body('phone') phone: string) {
    const result = await this.freelancerService.findFreelancerByPhone(phone);
    return result;
  }

  @Post('userById')
  async findFreelancerById(@Body('id') id: string) {
    try {
      const result = await this.freelancerService.findFreelancerById(id);
      return result;
    } catch (e) {
      return e;
    }
  }
}
