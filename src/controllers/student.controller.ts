import IController from "../interfaces/IController";
import db from "../database/connection";

const tableName: string = "student";

const createStudent: IController = async (req, res) => {
  const { id_class, name, nisn, gender } = await req.body;
  try {
    const postStudent = await db.query(
      `INSERT INTO ${tableName}(id_class, name, nisn, gender) VALUES ($1, $2, $3, $4)`,
      [id_class, name, nisn, gender]
    );
    return res.status(200).json({
      status: 200,
      message: "success create student",
      data: postStudent,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getSingleStudent: IController = async (req, res) => {
  const userId = req.params.id;
  try {
    const getStudent = await db.query(
      `SELECT * from ${tableName} where id = $1`,
      [userId]
    );
    res.status(200).json({
      status: 200,
      message: `success get data student with id ${userId}`,
      body: getStudent,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const getStudentFromSpecificClass: IController = async (req, res) => {
  try {
    const params = req.params.id;
    const getStudentAtSpecificClass = await db.query(
      `SELECT * FROM ${tableName} WHERE id_class = $1`,
      [params]
    );
    return res.status(200).json({
      status: 200,
      message: `success show student from specific class with id ${params}`,
      body: getStudentAtSpecificClass,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const updateStudent: IController = async (req, res) => {
  let { id_class, name, nisn, gender } = await req.body;
  const userId = req.params.id;
  try {
    const prevDataStudent = await db.oneOrNone(
      `SELECT * FROM ${tableName} WHERE id = $1`,
      [req.params.id]
    );

    if (!prevDataStudent)
      return res.status(400).json({ status: 400, message: "Bad request" });

    await db.query(
      `UPDATE ${tableName} 
             SET id_class = $1, name = $2, nisn = $3, gender = $4
             WHERE id = $5`,
      [
        id_class || prevDataStudent.id_class,
        name || prevDataStudent.name,
        nisn || prevDataStudent.nisn,
        gender || prevDataStudent.gender,
        userId,
      ]
    );

    const updatedStudent = await db.oneOrNone(
      `SELECT * FROM ${tableName} WHERE id = $1`,
      [userId]
    );

    return res.status(200).json({
      status: 200,
      message: `Successfully updated student with id ${userId}`,
      body: updatedStudent,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const deleteStudentById: IController = async (req, res) => {
  const userId = req.params.id;
  try {
    await db.query(
      `DELETE FROM ${tableName} 
                WHERE id = $1`,
      [userId]
    );

    return res.status(200).json({
      status: 200,
      message: `succesfully delete student with id ${userId}`,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default {
  createStudent,
  getSingleStudent,
  getStudentFromSpecificClass,
  updateStudent,
  deleteStudentById,
};
