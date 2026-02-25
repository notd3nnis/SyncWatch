import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { requireAuth } from "../middlewares/requireAuth";

const router = Router();

/** POST /api/auth/login - Google/Apple login; body: { idToken, provider } */
router.post("/login", authController.authValidation, authController.login);

/** POST /api/auth/refresh - Refresh session (requires Bearer token) */
router.post("/refresh", requireAuth, authController.refresh);

export default router;
