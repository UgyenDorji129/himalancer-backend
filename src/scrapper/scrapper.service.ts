import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ScrapperService {
  async sendUserName(cid: string, dob: string) {
    try {
      const puppeteer = require('puppeteer');
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();

      const navigationPromise = page.waitForNavigation({
        waitUntil: 'domcontentloaded',
      });
      await page.goto('https://www.citizenservices.gov.bt/ViewCitizenDetails/');

      await page.screenshot({ path: '1.png' });

      await page.type('[name=cidNumber]', cid);
      await page.focus('[name=dob');
      await page.$eval(
        '[name=dob]',
        (e: { removeAttribute: (arg0: string) => any }) =>
          e.removeAttribute('readonly'),
      );
      await page.type('[name=dob]', dob);

      await page.screenshot({ path: '2.png' });

      await page.click('[type=button]');
      await navigationPromise;

      await page.waitForSelector('img', {
        visible: true,
      });
      await page.screenshot({ path: '3.png' });

      const result = await page.evaluate(() => {
        const title = (<HTMLInputElement>(
          document.querySelector('input[name="firstName"]')
        )).value;
        return title;
      });
      await browser.close();
      return result;
    } catch (e) {
      throw new NotFoundException(
        'Enter a valid CID or Try again with good Internet',
      );
    }
  }
}
