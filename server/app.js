import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import jdRouter from "./routes/jobDescriptionRoutes.js";
import interviewPreparationRouter from "./routes/interviewPreparationRoutes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("api is working");
});

app.use("/api/auth", authRouter);
app.use("/api/resume", resumeRouter);
app.use("/api/jd", jdRouter);
app.use("/api/interview-preparation", interviewPreparationRouter);

export default app;
