import prisma from "~/server/database/prisma";
import { User, } from "~/server/dtos/user.dto";
import { validateBody, } from "~/server/utils/validations";

export default defineEventHandler(async (event) => {
  const data = await readBody(event);

  return validateBody(new User(data)).then(async () => {
    return await prisma.user.create({ data })
      .then(user => ({
        user,
        token: "testToken"
      }));
  }).catch(err => err);
});