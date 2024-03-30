import express from "express";
import classController from "../controllers/class.controller";

const router = express.Router();

router.post("/", classController.createClass);
router.get("/:id_class", classController.getSingleClass);
router.delete("/:id_class", classController.deleteSingleClass);
router.patch("/:id_class", classController.updateSingleClass);

export default router;
