import express from "express";
import teacherRoute from "./teacher.route";

const router = express.Router();

router.use("/api/v1/auth", teacherRoute);

export default router;
