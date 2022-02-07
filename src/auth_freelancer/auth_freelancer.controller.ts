import { Body, Controller, Post } from '@nestjs/common';
import { AuthFreelancerService } from './auth_freelancer.service';

@Controller('himalancer')
export class AuthFreelancerController {
  constructor(private readonly authFreelancerService: AuthFreelancerService) {}

  @Post('login-freelancer')
  async loginFreelancerWithPhone(
    @Body('phone') phone: string,
    @Body('password') password: string,
  ) {
    try {
      return await this.authFreelancerService.loginFreelancer({
        password,
        phone,
      });
    } catch (e) {
      return e;
    }
  }
}
