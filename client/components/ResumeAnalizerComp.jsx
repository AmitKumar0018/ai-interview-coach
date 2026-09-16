"use client";
import { uploadResume } from "@/apiServices/api";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ResumeAnalizerComp() {
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      return;
    }

    if (selectedFile.type !== "application/pdf") {
      toast.error("Please upload a PDF file");
      return;
    }

    setResumeFile(selectedFile);
    setResumeText("");
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!resumeFile) {
      toast.error("Please select your resume");
      return;
    }
    try {
      setLoading(true);
      const data = await uploadResume(resumeFile);
      if (data.success) {
        setResumeText(data.resumeText || "");
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Resume Analyzer
          </p>

          <h1 className="mt-3 text-3xl font-bold text-slate-900">
            Understand your resume better
          </h1>

          <p className="mt-3 text-slate-500">
            Upload your PDF resume to extract and review its content.
          </p>

          <form onSubmit={handleUpload} className="mt-8">
            <label
              htmlFor="resume"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Upload your resume
            </label>

            <input
              id="resume"
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
              className="block w-full rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm"
            />

            {resumeFile && (
              <p className="mt-3 text-sm text-slate-500">
                Selected file: {resumeFile.name}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-6 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Uploading..." : "Upload Resume"}
            </button>
          </form>
        </div>

        {resumeText && (
          <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">
              Extracted Resume Text
            </h2>

            <pre className="mt-5 whitespace-pre-wrap rounded-2xl bg-slate-50 p-5 text-sm leading-7 text-slate-700">
              {resumeText}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}
