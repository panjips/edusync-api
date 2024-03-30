import IController from "../interfaces/IController";
import db from "../database/connection";

const createClass: IController = async (req, res, next) => {
  const { id_teacher, name, start_at, finish_at } = await req.body;
  try {
    const postClass = await db.query(
      `INSERT INTO class(id_teacher, name, start_at, finish_at) VALUES ($1, $2, $3, $4)`,
      [id_teacher, name, start_at, finish_at]
    );

    return res
      .status(200)
      .json({ status: 200, message: "Success create class" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getAllClass: IController = async (req, res, next) => {
  const params = req.params.id_teacher;
  try {
    const getClass = await db.query(
      `SELECT * FROM class WHERE id_teacher = $1`,
      [params]
    );

    return res.status(200).send({
      status: 200,
      message: "Success retrive all class",
      data: getClass,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getSingleClass: IController = async (req, res, next) => {
  const params = req.params.id_class;
  try {
    const getClass = await db.oneOrNone(`SELECT * FROM class WHERE id = $1`, [
      params,
    ]);

    return res.status(200).send({
      status: 200,
      message: "Success retrive a class",
      data: getClass,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteSingleClass: IController = async (req, res, next) => {
  const params = req.params.id_class;
  try {
    const classExist = await db.oneOrNone(`SELECT * FROM class WHERE id = $1`, [
      params,
    ]);

    if (!classExist)
      return res.status(400).json({ status: 400, message: "Bad request" });

    await db.query(`DELETE FROM class WHERE id = $1`, [params]);

    return res.status(200).send({
      status: 200,
      message: "Success delete a class",
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateSingleClass: IController = async (req, res, next) => {
  const params = req.params.id_class;
  const name: string | null = (await req.body.name) || null;
  const start_at: string | null = (await req.body.start_at) || null;
  const finish_at: string | null = (await req.body.finish_at) || null;
  try {
    const classExist = await db.oneOrNone(`SELECT * FROM class WHERE id = $1`, [
      params,
    ]);

    if (!classExist)
      return res.status(400).json({ status: 400, message: "Bad request" });
    
    await db.query(
      `UPDATE class SET name = $1, start_at = $2, finish_at = $3, updated_at = NOW() WHERE id = $4`,
      [
        name || classExist.name,
        start_at || classExist.start_at,
        finish_at || classExist.finish_at,
        params,
      ]
    );

    return res.status(200).send({
      status: 200,
      message: "Success update a class",
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default {
  createClass,
  getAllClass,
  getSingleClass,
  deleteSingleClass,
  updateSingleClass,
};
