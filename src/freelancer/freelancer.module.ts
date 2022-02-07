import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './freelancer.controller';
import { FreelancerService } from './freelancer.service';
import { FreelancerSchema } from './model/freelancer.model';
import { JwtModule } from '@nestjs/jwt';
import { ScrapperModule } from 'src/scrapper/scrapper.module';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1s' },
    }),
    MongooseModule.forFeature([
      { name: 'Freelancer', schema: FreelancerSchema },
    ]),
    ScrapperModule,
  ],

  controllers: [UserController],
  providers: [FreelancerService],
  exports: [FreelancerModule, FreelancerService],
})
export class FreelancerModule {}
