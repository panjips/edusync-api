import IController from "../interfaces/IController";
import db from "../database/connection";

const gradeRankFromSingleAsignment: IController = async (req, res) => {
  try {
    const params = req.params.id;
    const ranked = await db.query(
      `SELECT student.name, class.name, assignment.name, grade.grade 
      FROM class 
      JOIN assignment ON class.id = assignment.id_class 
      JOIN grade ON assignment.id = grade.id_assignment 
      JOIN student ON grade.id_student = student.id 
      WHERE id_assignment=$1
      GROUP BY student.name, class.name, assignment.name, grade.grade
      ORDER BY grade.grade desc`,
      [params]
    );
    return res.status(200).json({
      status: 200,
      message: `success sorting from highest grade`,
      data: ranked,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};


const averageSingleStudentGrade: IController = async (req, res) => {
  try {
    const params = req.params.id;
    const average = await db.query(
      `SELECT 
        grade.id_student,
        AVG(grade.grade) AS average_grade
    FROM 
        grade 
    JOIN 
        assignment ON grade.id_assignment = assignment.id
    JOIN 
        class ON assignment.id_class = class.id
    WHERE 
        class.id = $1
    GROUP BY 
        grade.id_student
        ORDER BY average_grade desc;
    `,
      [params]
    );

    return res.status(200).json({
      status: 200,
      message: `success count the average of each student in class ${params}`,
      data: average,
    });
  } catch (error) {
    {
      res.status(500).json({ error });
    }
  }
};

export default {
  gradeRankFromSingleAsignment,
  averageSingleStudentGrade,
};
