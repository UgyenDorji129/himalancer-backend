import { IsNotEmptyObject } from 'class-validator';

export class AuthLoginDto {
  @IsNotEmptyObject()
  phone: string;

  @IsNotEmptyObject()
  password: string;
}
