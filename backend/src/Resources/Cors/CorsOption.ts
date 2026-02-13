import { CorsOptions } from "cors";
import { allowedOrigins } from "./AllowedOrigins";

const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error("Origin not allowed by CORS"));
  },
  credentials: true,
};

export default corsOptions;
