import { Module } from '@nestjs/common';
import { AuthFreelancerController } from './auth_freelancer.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthFreelancerService } from './auth_freelancer.service';
import { FreelancerModule } from 'src/freelancer/freelancer.module';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1s' },
    }),
    FreelancerModule,
  ],
  providers: [AuthFreelancerService],
  controllers: [AuthFreelancerController],
  exports: [AuthFreelancerModule],
})
export class AuthFreelancerModule {}
