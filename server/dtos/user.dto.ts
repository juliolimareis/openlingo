import { IsEmail, IsNotEmpty, } from "class-validator";

export class UserDTO {
  constructor(obj?: any){
    Object.assign(this, obj);
  }

  @IsNotEmpty()
    name: string;

  @IsEmail()
    email: string;

  @IsNotEmpty()
    passwd: string;
}