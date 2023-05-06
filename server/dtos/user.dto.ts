import { IsEmail, IsNotEmpty, } from "class-validator";
// import { SQL, } from "./sql.dto";

export class User /*extends SQL*/ {
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