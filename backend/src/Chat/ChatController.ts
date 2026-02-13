import { Request, Response, NextFunction } from "express";
import { CREATED, OK } from "../Resources/Constants/StatusCodes";
import { requestUser } from "../Resources/requestHelpers/requestUser";
import { handleRequestError } from "../Resources/requestHelpers/handleRequestError";
import { listMessages, postMessage } from "./ChatService";

export async function postMessageController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user = requestUser(req);
    await postMessage(req.params.partyId, user.uid, req.body.text);
    res.status(CREATED).json({ ok: true });
  } catch (error) {
    handleRequestError(next, error);
  }
}

export async function listMessagesController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user = requestUser(req);
    const limit = Number(req.query.limit ?? 50);
    const messages = await listMessages(req.params.partyId, user.uid, limit);
    res.status(OK).json({ messages });
  } catch (error) {
    handleRequestError(next, error);
  }
}
