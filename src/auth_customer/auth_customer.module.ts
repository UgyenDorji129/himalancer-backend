import { Module } from '@nestjs/common';
import { AuthCustomerController } from './auth_customer.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthCustomerService } from './auth_customer.service';
import { CustomerModule } from 'src/customer/customer.module';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1s' },
    }),
    CustomerModule,
  ],
  providers: [AuthCustomerService],
  controllers: [AuthCustomerController],
  exports: [AuthCustomerModule],
})
export class AuthCustomerModule {}
