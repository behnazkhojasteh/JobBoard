import JobCard from "../../src/components/JobCard";

export default function JobCardRoute() {
  return (
    <section className="space-y-6">
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-10">
        <p className="inline-flex rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
          Live job board
        </p>
        <h1 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
          Discover remote opportunities
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-300">
          Filter by title, company, or job type, then browse results page by page in a polished experience.
        </p>
      </div>

      <JobCard url="https://remotive.com/api/remote-jobs" />
    </section>
  );
}
