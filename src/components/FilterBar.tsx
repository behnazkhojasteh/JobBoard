import React from 'react'

type FilterBarProps = {
  searchTerm: string
  onSearch: (value: string) => void
  selectedJobType: string
  onJobTypeChange: (value: string) => void
  jobTypes: string[]
}

export default function FilterBar({
  searchTerm,
  onSearch,
  selectedJobType,
  onJobTypeChange,
  jobTypes
}: FilterBarProps) {
  return (
    <div className='flex flex-col items-center gap-4 px-1 py-6 md:flex-row md:justify-center'>
      <label className='flex w-full max-w-2xl items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 shadow-lg shadow-black/10 backdrop-blur'>
        <svg viewBox='0 0 24 24' className='h-5 w-5 text-amber-300' fill='none' stroke='currentColor' strokeWidth='1.8'>
          <circle cx='11' cy='11' r='6' />
          <path d='m20 20-4.2-4.2' />
        </svg>
        <input
          className='w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-400'
          placeholder='Search your dream job ...'
          value={searchTerm}
          onChange={(event) => onSearch(event.target.value)}
        />
      </label>

      <select
        className='w-full max-w-xs rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 shadow-lg shadow-black/10 outline-none backdrop-blur'
        value={selectedJobType}
        onChange={(event) => onJobTypeChange(event.target.value)}
      >
        <option value='' className='text-slate-900'>All job types</option>
        {jobTypes.map((jobType) => (
          <option key={jobType} value={jobType} className='text-slate-900'>
            {jobType}
          </option>
        ))}
      </select>
    </div>
  )
}
