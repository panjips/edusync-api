import { Router } from "express";
import studentController from "../controllers/student.controller";

const path = "/student/:id";
const router = Router();

router.post("/student/", studentController.createStudent);
router.get(path, studentController.getSingleStudent);
router.get('/students/:id', studentController.getStudentFromSpecificClass);
router.patch(path, studentController.updateStudent);
router.delete(path, studentController.deleteStudentById);

export default router;