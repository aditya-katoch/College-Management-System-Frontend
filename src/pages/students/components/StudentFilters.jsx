import SearchInput from '../../../components/ui/SearchInput';

const COURSES = [
  { value: '', label: 'All courses' },
  { value: 'btech-cse', label: 'B.Tech CSE' },
  { value: 'btech-ece', label: 'B.Tech ECE' },
  { value: 'mba', label: 'MBA' },
  { value: 'bca', label: 'BCA' },
];

const YEARS = [
  { value: '', label: 'All years' },
  { value: '1', label: 'Year 1' },
  { value: '2', label: 'Year 2' },
  { value: '3', label: 'Year 3' },
  { value: '4', label: 'Year 4' },
];

const STATUSES = [
  { value: '', label: 'All status' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];

function StudentFilters({ filters, onChange }) {
  const handleChange = (key, value) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="flex flex-wrap gap-3 p-4 border-b border-[#E6F1FB]">

      <SearchInput
        placeholder="Search name, roll number..."
        onSearch={val => handleChange('search', val)}
        className="flex-1 min-w-45"
      />

      <select
        value={filters.course}
        onChange={e => handleChange('course', e.target.value)}
        className="px-3 py-2 text-sm rounded-lg border border-[#B5D4F4]
          bg-[#F0F6FF] text-[#185FA5] focus:outline-none focus:border-[#185FA5]
          focus:bg-white transition cursor-pointer"
      >
        {COURSES.map(c => (
          <option key={c.value} value={c.value}>{c.label}</option>
        ))}
      </select>

      <select
        value={filters.year}
        onChange={e => handleChange('year', e.target.value)}
        className="px-3 py-2 text-sm rounded-lg border border-[#B5D4F4]
          bg-[#F0F6FF] text-[#185FA5] focus:outline-none focus:border-[#185FA5]
          focus:bg-white transition cursor-pointer"
      >
        {YEARS.map(y => (
          <option key={y.value} value={y.value}>{y.label}</option>
        ))}
      </select>

      <select
        value={filters.status}
        onChange={e => handleChange('status', e.target.value)}
        className="px-3 py-2 text-sm rounded-lg border border-[#B5D4F4]
          bg-[#F0F6FF] text-[#185FA5] focus:outline-none focus:border-[#185FA5]
          focus:bg-white transition cursor-pointer"
      >
        {STATUSES.map(s => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </select>

      {(filters.search || filters.course || filters.year || filters.status) && (
        <button
          onClick={() => onChange({ search: '', course: '', year: '', status: '' })}
          className="px-3 py-2 text-sm text-[#A32D2D] border border-[#F7C1C1]
            rounded-lg bg-[#FCEBEB] hover:bg-[#F7C1C1] transition"
        >
          Clear filters
        </button>
      )}

    </div>
  );
}

export default StudentFilters;