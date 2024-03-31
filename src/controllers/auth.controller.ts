import IController from "../interfaces/IController";
import db from "../database/connection";
import Hash from "../utils/hash";
import jwt from "../utils/jwt";

const register: IController = async (req, res, next) => {
  const { name, email, password } = await req.body;
  try {
    const emailExist = await db.query(`SELECT * FROM teacher WHERE email=$1`, [
      email,
    ]);

    if (emailExist.length !== 0)
      return res
        .status(409)
        .json({ status: 409, message: "Invalid credentials" });

    const hashed = await Hash.hash(password);
    const createTeacher = await db.result(
      `INSERT INTO teacher(name, email, password) VALUES ($1,$2,$3)`,
      [name, email, hashed]
    );

    return res
      .status(201)
      .json({ status: 201, message: "Success create account" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const login: IController = async (req, res, next) => {
  const { email, password } = await req.body;
  try {
    const loginAccount = await db.oneOrNone(
      `SELECT * FROM teacher WHERE email = $1`,
      [email]
    );

    if (!loginAccount)
      return res
        .status(401)
        .json({ status: 409, message: "Invalid credentials" });

    const compare = await Hash.unhash(password, loginAccount.password);
    if (!compare)
      return res
        .status(401)
        .json({ status: 409, message: "Invalid credentials" });

    const payload: object = {
      id: loginAccount.id,
      name: loginAccount.name,
      email: loginAccount.email,
    };
    const token = jwt.signIn(payload);

    return res.status(200).json({
      status: 200,
      message: "Login successful. Welcome back",
      token,
      payload,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default {
  register,
  login,
};
