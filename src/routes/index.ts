import express from "express";
import teacherRoute from "./teacher.route";
import classRoute from "./class.route";
import classController from "../controllers/class.controller";
import assignmentRoute from "./assignment.route";
import Authenticate from "../middlewares/authenticate";
import assignmentController from "../controllers/assignment.controller";

const router = express.Router();

router.use("/auth", teacherRoute);
router.use("/class", Authenticate.verifyToken, classRoute);
router.use("/assignment", Authenticate.verifyToken, assignmentRoute);

router.get(
  "/classes/:id_teacher",
  Authenticate.verifyToken,
  classController.getAllClass
);
router.get(
  "/assignments/:id_class",
  Authenticate.verifyToken,
  assignmentController.getAllAssignment
);

export default router;
