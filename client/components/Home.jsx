import { AlertCircle, CheckCircle2, Target } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <section className="mx-auto grid min-h-[600px]  max-w-7xl  items-center gap-12 px-6 py-20 md:grid-cols-2">
        <div>
          <p className="mb-4 font-semibold text-indigo-600">
            AI-powered career preparation
          </p>

          <h2 className="text-4xl font-bold leading-tight text-gray-900 md:text-6xl">
            Prepare smarter.
            <br />
            Interview better.
          </h2>

          <p className="mt-6 max-w-xl text-lg text-gray-600">
            Upload your resume, compare it with a job description, and receive
            personalized interview preparation powered by AI.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/register"
              className="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700"
            >
              Start Preparing
            </Link>

            <Link
              href="/login"
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 hover:bg-gray-100"
            >
              Login
            </Link>
          </div>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-600 p-8 text-white shadow-xl">
          <div className="rounded-2xl bg-white p-6 text-gray-900">
            <p className="text-sm text-gray-500">AI Interview Summary</p>

            <h3 className="mt-2 text-2xl font-bold">
              Your preparation starts here
            </h3>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2 rounded-lg bg-green-50 p-4 text-green-700 shadow-lg border border-green-300 font-medium hover:border-green-700 hover:font-bold transition-all duration-300 hover:scale-105">
                <CheckCircle2 />
                <span> Matching Skills</span>
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-orange-50 p-4 text-orange-700 shadow-lg border border-orange-300 font-medium hover:border-orange-700 hover:font-bold transition-all duration-300 hover:scale-105">
                <AlertCircle />
                <span>Missing Skills</span>
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-indigo-50 p-4 text-indigo-700 shadow-lg border border-indigo-300 font-medium hover:border-indigo-700 hover:font-bold transition-all duration-300 hover:scale-105">
                <Target />
                <span>Interview Focus Areas</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <h2 className="text-center text-3xl font-bold">How it works</h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <FeatureCard
            number="01"
            title="Upload your resume"
            description="Upload your resume as a PDF file."
          />

          <FeatureCard
            number="02"
            title="Add job description"
            description="Paste the job description for your target role."
          />

          <FeatureCard
            number="03"
            title="Get AI analysis"
            description="Receive matching skills, missing skills, and preparation topics."
          />
        </div>
      </section>
    </main>
  );
}

function FeatureCard({ number, title, description }) {
  return (
    <div className="rounded-2xl shadow-lg bg-white p-6 ring-2 ring-gray-200">
      <p className="text-sm font-bold text-indigo-600">{number}</p>

      <h3 className="mt-3 text-xl font-semibold">{title}</h3>

      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
}
