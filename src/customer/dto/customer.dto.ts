import { IsEmail, IsNotEmptyObject } from 'class-validator';
export class CustomerDto {
  id: string;

  @IsNotEmptyObject()
  public name: string;

  @IsNotEmptyObject()
  public cid: string;

  @IsNotEmptyObject()
  public phone: string;

  @IsEmail()
  public email: string;

  @IsNotEmptyObject()
  password: string;
}
