import express from "express";
import { saveJobDescription } from "../controllers/jobDescriptionController.js";
import userAuth from "../middleware/userAuth.js";

const jdRouter = express.Router();

jdRouter.post("/save", userAuth, saveJobDescription);

export default jdRouter;
