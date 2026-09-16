import InterviewPreparation from "../models/InterviewPreparation.js";
import {
  analysisResumeAndJob,
  generateMockInterviewQuestions,
} from "../services/aiServices.js";

// interviewPreparationController
const createInterviewPreparation = async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText || !jobDescription) {
      return res.status(400).json({
        success: false,
        message: "Resume text and job description are required",
      });
    }

    const analysis = await analysisResumeAndJob(resumeText, jobDescription);

    const preparation = await InterviewPreparation.create({
      userId: req.userId,
      resumeText,
      jobDescription,
      analysis,
    });

    return res.status(201).json({
      success: true,
      message: "Interview preparation created successfully",
      preparation,
    });
  } catch (error) {
    console.log(`error from controller interview create ${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// get all interviewPreparation
const getInterviewPreparations = async (req, res) => {
  try {
    const preparations = await InterviewPreparation.find({
      userId: req.userId,
    }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, preparations });
  } catch (error) {
    console.log(`error from controller get all interview  ${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// GET INTERVIEW BY ID
const getInterviewPreparationById = async (req, res) => {
  try {
    const { id } = req.params;
    const preparation = await InterviewPreparation.findOne({
      _id: id,
      user: req._id,
    });
    if (!preparation) {
      return res.status(404).json({
        success: false,
        message: "Interview preparation not found",
      });
    }
    return res.status(200).json({
      success: true,
      preparation,
    });
  } catch (error) {
    console.log(`error from controller get all interview By Id ${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// create mock interview questions
const createMockInterviewQuestions = async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;
    if (!resumeText || !jobDescription) {
      return res.status(400).json({
        success: false,
        message: "Resume text and job description are required",
      });
    }
    const questions = await generateMockInterviewQuestions(
      resumeText,
      jobDescription,
    );

    return res.status(200).json({
      success: true,
      message: "Mock interview questions generated successfully",
      questions,
    });
  } catch (error) {
    console.log(`error from controller get all interview By Id ${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export {
  createInterviewPreparation,
  getInterviewPreparations,
  getInterviewPreparationById,
  createMockInterviewQuestions
};
