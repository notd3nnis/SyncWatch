import { Router } from "express";

import authRouter from "../Auth/authRouter";
import partyRouter from "../Party/partyRouter";
import inviteRouter from "../Invite/inviteRouter";
import chatRouter from "../Chat/chatRouter";
import syncRouter from "../Sync/syncRouter";
import userRouter from "../User/userRouter";

export const apiRoutes = Router()
  .use("/auth", authRouter)
  .use("/users", userRouter)
  .use("/parties", partyRouter)
  .use("/invites", inviteRouter)
  .use("/chat", chatRouter)
  .use("/sync", syncRouter);
