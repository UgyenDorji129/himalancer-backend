import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomerRegisterDto } from './dto/customer_register.dto';
import { CustomerDto } from './dto/customer.dto';
import { ScrapperService } from 'src/scrapper/scrapper.service';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel('Customer') private readonly customerModel: Model<CustomerDto>,
    private jwtService: JwtService,
    private readonly scrapperService: ScrapperService,
  ) {}

  async registerCustomer(user: CustomerRegisterDto) {
    try {
      const isInvalid = await this.isNotValidCredientials(
        user.email,
        user.phone,
      );

      if (isInvalid) {
        throw new NotAcceptableException('Invlaid Credientials');
      }
      const name = await this.scrapperService.sendUserName(user.cid, user.dob);
      console.log('hhhh', name);
      const newCustomer = new this.customerModel({
        name: name,
        password: user.password,
        email: user.email,
        phone: user.phone,
        cid: user.cid,
      }).save();

      const payload = {
        customerId: (await newCustomer)._id,
        customerName: (await newCustomer).name,
      };

      return {
        access_token: this.jwtService.sign(payload),
        success: true,
      };
    } catch (e) {
      console.log('ghjhggg');
      return {
        message: e,
        success: false,
      };
    }
  }

  async findCustomerByPhone(phone: string) {
    const result = await this.customerModel.findOne({ phone: phone });
    if (!result) {
      throw new NotFoundException('Invalid Creditential');
    }
    return result._id;
  }

  async findCustomerById(id: string) {
    console.log(id);
    const result = await this.customerModel.findById(id).exec();
    if (!result) {
      throw new NotFoundException('Invalid Creditential');
    }
    return result;
  }

  async isNotValidCredientials(email: string, phone: string) {
    const isInValidEmail = await this.customerModel.findOne({ email: email });
    const isInValidPhone = await this.customerModel.findOne({ phone: phone });

    if (isInValidEmail || isInValidPhone) {
      console.log(isInValidEmail);
      console.log(isInValidPhone);
      return true;
    } else {
      return false;
    }
  }
}
