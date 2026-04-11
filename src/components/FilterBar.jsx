import React, { useState } from 'react';

export default function FilterBar({ onCategoryChange }) {
  const categories = [
    'all', 'food', 'toys', 'clothes', 'forniture', 'Elecs', 'books', 'money'
  ];

  const [active, setActive] = useState('all');

  const handleSelect = (category) => {
    setActive(category);
    if (onCategoryChange) onCategoryChange(category);
  };

  return (
    <div className="md:mt-12 mt-10 w-full border-y border-gray-300 py-3 px-10 flex items-center gap-6 overflow-x-auto no-scrollbar">
      <span className="text-gray-600 pr-10 font-mono whitespace-nowrap">
        filter by
      </span>
      <div className="flex flex-nowrap items-center gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleSelect(cat)}
            className={`px-4 py-1 rounded-md text-sm transition-colors duration-200 whitespace-nowrap ${
              active === cat
                ? 'bg-white text-[#1e293b] border border-[#1e293b]'
                : 'bg-[#1e293b] text-white hover:bg-[#334155]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}