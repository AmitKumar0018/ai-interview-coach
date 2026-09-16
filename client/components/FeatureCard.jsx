import Link from "next/link";

export default function FeatureCard({ title, description, buttonText, href }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>

      <p className="mt-3 min-h-14 text-sm leading-6 text-slate-500">
        {description}
      </p>

      <Link
        href={href}
        className="mt-6 inline-flex rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
      >
        {buttonText}
      </Link>
    </div>
  );
}
