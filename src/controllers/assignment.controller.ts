import db from "../database/connection";
import IController from "../interfaces/IController";

const createAssignment: IController = async (req, res, next) => {
  const { id_class, name } = await req.body;
  try {
    const postAssignment = await db.query(
      `INSERT INTO assignment(id_class, name) VALUES ($1, $2)`,
      [id_class, name]
    );

    return res
      .status(201)
      .json({ status: 200, message: "Success create assignment" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getAllAssignment: IController = async (req, res, next) => {
  const params = req.params.id_class;
  try {
    const getAssigment = await db.query(
      `SELECT * FROM assignment WHERE id_class = $1`,
      [params]
    );

    return res.status(200).send({
      status: 200,
      message: "Success retrive all assigment",
      data: getAssigment,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getSingleAssignment: IController = async (req, res, next) => {
  const params = req.params.id_assignment;
  try {
    const getAssigment = await db.oneOrNone(
      `SELECT * FROM assignment WHERE id = $1`,
      [params]
    );

    console.log(getAssigment);

    const getGrade = await db.manyOrNone(
      `SELECT * FROM grade WHERE id_assignment = $1`,
      [params]
    );

    console.log(getGrade);

    return res.status(200).send({
      status: 200,
      message: "Success retrive a assignment",
      data: { ...getAssigment, student_grade: getGrade },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteSingleAssignment: IController = async (req, res, next) => {
  const params = req.params.id_assignment;
  try {
    const assignmentExist = await db.oneOrNone(
      `SELECT * FROM assignment WHERE id = $1`,
      [params]
    );

    if (!assignmentExist)
      return res.status(400).json({ status: 400, message: "Bad request" });

    await db.query(`DELETE FROM assignment WHERE id = $1`, [params]);

    return res.status(200).send({
      status: 200,
      message: "Success delete a assignment",
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateSingleAssignment: IController = async (req, res, next) => {
  const params = req.params.id_assignment;
  const name: string | null = (await req.body.name) || null;
  try {
    const assignmentExist = await db.oneOrNone(
      `SELECT * FROM assignment WHERE id = $1`,
      [params]
    );

    if (!assignmentExist)
      return res.status(400).json({ status: 400, message: "Bad request" });

    await db.query(
      `UPDATE assignment SET name = $1, updated_at = NOW() WHERE id = $2`,
      [name || assignmentExist.name, params]
    );

    return res.status(200).send({
      status: 200,
      message: "Success update a assignment",
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default {
  createAssignment,
  getAllAssignment,
  getSingleAssignment,
  updateSingleAssignment,
  deleteSingleAssignment,
};
