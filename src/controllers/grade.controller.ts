import IController from "../interfaces/IController";
import db from "../database/connection";

const tableName = "grade";

const postGrade: IController = async (req, res) => {
  try {
    const { id_student, id_assignment, grade } = req.body;

    await db.query(
      `INSERT INTO ${tableName}(id_student, id_assignment, grade) VALUES($1, $2, $3)`,
      [id_student, id_assignment, grade]
    );

    const addedGrade = await db.query(
      `SELECT * FROM ${tableName} WHERE id_student = $1 AND id_assignment = $2`,
      [id_student, id_assignment]
    );

    return res.status(200).json({
      status: 200,
      message: `success adding grade into assignment with id ${id_assignment}`,
      body: addedGrade,
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

const getAllGradeInAssignment: IController = async (req, res) => {
  try {
    const { id_assignment } = req.params;
    const getAllAssignment = await db.query(
      `SELECT * FROM ${tableName} WHERE id_assignment = $1`,
      [id_assignment]
    );

    return res.status(200).json({
      status: 200,
      message: `success retreive grade from assignment with id ${id_assignment}`,
      body: getAllAssignment,
    });
  } catch (error) {
    res.status(200).json({ error });
  }
};

const updateSingleGrade: IController = async (req, res) => {
  try {
    const { grade } = await req.body;
    const params = req.params.id;
    console.log({ grade, params });
    const prevGrade = await db.query(
      `SELECT * FROM ${tableName} WHERE id = $1`,
      [params]
    );

    if (!prevGrade)
      return res.status(400).json({ status: 400, message: "Bad request" });

    await db.query(
      `UPDATE ${tableName} 
                   SET grade = $1
                   WHERE id = $2`,
      [grade || prevGrade, params]
    );

    const updatedStudent = await db.query(
      `SELECT * FROM ${tableName} WHERE id = $1`,
      [params]
    );

    return res.status(200).json({
      status: 200,
      message: `Successfully updated student with id ${params}`,
      body: updatedStudent,
    });
  } catch (error) {
    res.status(200).json({ error });
  }
};

const deleteGrade: IController = async (req, res) => {
  try {
    const params = req.params.id;
    await db.query(`DELETE FROM ${tableName} WHERE id = $1`, [params]);
    return res
      .status(200)
      .json({
        status: 200,
        message: `successfully delete grade with id ${params} `,
      });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default {
  postGrade,
  getAllGradeInAssignment,
  updateSingleGrade,
  deleteGrade
};
