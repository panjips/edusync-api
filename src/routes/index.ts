import express from "express";
import teacherRoute from "./teacher.route";
import classRoute from "./class.route";
import Authenticate from "../middlewares/authenticate";
import classController from "../controllers/class.controller";

const router = express.Router();

router.use("/auth", teacherRoute);
router.use("/class", Authenticate.verifyToken, classRoute);

router.get(
  "/classes/:id_teacher",
  Authenticate.verifyToken,
  classController.getAllClass
);

export default router;
