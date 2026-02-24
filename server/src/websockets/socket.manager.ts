import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import { verifyToken } from "../utils/jwt.util";
import { logger } from "../utils/logger";
import { registerRoomEvents } from "./room.events";
import { registerChatEvents } from "./chat.events";

/**
 * Extended Socket with optional userId (set after auth).
 */
export interface AuthenticatedSocket extends Socket {
  userId?: string;
}

/**
 * Initializes the Socket.IO server, attaches it to the HTTP server,
 * and configures JWT auth for handshake. Registers room and chat event handlers.
 * @param httpServer - HTTP server from Express
 * @returns Socket.IO server instance
 */
export function createSocketServer(httpServer: HttpServer): Server {
  const io = new Server(httpServer, {
    cors: { origin: process.env.CORS_ORIGIN ?? "*" },
    path: "/ws",
  });

  io.use((socket: AuthenticatedSocket, next) => {
    const token = socket.handshake.auth?.token ?? socket.handshake.headers?.authorization?.replace("Bearer ", "");
    if (!token) {
      next(new Error("Authentication required"));
      return;
    }
    const payload = verifyToken(token);
    if (!payload) {
      next(new Error("Invalid or expired token"));
      return;
    }
    socket.userId = payload.userId;
    next();
  });

  io.on("connection", (socket: AuthenticatedSocket) => {
    logger.debug("Socket connected", { socketId: socket.id, userId: socket.userId });
    registerRoomEvents(io, socket);
    registerChatEvents(io, socket);
    socket.on("disconnect", (reason) => {
      logger.debug("Socket disconnected", { socketId: socket.id, reason });
    });
  });

  return io;
}
