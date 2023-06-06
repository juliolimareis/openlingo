import Jwt from "jsonwebtoken";

export function useJWT () {
  const secret = process.env.API_SECRET_KEY ?? "54GF54H45G4HG#$%74G5F4G";
  const expiresIn = process.env.API_TOKEN_EXPIRES_IN ?? "7d";

  function generateToken<T extends object>(data: T, _expiresIn?: string | number){
    return Jwt.sign(data, secret, { expiresIn: _expiresIn ?? expiresIn });
  }

  /**
   *
   * @param token String
   * @returns Object | "TokenExpiredError" | "JsonWebTokenError" | "NotBeforeError"
   */
  function decodeToken(token: string){
    try {
      return Jwt.verify(token, secret);
    } catch (error: any) {
      // return error?.name;
      return false;
    }
  }

  return { generateToken, decodeToken };
};
