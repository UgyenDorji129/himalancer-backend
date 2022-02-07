import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FreelancerRegisterDto } from './dto/freelancer_register.dto';
import { FreelancerDto } from './dto/freelancer.dto';
import { ScrapperService } from 'src/scrapper/scrapper.service';

@Injectable()
export class FreelancerService {
  constructor(
    @InjectModel('Freelancer')
    private readonly freelancerModel: Model<FreelancerDto>,
    private jwtService: JwtService,
    private readonly scrapperService: ScrapperService,
  ) {}

  async registerFreelancer(freelancer: FreelancerRegisterDto) {
    try {
      const isInvalid = await this.isNotValidCredientials(
        freelancer.email,
        freelancer.phone,
      );

      if (isInvalid) {
        throw new NotAcceptableException('Invlaid Credientials');
      }
      const name = await this.scrapperService.sendUserName(
        freelancer.cid,
        freelancer.dob,
      );
      const newFreelancer = new this.freelancerModel({
        cid: freelancer.cid,
        name: name,
        password: freelancer.password,
        email: freelancer.email,
        phone: freelancer.phone,
      }).save();

      const payload = {
        userId: (await newFreelancer)._id,
        userName: (await newFreelancer).name,
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

  async findFreelancerByPhone(phone: string) {
    const result = await this.freelancerModel.findOne({ phone: phone });
    if (!result) {
      throw new NotFoundException('Invalid Creditential');
    }
    return result._id;
  }

  async findFreelancerById(id: string) {
    console.log(id);
    const result = await this.freelancerModel.findById(id).exec();
    if (!result) {
      throw new NotFoundException('Invalid Creditential');
    }
    return result;
  }

  async isNotValidCredientials(email: string, phone: string) {
    const isInValidEmail = await this.freelancerModel.findOne({ email: email });
    const isInValidPhone = await this.freelancerModel.findOne({ phone: phone });

    if (isInValidEmail || isInValidPhone) {
      return true;
    } else {
      return false;
    }
  }
}
