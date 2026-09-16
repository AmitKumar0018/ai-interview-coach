"use client";

import { getCurrentUser, userLogout } from "@/apiServices/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FeatureCard from "./FeatureCard";

export default function DashBoardComp() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const checkUser = async () => {
    try {
      const data = await getCurrentUser();
      if (!data.success) {
        router.push("/login");
        return;
      }
      setUser(data.user);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
      router.push("/login");
    }
  };

  const handleLogout = async () => {
    try {
      const data = await userLogout();
      if (data.success) {
        toast.success(data.message);
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    checkUser();
  }, [router]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-slate-500">Loading dashboard...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Dashboard
          </p>

          <h1 className="mt-3 text-3xl font-bold text-slate-900">
            Welcome, {user?.name}
          </h1>

          <p className="mt-3 text-slate-500">
            Start preparing for your next interview.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <FeatureCard
            title="Resume Analyzer"
            description="Upload your resume and understand your skills, experience, and improvement areas."
            buttonText="Analyze Resume"
            href="/resume-analyzer"
          />

          <FeatureCard
            title="Interview Preparation"
            description="Compare your resume with a job description and generate personalized interview preparation."
            buttonText="Prepare Interview"
            href="/interview-preparation"
          />

          <FeatureCard
            title="Job Description Analysis"
            description="Understand required skills, responsibilities, and important keywords from a job description."
            buttonText="Analyze Job"
            href="/job-analysis"
          />

          <FeatureCard
            title="Preparation History"
            description="View your previous resume analyses and interview preparation reports."
            buttonText="View History"
            href="/history"
          />
        </div>

        <button
          onClick={handleLogout}
          className="mt-8 rounded-xl bg-red-500 px-4 py-2 font-semibold text-white transition hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </main>
  );
}
