"use client";

import { useState } from "react";

export default function MockQuestions({ questions }) {
  const [openQuestion, setOpenQuestion] = useState(null);

  if (!questions) {
    return null;
  }

  const categories = [
    {
      title: "Technical Questions",
      items: questions.technicalQuestions || [],
    },
    {
      title: "Behavioral Questions",
      items: questions.behavioralQuestions || [],
    },
    {
      title: "Project Questions",
      items: questions.projectQuestions || [],
    },
  ];

  return (
    <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900">
        Mock Interview Questions
      </h2>

      <p className="mt-2 text-slate-500">
        Practice these questions before your interview.
      </p>

      <div className="mt-6 space-y-8">
        {categories.map((category, categoryIndex) => (
          <div key={category.title}>
            <h3 className="mb-3 text-lg font-bold text-indigo-600">
              {category.title}
            </h3>

            <div className="space-y-3">
              {category.items.map((question, questionIndex) => {
                const questionId = `${categoryIndex}-${questionIndex}`;

                return (
                  <div
                    key={questionId}
                    className="rounded-xl border border-slate-200"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenQuestion(
                          openQuestion === questionId ? null : questionId,
                        )
                      }
                      className="flex w-full items-center justify-between gap-4 p-4 text-left"
                    >
                      <span className="font-semibold text-slate-800">
                        {questionIndex + 1}. {question.question}
                      </span>

                      <span className="text-xl text-indigo-600">
                        {openQuestion === questionId ? "-" : "+"}
                      </span>
                    </button>

                    {openQuestion === questionId && (
                      <div className="border-t border-slate-200 bg-slate-50 p-4">
                        <p className="text-sm font-semibold text-indigo-600">
                          Suggested Answer
                        </p>

                        <p className="mt-2 leading-7 text-slate-600">
                          {question.expectedAnswerPoints}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
