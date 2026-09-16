"use client";

import {
  createInterviewPreparation,
  createMockQuestions,
  uploadResume,
} from "@/apiServices/api";
import { useState } from "react";
import toast from "react-hot-toast";
import AnalysisResult from "./AnalysisResult";
import MockQuestions from "./MockQuestions";

export default function InterviewPreparationComp() {
  const [resumeFile, setresumeFile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [questionsLoading, setQuestionsLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      return;
    }
    if (selectedFile.type !== "application/pdf") {
      toast.error("Please upload a PDF file");
      return;
    }
    setresumeFile(selectedFile);
    setResumeText("");
    setAnalysis(null);
    setQuestions(null);
  };

  const handleGenerateQuestions = async () => {
    if (!resumeText || !jobDescription) {
      toast.error("Resume and job description are required");
      return;
    }
    try {
      setQuestionsLoading(true);
      const data = await createMockQuestions(resumeText, jobDescription);

      if (data.success) {
        setQuestions(data.questions);
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    } finally {
      setQuestionsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resumeFile) {
      toast.error("Please upload your resume");
      return;
    }

    if (!jobDescription.trim()) {
      toast.error("Please enter the job description");
      return;
    }

    try {
      setLoading(true);
      setAnalysis(null);

      const resumeResponse = await uploadResume(resumeFile);

      if (!resumeResponse.success) {
        toast.error(resumeResponse.message || "Resume upload failed");
        return;
      }

      const extractedText = resumeResponse.resumeText;

      setResumeText(extractedText);

      const interviewPreparationResponse = await createInterviewPreparation(
        extractedText,
        jobDescription,
      );

      if (!interviewPreparationResponse.success) {
        toast.error(
          preparationResponse.message || "Interview preparation failed",
        );
        return;
      }

      setAnalysis(interviewPreparationResponse.preparation.analysis);
      toast(interviewPreparationResponse.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Interview Preparation
          </p>

          <h1 className="mt-3 text-3xl font-bold text-slate-900">
            Prepare smarter for your next interview
          </h1>

          <p className="mt-3 text-slate-500">
            Upload your resume and paste the job description to receive
            personalized interview preparation.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label
                htmlFor="resume"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Upload Resume PDF
              </label>

              <input
                id="resume"
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
                className="block w-full rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm"
              />

              {resumeFile && (
                <p className="mt-2 text-sm text-slate-500">
                  Selected: {resumeFile.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="jobDescription"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Job Description
              </label>

              <textarea
                id="jobDescription"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
                rows={12}
                className="w-full rounded-xl border border-slate-200 p-4 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Analyzing your profile..."
                : "Generate Interview Analysis"}
            </button>

            {analysis && (
              <button
                type="button"
                onClick={handleGenerateQuestions}
                disabled={questionsLoading}
                className="mt-6 rounded-lg ml-6 bg-purple-600 px-5 py-3 font-medium text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {questionsLoading
                  ? "Generating Questions..."
                  : "Generate Mock Interview Questions"}
              </button>
            )}

            {questions && <MockQuestions questions={questions} />}
          </form>
        </div>

        {analysis && <AnalysisResult analysis={analysis} />}
      </div>
    </main>
  );
}
