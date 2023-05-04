import { validateOrReject, } from "class-validator";

export async function validateBody<T extends object>(validation: T) {
  return validateOrReject(validation);
}
