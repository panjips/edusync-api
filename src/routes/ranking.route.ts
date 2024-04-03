import { Router } from "express";
import rankingController from "../controllers/ranking.controller";

const router = Router();

router.get("/:id", rankingController.gradeRankFromSingleAsignment);
router.get("/rankings/:id", rankingController.averageSingleStudentGrade);

export default router;
