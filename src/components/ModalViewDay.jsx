import React from 'react';

const getBgColor = (category = '') => {
  switch (category.toLowerCase()) {
    case 'work':
    case 'работа':
      return 'bg-blue-50';
    case 'personal':
    case 'лични':
      return 'bg-pink-50';
    case 'home':
    case 'домашни':
      return 'bg-green-50';
    case 'special':
    case 'специални':
      return 'bg-purple-50';
    default:
      return 'bg-gray-50';
  }
};

export default function ModalViewDay({ date, events, onClose, onDelete }) {
  const filtered = events
    .filter((e) => {
      const start = e.startDate ? new Date(e.startDate).toISOString().split('T')[0] : '';
      const end = e.endDate ? new Date(e.endDate).toISOString().split('T')[0] : start;
      return date >= start && date <= end;
    })
    .sort((a, b) => (a.startTime || '').localeCompare(b.startTime || ''));

  const formatDate = (d) => {
    try {
      return new Date(d).toLocaleDateString('bg-BG', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    } catch {
      return d;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-red-400 text-xl"
        >
          ×
        </button>
        <h3 className="text-lg font-semibold mb-4 text-center">
          Срещи за {formatDate(date)}
        </h3>

        {filtered.length === 0 ? (
          <p className="text-gray-500 text-center">Няма срещи</p>
        ) : (
          <ul className="space-y-3">
            {filtered.map((e) => (
              <li
                key={e.id}
                className={`p-3 rounded-md shadow-sm border ${getBgColor(e.category)}`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-800">{e.title}</span>
                  <button
                    onClick={() => onDelete && onDelete(e.id)}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Изтрий
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  📍 {e.location || 'Без място'}
                </p>
                <p className="text-sm text-gray-600">
                  ⏰ {e.startTime || '-'} – {e.endTime || '-'}
                </p>
                <p className="text-sm text-gray-600">
                  📅 {formatDate(e.startDate)} до {formatDate(e.endDate || e.startDate)}
                </p>
                {e.description && (
                  <p className="text-sm text-gray-600 mt-1">📝 {e.description}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
