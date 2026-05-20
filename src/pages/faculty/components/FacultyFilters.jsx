import { useState } from 'react';
import useDebounce from '../../../hooks/useDebounce';
import { useEffect } from 'react';

const DEPARTMENTS = [
  { value: '', label: 'All departments' },
  { value: 'computer-science', label: 'Computer Science' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'management', label: 'Management' },
  { value: 'mathematics', label: 'Mathematics' },
];

const DESIGNATIONS = [
  { value: '', label: 'All designations' },
  { value: 'professor', label: 'Professor' },
  { value: 'asst-professor', label: 'Asst. Professor' },
  { value: 'hod', label: 'HOD' },
];

const STATUSES = [
  { value: '', label: 'All status' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];

const selectClass = `px-3 py-2 text-sm rounded-lg border border-[#B5D4F4]
  bg-[#F0F6FF] text-[#185FA5] focus:outline-none focus:border-[#185FA5]
  focus:bg-white transition cursor-pointer`;

function FacultyFilters({ filters, onChange }) {
  const [search, setSearch] = useState('');
  const debounced = useDebounce(search, 400);

  useEffect(() => {
    onChange({ ...filters, search: debounced });
  }, [debounced]);

  const handleChange = (key, value) => {
    onChange({ ...filters, [key]: value });
  };

  const hasActiveFilter = filters.search || filters.department
    || filters.designation || filters.status;

  return (
    <div className="flex items-center gap-2 px-4 py-3
      border-b border-[#E6F1FB] flex-wrap">


      <div className="relative flex-1 min-w-40">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#378ADD]"
          width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2"
          viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search name, email..."
          className="w-full pl-9 pr-8 py-2 text-sm rounded-lg border border-[#B5D4F4]
            bg-[#F0F6FF] text-[#042C53] placeholder-[#85B7EB]
            focus:outline-none focus:border-[#185FA5] focus:bg-white transition"
        />
        {search && (
          <button
            onClick={() => { setSearch(''); onChange({ ...filters, search: '' }); }}
            className="absolute right-3 top-1/2 -translate-y-1/2
              text-[#378ADD] hover:text-[#185FA5] text-xs"
            aria-label="Clear search"
          >✕</button>
        )}
      </div>

      <select
        value={filters.department}
        onChange={e => handleChange('department', e.target.value)}
        className={selectClass}
      >
        {DEPARTMENTS.map(d => (
          <option key={d.value} value={d.value}>{d.label}</option>
        ))}
      </select>

      <select
        value={filters.designation}
        onChange={e => handleChange('designation', e.target.value)}
        className={selectClass}
      >
        {DESIGNATIONS.map(d => (
          <option key={d.value} value={d.value}>{d.label}</option>
        ))}
      </select>

      <select
        value={filters.status}
        onChange={e => handleChange('status', e.target.value)}
        className={selectClass}
      >
        {STATUSES.map(s => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </select>

      {hasActiveFilter && (
        <button
          onClick={() => {
            setSearch('');
            onChange({ search: '', department: '', designation: '', status: '' });
          }}
          className="px-3 py-2 text-xs text-[#A32D2D] border border-[#F7C1C1]
            rounded-lg bg-[#FCEBEB] hover:bg-[#F7C1C1] transition"
        >
          Clear
        </button>
      )}
    </div>
  );
}

export default FacultyFilters;