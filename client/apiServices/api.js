import api from "./axios";

// register user
export const userRegister = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

// login user
export const userLogin = async (userData) => {
  const response = await api.post("/auth/login", userData);
  return response.data;
};

// logout user
export const userLogout = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

// get current user
export const getCurrentUser = async () => {
  const response = await api.get("/auth/currentuser");
  return response.data;
};

// upload resume
export const uploadResume = async (resumeFile) => {
  const formData = new FormData();
  formData.append("resume", resumeFile);
  const response = await api.post("/resume/upload", formData);
  return response.data;
};

//createInterviewPreparation
export const createInterviewPreparation = async (
  resumeText,
  jobDescription,
) => {
  const response = await api.post("/interview-preparation/create", {
    resumeText,
    jobDescription,
  });
  return response.data;
};

// get all interview
export const getAllInterviewPreparation = async () => {
  const response = await api.get("/interview-preparation/get");
  return response.data;
};

// get interview by id
export const getAllInterviewPreparationById = async (id) => {
  const response = await api.get(`/interview-preparation/get/${id}`);
  return response.data;
};

// create mock questions
export const createMockQuestions = async (resumeText, jobDescription) => {
  const response = await api.post("/interview-preparation/generate-questions", {
    resumeText,
    jobDescription,
  });
  return response.data;
};
