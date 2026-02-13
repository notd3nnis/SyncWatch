import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { BAD_REQUEST } from "../Constants/StatusCodes";

export function validateRequest(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      res.status(BAD_REQUEST).json({ message: error.message });
      return;
    }
    next();
  };
}
