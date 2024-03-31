import express from "express";
import assignmentController from "../controllers/assignment.controller";

const router = express.Router();

router.post("/", assignmentController.createAssignment);
router.get("/:id_assignment", assignmentController.getSingleAssignment);
router.delete("/:id_assignment", assignmentController.deleteSingleAssignment);
router.patch("/:id_assignment", assignmentController.updateSingleAssignment);

export default router;
