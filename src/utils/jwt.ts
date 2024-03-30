import jwt from "jsonwebtoken";

function signIn(payload: object) {
  const token = jwt.sign(payload, process.env.JWT_SECRET || "", {
    expiresIn: "60d",
  });
  return token;
}

function verifyJwt(token: string) {
  const verify = jwt.verify(token, process.env.JWT_SECRET || "");
  return verify;
}

export default {
  signIn,
  verifyJwt,
};
