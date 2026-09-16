import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const analysisSchema = {
  type: "object",
  properties: {
    matchingSkills: {
      type: "array",
      items: {
        type: "string",
      },
      description: "Skills found in both the resume and job description",
    },
    missingSkills: {
      type: "array",
      items: {
        type: "string",
      },
      description: "Important job requirements missing from the resume",
    },
    relevantExperience: {
      type: "array",
      items: {
        type: "string",
      },
      description: "Relevant experience found in the resume",
    },
    interviewFocusAreas: {
      type: "array",
      items: {
        type: "string",
      },
      description: "Topics the candidate should prepare for the interview",
    },
  },
  required: [
    "matchingSkills",
    "missingSkills",
    "relevantExperience",
    "interviewFocusAreas",
  ],
};

const mockInterviewSchema = {
  type: "object",

  properties: {
    technicalQuestions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          question: {
            type: "string",
          },
          expectedAnswerPoints: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
        required: ["question", "expectedAnswerPoints"],
      },
    },
    behavioralQuestions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          question: {
            type: "string",
          },
          expectedAnswerPoints: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
        required: ["question", "expectedAnswerPoints"],
      },
    },
    projectQuestions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          question: {
            type: "string",
          },
          expectedAnswerPoints: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
        required: ["question", "expectedAnswerPoints"],
      },
    },
  },
  required: ["technicalQuestions", "behavioralQuestions", "projectQuestions"],
};

const analysisResumeAndJob = async (resumeText, jobDescription) => {
  if (!resumeText || !jobDescription) {
    throw new Error("Resume text and job description are required");
  }

  const prompt = `
          You are an AI Interview and Career Coach.

          Analyze the candidate's resume against the job description.

          Resume:
          ${resumeText}

         Job Description:
         ${jobDescription}

        Return an accurate analysis.

        Rules:
        - matchingSkills: skills present in both the resume and job description
        - missingSkills: important job requirements not found in the resume
        - relevantExperience: experience from the resume relevant to the job
        - interviewFocusAreas: topics the candidate should prepare for
        - Keep each item short and clear
        - Do not invent experience
        `;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: analysisSchema,
    },
  });

  const analysis = JSON.parse(response.text);

  return analysis;
};

const generateMockInterviewQuestions = async (resumeText, jobDescription) => {
  if (!resumeText || !jobDescription) {
    throw new Error("Resume text and job description are required");
  }
  const prompt = `
    You are an experienced technical interviewer.

    Analyze the candidate's resume against the job description.

    Resume:
    ${resumeText}

    Job Description:
    ${jobDescription}

    Generate:
    - Five technical questions
    - Three behavioral questions
    - Two project-based questions

    Rules:
    - Questions must be based on the resume and job description
    - Do not invent projects or experience
    - Keep each question clear and practical
    - Provide two or three expected answer points for every question
    - Return only the requested JSON structure
  `;
  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: mockInterviewSchema,
    },
  });

  const questions = JSON.parse(response.text);

  return questions;
};

export { analysisResumeAndJob, generateMockInterviewQuestions };
