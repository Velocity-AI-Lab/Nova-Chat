import express, { type Request, type Response } from "express";
import chatRoutes from "../src/routes/chat.routes";

export const app = express();

// middleware for express json limit
app.use(express.json({ limit: "16kb" }));

// middleware for Url Encoding - example - this change the link in the browser like akhil+nagpal or akhil%20nagpal
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running 🚀");
});

// Routes
app.use("/api/v1/", chatRoutes);
