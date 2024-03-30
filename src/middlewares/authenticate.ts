import jwt from "../utils/jwt";
import IController from "../interfaces/IController";
import IToken from "../interfaces/IToken";
import { JsonWebTokenError } from "jsonwebtoken";

const verifyToken: IController = async (req, res, next) => {
  const headers = req.headers;
  try {
    const token = headers.authorization?.split(" ");
    if (!token)
      return res
        .status(401)
        .json({ status: 401, message: "Unauthorized action" });

    const verify = jwt.verifyJwt(token![1]) as IToken;
    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError)
      return res.status(401).json({ status: 401, message: "Invalid token" });

    return res
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  }
};

export default {
  verifyToken,
};
