import { validateOrReject, } from "class-validator";

export async function validateClass<T extends object>(validation: T) {
  return validateOrReject(validation);
}

export const basicUseSelectForToken = { id: true, email: true, createdAt: true, name: true, birthday: true };

export function setStatus(event: any, code: number, err: object){
  setResponseStatus(event, code);

  return err;
}