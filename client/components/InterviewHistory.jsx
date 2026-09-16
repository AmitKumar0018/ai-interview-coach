"use client";

import { useEffect, useState } from "react";
import { getAllInterviewPreparation } from "@/apiServices/api";
import toast from "react-hot-toast";
import Link from "next/link";
import { CalendarDays, FileText, ArrowRight, LoaderCircle } from "lucide-react";

const InterviewHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const data = await getAllInterviewPreparation();

      setHistory(data.preparations || []);
    } catch (error) {
      console.log("Error fetching interview history:", error);
      toast.error(
        error.response?.data?.message || "Failed to load interview history",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const formatDate = (date) => {
    if (!date) {
      return "Date not available";
    }

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <LoaderCircle className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Interview History</h1>

        <p className="mt-2 text-gray-600">
          Review your previously generated interview preparations.
        </p>
      </div>

      {history.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
          <FileText size={48} className="mx-auto mb-4 text-gray-400" />

          <h2 className="text-xl font-semibold text-gray-800">
            No interview preparation found
          </h2>

          <p className="mt-2 text-gray-500">
            Create your first interview preparation to see it here.
          </p>

          <Link
            href="/interview-preparation"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
          >
            Create Preparation
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {history.map((item) => (
            <div
              key={item._id}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
                <CalendarDays size={17} />

                <span>{formatDate(item.createdAt)}</span>
              </div>

              <h2 className="line-clamp-2 text-xl font-semibold text-gray-900">
                Interview Preparation
              </h2>

              <p className="mt-3 line-clamp-4 text-sm leading-6 text-gray-600">
                {item.jobDescription}
              </p>

              <Link
                href={`/history/${item._id}`}
                className="mt-5 inline-flex items-center gap-2 font-medium text-blue-600 hover:text-blue-800"
              >
                View Preparation
                <ArrowRight size={17} />
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default InterviewHistory;
