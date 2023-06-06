import { IsEmail, IsNotEmpty, } from "class-validator";

export class UserLoginDTO {
  constructor(obj?: any){
    Object.assign(this, obj);
  }

  @IsEmail()
    email: string;

  @IsNotEmpty()
    passwd: string;
}