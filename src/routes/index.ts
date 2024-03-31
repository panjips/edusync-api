import express from "express";
import studentRoute from "../routes/student.route";

const router = express.Router();

router.use("/", studentRoute);

export default router;
