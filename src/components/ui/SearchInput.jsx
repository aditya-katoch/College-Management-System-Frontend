import { useState } from 'react';
import useDebounce from '../../hooks/useDebounce';

function SearchInput({ placeholder = 'Search...', onSearch, className = '' }) {
  const [value, setValue] = useState('');
  const debounced = useDebounce(value, 400);

  useState(() => {
    onSearch(debounced);
  }, [debounced]);

  return (
    <div className={`relative ${className}`}>
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#378ADD]">
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"
          viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
      </span>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-[#B5D4F4]
          bg-[#F0F6FF] text-[#042C53] placeholder-[#378ADD]
          focus:outline-none focus:border-[#185FA5] focus:bg-white transition"
      />
      {value && (
        <button
          onClick={() => { setValue(''); onSearch(''); }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#378ADD]
            hover:text-[#185FA5] transition"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchInput;