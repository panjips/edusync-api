import { Request, Response, NextFunction } from "express";

export default interface IController {
  (req: Request, res: Response, next: NextFunction): void;
}
