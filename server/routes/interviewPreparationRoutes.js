import express from "express";
import {
  createInterviewPreparation,
  getInterviewPreparations,
  getInterviewPreparationById,
  createMockInterviewQuestions,
} from "../controllers/interviewPreparationController.js";
import userAuth from "../middleware/userAuth.js";

const interviewPreparationRouter = express.Router();

interviewPreparationRouter.post(
  "/create",
  userAuth,
  createInterviewPreparation,
);

interviewPreparationRouter.get("/get", userAuth, getInterviewPreparations);
interviewPreparationRouter.get(
  "/get/:id",
  userAuth,
  getInterviewPreparationById,
);

interviewPreparationRouter.post(
  "/generate-questions",
  userAuth,
  createMockInterviewQuestions,
);

export default interviewPreparationRouter;
