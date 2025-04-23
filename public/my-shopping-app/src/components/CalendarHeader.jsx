import React from 'react';

export default function CalendarHeader({ view, setView, onToday }) {
  return (
    <div className="flex justify-center flex-wrap gap-4 mb-4">
      <button
        onClick={() => setView('month')}
        className={`px-4 py-2 rounded-full text-sm transition ${
          view === 'month'
            ? 'bg-purple-300 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        Месец
      </button>

      <button
        onClick={() => setView('week')}
        className={`px-4 py-2 rounded-full text-sm transition ${
          view === 'week'
            ? 'bg-purple-300 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        Седмица
      </button>

      <button
        onClick={onToday}
        className="px-4 py-2 rounded-full text-sm bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
      >
        Днес
      </button>
    </div>
  );
}
