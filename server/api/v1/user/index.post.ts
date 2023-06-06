import Md5 from "md5";
import prisma from "~/server/database/prisma";
import { UserDTO, } from "~/server/dtos/user.dto";
import { useJWT, } from "~/server/utils/jwt";
import { validateClass, basicUseSelectForToken, setStatus, } from "~/server/utils/validations";

export default defineEventHandler(async (event) => {
  const data = await readBody(event);
  const { generateToken } = useJWT();

  const userExist = await db.user.findFirst({ where: { email: data.email } });

  if(userExist){
    return setStatus(event, 409, { message: "user exist" });
  }

  data.passwd = Md5(data.passwd);

  return validateClass(new UserDTO(data)).then(async () => {
    return await prisma.user.create({ data, select: basicUseSelectForToken })
      .then(user => {
        return { ...user, token: generateToken({ ...user }) };
      });
  }).catch(err => setStatus(event, 400, err));
});