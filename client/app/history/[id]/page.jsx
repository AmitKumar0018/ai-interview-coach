"use client";
import { getAllInterviewPreparationById } from "@/apiServices/api";
import AnalysisResult from "@/components/AnalysisResult";
import { ArrowLeft, CalendarDays, LoaderCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const HistoryDetailsPage = () => {
  const params = useParams();
  const router = useRouter()

  const [preparation, setPreparation] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPreparation = async () => {
    if (!params?.id) {
      return;
    }
    try {
      const data = await getAllInterviewPreparationById(params.id);
      setPreparation(data.preparation);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchPreparation();
    }
  }, [params.id]);

  const formatDate = (date) => {
    if (!date) {
      return "Date not available";
    }

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <LoaderCircle size={32} className="animate-spin text-blue-600" />
      </div>
    );
  }

  if (!preparation) {
    return (
      <main className="p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Preparation not found
        </h1>

        <button
          onClick={() => router.push("/history")}
          className="mt-5 rounded-lg bg-blue-600 px-5 py-3 text-white"
        >
          Back to History
        </button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <button
        onClick={() => router.push("/history")}
        className="mb-6 inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
      >
        <ArrowLeft size={18} />
        Back to History
      </button>

      <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
          <CalendarDays size={17} />

          <span>{formatDate(preparation.createdAt)}</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900">
          Interview Preparation
        </h1>

        <p className="mt-2 text-gray-600">
          Review your resume and job description analysis.
        </p>
      </div>

      <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          Job Description
        </h2>

        <p className="whitespace-pre-wrap leading-7 text-gray-700">
          {preparation.jobDescription}
        </p>
      </div>

      <AnalysisResult analysis={preparation.analysis} />
    </main>
  );
};

export default HistoryDetailsPage;
