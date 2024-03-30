import jwt from "jsonwebtoken";

function signIn(payload: object) {
  const token = jwt.sign(payload, process.env.JWT_SECRET || "", {
    expiresIn: "2d",
  });
  return token;
}

export default {
  signIn,
};
