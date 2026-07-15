import React, { useState } from 'react'
import useJobLoad from '../context/jobLoad'
import FilterBar from './FilterBar'

// Number of jobs shown on each page.
const PAGE_SIZE = 6

export default function JobCard({ url }: { url: string }) {
  // Tracks which card is currently hovered so the salary panel can appear.
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  // Search and filter state used to narrow the visible results.
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedJobType, setSelectedJobType] = useState('')
  // Pagination state for moving through filtered results.
  const [currentPage, setCurrentPage] = useState(1)
  const { jobs, loading, error } = useJobLoad(url)

  // Collect available job types from the loaded data.
  const jobTypes = Array.from(new Set(jobs.map((item) => item.job_type)))

  // Apply search and type filters before pagination.
  const filteredJobs = jobs.filter((item) => {
    const query = searchTerm.toLowerCase()
    const matchesSearch =
      item.title.toLowerCase().includes(query) ||
      item.company_name.toLowerCase().includes(query)
    const matchesType =
      selectedJobType === '' || item.job_type.toLowerCase() === selectedJobType.toLowerCase()

    return matchesSearch && matchesType
  })

  // Determine how many pages are needed for the filtered list.
  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / PAGE_SIZE))
  const safePage = Math.min(currentPage, totalPages)
  const startIndex = (safePage - 1) * PAGE_SIZE
  const pagedJobs = filteredJobs.slice(startIndex, startIndex + PAGE_SIZE)

  // Reset to the first page whenever the user changes filters.
  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handleJobTypeChange = (value: string) => {
    setSelectedJobType(value)
    setCurrentPage(1)
  }

  const handlePageChange = (nextPage: number) => {
    setCurrentPage(Math.min(Math.max(1, nextPage), totalPages))
  }

  return (
    <div className='rounded-[2rem] border border-white/10 bg-slate-900/70 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-6'>
      {/* Search and type filter controls live in the shared filter bar. */}
      <FilterBar
        searchTerm={searchTerm}
        onSearch={handleSearch}
        selectedJobType={selectedJobType}
        onJobTypeChange={handleJobTypeChange}
        jobTypes={jobTypes}
      />

      {/* Summary header showing how many jobs match the current query. */}
      <div className='mb-6 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <p className='text-sm font-semibold uppercase tracking-[0.3em] text-amber-300'>Results</p>
          <p className='mt-1 text-sm text-slate-300'>Showing {filteredJobs.length} matching jobs</p>
        </div>
        <div className='rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-sm font-medium text-amber-200'>
          Page {safePage} of {totalPages}
        </div>
      </div>

      {loading ? (
        <p className='py-10 text-center text-slate-300'>Loading...</p>
      ) : error ? (
        <p className='py-10 text-center text-slate-300'>Something goes wrong, Please try again</p>
      ) : filteredJobs.length === 0 ? (
        <p className='py-10 text-center text-slate-300'>No jobs match your filters.</p>
      ) : (
        <>
          {/* Render only the jobs for the current page. */}
          <ul className='flex flex-wrap items-center justify-center gap-6 px-1 py-2'>
            {pagedJobs.map((item) => {
              const isHovered = hoveredId === item.id

              return (
                <li
                  key={item.id}
                  className='w-full max-w-md rounded-[1.6rem] border border-white/10 bg-white/10 p-6 shadow-lg shadow-black/10 transition-transform duration-300 hover:-translate-y-1'
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {isHovered && item.salary ? (
                    <div className='rounded-[1.4rem] border border-pink-400/40 bg-pink-500/10 p-7 shadow-2xl shadow-pink-500/10'>
                      <p className='text-sm font-semibold uppercase tracking-[0.3em] text-pink-200'>Compensation</p>
                      <h4 className='mt-4 text-2xl font-semibold text-white'>${item.salary}</h4>
                    </div>
                  ) : (
                    <>
                      <div className='flex items-center justify-between'>
                        <span className='text-xs uppercase tracking-[0.25em] text-amber-300 font-semibold'>
                          {item.job_type}
                        </span>
                        <span className='text-sm text-slate-400'>Job #{item.id}</span>
                      </div>
                      <h2 className='mt-4 text-2xl font-semibold text-white'>{item.title}</h2>
                      <p className='mt-3 text-sm text-slate-300'>
                        Company: <span className='font-semibold text-slate-100'>{item.company_name}</span>
                      </p>
                    </>
                  )}
                </li>
              )
            })}
          </ul>

          {/* Show page navigation only when the list spans more than one page. */}
          {totalPages > 1 && (
            <div className='flex flex-wrap items-center justify-center gap-3 pb-4 pt-6'>
              <button
                className='rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-100 disabled:cursor-not-allowed disabled:opacity-50'
                onClick={() => handlePageChange(safePage - 1)}
                disabled={safePage === 1}
              >
                Previous
              </button>
              <span className='rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 text-sm font-medium text-slate-200'>
                Page {safePage} of {totalPages}
              </span>
              <button
                className='rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-100 disabled:cursor-not-allowed disabled:opacity-50'
                onClick={() => handlePageChange(safePage + 1)}
                disabled={safePage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
