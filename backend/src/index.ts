import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { OK } from "./Resources/Constants/StatusCodes";
import corsOptions from "./Resources/Cors/CorsOption";
import { apiRoutes } from "./Routes";
import { handleAppError } from "./Resources/exceptions/HandleAppError";

dotenv.config();

const app: Express = express();

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/", (_: Request, res: Response) => {
  res.status(OK).send("Welcome to SyncWatch API");
});

app.use("/api", apiRoutes);

app.all("*", (_: Request, res: Response) => {
  res.status(404).json({ message: "Invalid Api Endpoint" });
});

app.use(handleAppError);

const PORT = Number(process.env.PORT ?? 4000);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server ready at: http://localhost:${PORT}`);
});

export default app;
