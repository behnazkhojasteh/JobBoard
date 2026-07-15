import { Link, type MetaFunction } from "react-router";

export const meta: MetaFunction = () => [
  { title: "RemoteHub • Discover your next remote role" },
  {
    name: "description",
    content: "Browse curated remote jobs, refine by job type, and move effortlessly through polished results.",
  },
];

// Highlight cards shown on the landing page to explain the product value.
const highlights = [
  {
    title: "Smart filters",
    description: "Find the right opportunity with focused search and job-type filtering.",
  },
  {
    title: "Beautiful browsing",
    description: "Enjoy a calm, modern experience with clear pagination and elegant cards.",
  },
  {
    title: "Remote-first",
    description: "A curated board made for teams that want flexibility and momentum.",
  },
];

export default function Home() {
  return (
    // Two-column hero layout: a stronger intro on the left and feature highlights on the right.
    <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-10">
        <p className="inline-flex rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
          Remote work, reimagined
        </p>
        <h1 className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl">
          Find your next remote role in one calm, curated view.
        </h1>
        <p className="mt-5 max-w-xl text-lg text-slate-300">
          Browse live listings, refine by job type, and move through results effortlessly with a polished experience designed for focus.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/job-card"
            className="rounded-full bg-amber-400 px-6 py-3 font-semibold text-slate-950 shadow-lg shadow-amber-500/20 hover:bg-amber-300"
          >
            Explore remote jobs
          </Link>
          <a href="#highlights" className="rounded-full border border-white/20 px-6 py-3 font-semibold text-slate-200 hover:bg-white/10">
            See highlights
          </a>
        </div>
      </div>

      <div id="highlights" className="grid gap-4">
        {highlights.map((item) => (
          <article
            key={item.title}
            className="rounded-[1.5rem] border border-white/10 bg-white/10 p-6 shadow-lg shadow-black/10 backdrop-blur"
          >
            <h2 className="text-xl font-semibold text-white">{item.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
