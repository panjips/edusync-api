import { Router } from "express";
import gradeController from "../controllers/grade.controller";

const router = Router();

router.post("/", gradeController.postGrade);
router.get('/:id_assignment', gradeController.getAllGradeInAssignment);
router.patch('/:id', gradeController.updateSingleGrade);
router.delete('/:id', gradeController.deleteGrade);

export default router;
