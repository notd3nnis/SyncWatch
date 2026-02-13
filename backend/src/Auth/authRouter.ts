import { Router } from "express";
import { linkProviderController, providerStatusController } from "./AuthController";
import { verifyAuthToken } from "../Resources/middleware/verifyAuthToken";
import { validateRequest } from "../Resources/middleware/ValidateRequest";
import { linkProviderSchema } from "./authSchema";

const authRouter = Router();

authRouter.get("/provider/status", verifyAuthToken, providerStatusController);
authRouter.post("/provider/link", verifyAuthToken, validateRequest(linkProviderSchema), linkProviderController);

export default authRouter;
