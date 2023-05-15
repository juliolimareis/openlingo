import { validateOrReject, } from "class-validator";
import { useJWT, } from "./jwt";

export async function validateClass<T extends object>(validation: T) {
  return validateOrReject(validation);
}

export const basicUseSelectForToken = { id: true, email: true, createdAt: true, name: true, birthday: true, passwd: false };

export function setStatus(event: any, code: number, err: object){
  setResponseStatus(event, code);

  return err;
}

export function userSession(event: any){
  return event.dataToken as DataToken;
}

export function getDataTokenInHeader(event: any){
  const headerAuth = event.node.req.headers.authorization as string;

  if(headerAuth && headerAuth.includes("Bearer")){
    const { decodeToken } = useJWT();
    const token = headerAuth.split(" ")[1];
    const dataToken = decodeToken(token);

    if(dataToken){
      return dataToken;
    }
  }

  return false;
}

export function isPublicRouter(event: any){
  const apiPublicRouters = useRuntimeConfig().apiPublicRouters as any;
  const pathName = Object.keys(apiPublicRouters).find(k => k === event.path);

  if (pathName){
    return !!apiPublicRouters[pathName].includes(event?.node?.req?.method?.toLowerCase() ?? "");
  }

  return false;
}

export function handleSecurityRouter(event: any){
  if(!isPublicRouter(event)){
    const dataToken = getDataTokenInHeader(event);

    if(dataToken){
      event.dataToken = dataToken;

      return true;
    }

    throw createError({
      statusCode: 401,
      statusMessage: "Not authorized"
    });
  }
}
