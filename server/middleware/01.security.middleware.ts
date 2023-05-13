import { handleSecurityRouter, } from "../utils/validations";

export default defineEventHandler(event => {
  handleSecurityRouter(event);
});