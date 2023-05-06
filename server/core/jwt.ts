import Jwt from "jsonwebtoken";

const useJWT = () => {
  function generateToken(){
    return Jwt.sign({ foo: "bar" }, privateKey, { algorithm: "RS256" });
  }
};