import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { CustomerSchema } from './model/customer.model';
import { JwtModule } from '@nestjs/jwt';
import { ScrapperModule } from 'src/scrapper/scrapper.module';

@Module({
  imports: [
    ScrapperModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1s' },
    }),
    MongooseModule.forFeature([{ name: 'Customer', schema: CustomerSchema }]),
  ],

  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerModule, CustomerService],
})
export class CustomerModule {}
