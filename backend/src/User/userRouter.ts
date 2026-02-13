import { Router } from "express";
import { verifyAuthToken } from "../Resources/middleware/verifyAuthToken";
import { validateRequest } from "../Resources/middleware/ValidateRequest";
import { getMeController, patchMeController } from "./UserController";
import { patchMeSchema } from "./userSchema";

const userRouter = Router();

userRouter.get("/me", verifyAuthToken, getMeController);
userRouter.patch("/me", verifyAuthToken, validateRequest(patchMeSchema), patchMeController);

export default userRouter;
