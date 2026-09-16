import express from "express";
import { uploadResume } from "../controllers/resumeControllers.js";
import userAuth from "../middleware/userAuth.js";
import upload from "../middleware/uploadMiddleware.js";

const resumeRouter = express.Router();

resumeRouter.post("/upload", userAuth, upload.single("resume"), uploadResume);

export default resumeRouter;
