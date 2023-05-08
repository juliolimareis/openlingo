import Md5 from "md5";
import useJWT from "~/server/core/jwt";
import { UserLoginDTO, } from "./../../dtos/user.Login";
import { validateClass, basicUseSelectForToken, setStatus, } from "~/server/utils/validations";

export default defineEventHandler(async (event) => {
  const { generateToken } = useJWT();
  const body = await readBody<UserLoginDTO>(event);

  return validateClass(new UserLoginDTO(body))
    .then(async () => {
      const userExist = await db.user.findFirst({ where: { email: body.email } });

      if(!userExist){
        return setStatus(event, 404, { message: "user not found" });
      }

      body.passwd = Md5(body.passwd);

      return db.user.findFirst({ where: body, select: basicUseSelectForToken })
        .then(user => {
          if(user){
            return { token: generateToken(user) };
          }

          return setStatus(event, 401, { message: "invalid credentials", pass: body.passwd });
        });
    }
    ).catch(err => setStatus(event, 400, err));
});