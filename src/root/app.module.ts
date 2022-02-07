import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { FreelancerModule } from 'src/freelancer/freelancer.module';
import { CustomerModule } from 'src/customer/customer.module';
import { AuthCustomerModule } from 'src/auth_customer/auth_customer.module';
import { AuthFreelancerModule } from 'src/auth_freelancer/auth_freelancer.module';
import { ScrapperModule } from 'src/scrapper/scrapper.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      'mongodb+srv://DrukTeam:Pl2izL4UdLFhQxmx@cluster0.ita5e.mongodb.net/DrukTeam?retryWrites=true&w=majority',
    ),
    CustomerModule,
    FreelancerModule,
    AuthCustomerModule,
    AuthFreelancerModule,
    ScrapperModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
