import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
dotenv.config();

const port = process.env.PORT || 1000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
