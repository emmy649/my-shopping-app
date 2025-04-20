// components/ModalViewDay.jsx
import React from 'react';

const formatDateLong = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('bg-BG', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

export default function ModalViewDay({ date, events, onClose, onDelete }) {
  const filtered = events
    .filter((e) => e.date === date)
    .sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-md max-h-[80vh] overflow-y-auto animate-fade-in scale-95 animate-in duration-200 ease-out">
        <h3 className="text-lg font-semibold mb-4 text-center">
          Срещи за {formatDateLong(date)}
        </h3>

        {filtered.length === 0 && (
          <p className="text-sm text-gray-500 text-center">Няма срещи за този ден.</p>
        )}

        {filtered.map((e) => (
          <div
            key={e.id}
            className="mb-3 border rounded-lg p-3 shadow-sm bg-gray-50"
          >
            <div className="text-sm font-medium">
              ⏰ {e.time} – {e.title}
            </div>
            {e.note && (
              <div className="text-xs text-gray-500 mt-1">{e.note}</div>
            )}
            <div className="flex justify-end mt-2">
              <button
                onClick={() => onDelete(e.id)}
                className="text-xs text-red-500 hover:text-red-700"
              >
                ❌ Изтрий
              </button>
            </div>
          </div>
        ))}

        <div className="flex justify-center mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg"
          >
            Затвори
          </button>
        </div>
      </div>
    </div>
  );
}
