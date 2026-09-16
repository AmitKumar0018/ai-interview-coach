import mongoose from "mongoose";

const interviewPreparationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resumeText: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    analysis: {
      matchingSkills: {
        type: [String],
        default: [],
      },
      missingSkills: {
        type: [String],
        default: [],
      },

      relevantExperience: {
        type: [String],
        default: [],
      },

      interviewFocusAreas: {
        type: [String],
        default: [],
      },
    },
  },
  { timestamps: true },
);

const InterviewPreparation = mongoose.model(
  "InterviewPreparation",
  interviewPreparationSchema,
);

export default InterviewPreparation;
