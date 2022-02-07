import { Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import { ScrapperService } from './scrapper.service';

@Controller('himalancer')
export class ScrapperController {
  constructor(private readonly scrapperService: ScrapperService) {}

  @Get('cid')
  async getUserName(@Body('cid') cid: string, @Body('dob') dob: string) {
    try {
      return await this.scrapperService.sendUserName(cid, dob);
    } catch (e) {
      throw new NotFoundException(
        'Enter a valid CID or Try again with good Internet',
      );
    }
  }
}
