"use client";

import { BrainCircuit, CheckCircle2, Target, AlertCircle } from "lucide-react";

function SummaryItem({ icon, title, items, emptyMessage }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="flex items-center gap-3">
        {icon}

        <h3 className="font-semibold text-slate-900">{title}</h3>
      </div>

      {Array.isArray(items) && items.length > 0 ? (
        <ul className="mt-4 space-y-3">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm leading-6 text-slate-600"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />

              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-slate-500">{emptyMessage}</p>
      )}
    </div>
  );
}

export default function AnalysisResult({ analysis }) {
  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-xl">
        <div className="flex items-center gap-3">
          <BrainCircuit size={28} />

          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-300">
            AI Career Analysis
          </p>
        </div>

        <h2 className="mt-4 text-3xl font-bold">
          Your interview preparation report
        </h2>

        <p className="mt-3 text-slate-300">
          Review your matching skills, missing skills, and important interview
          focus areas.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <SummaryItem
          icon={<CheckCircle2 className="text-emerald-600" />}
          title="Matching Skills"
          items={analysis?.matchingSkills}
          emptyMessage="No matching skills found"
        />

        <SummaryItem
          icon={<AlertCircle className="text-amber-600" />}
          title="Missing Skills"
          items={analysis?.missingSkills}
          emptyMessage="No missing skills found"
        />

        <div className="md:col-span-2">
          <SummaryItem
            icon={<Target className="text-indigo-600" />}
            title="Interview Focus Areas"
            items={analysis?.interviewFocusAreas}
            emptyMessage="No interview focus areas found"
          />
        </div>
      </div>
    </section>
  );
}
