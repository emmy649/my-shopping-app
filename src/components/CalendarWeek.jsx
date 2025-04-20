import React from 'react';

const getBgColor = (category) => {
  switch (category) {
    case 'work': return 'bg-blue-200';
    case 'personal': return 'bg-pink-200';
    case 'home': return 'bg-green-200';
    case 'special': return 'bg-purple-200';
    default: return 'bg-gray-200';
  }
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('bg-BG', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

export default function CalendarWeek({
  events,
  selectedDate,
  setSelectedDate,
  openViewModal,
  weekStartDate,
  goToPreviousWeek,
  goToNextWeek,
}) {
  const weekDates = [...Array(7)].map((_, i) => {
    const d = new Date(weekStartDate);
    d.setDate(d.getDate() + i);
    return new Date(d.setHours(12, 0, 0, 0)).toISOString().split('T')[0];
  });

  const formatWeekLabel = () => {
    const start = new Date(weekDates[0]);
    const end = new Date(weekDates[6]);

    const startLabel = start.toLocaleDateString('bg-BG', {
      day: '2-digit',
      month: 'short',
    });

    const endLabel = end.toLocaleDateString('bg-BG', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    return `${startLabel} – ${endLabel}`;
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Заглавие със стрелки */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={goToPreviousWeek}
          className="text-lg px-3 py-1 rounded-full hover:bg-gray-100"
        >
          ←
        </button>
        <span className="text-base font-semibold text-center">
          {formatWeekLabel()}
        </span>
        <button
          onClick={goToNextWeek}
          className="text-lg px-3 py-1 rounded-full hover:bg-gray-100"
        >
          →
        </button>
      </div>

      {/* Седем вертикални дни */}
      {weekDates.map((date) => {
        const dayEvents = events.filter((e) => e.date === date);
        const isSelected = selectedDate === date;

        return (
          <div
            key={date}
            className={`rounded-lg border p-3 w-full shadow-sm bg-white cursor-pointer hover:bg-gray-50 transition-all ${isSelected ? 'border-yellow-400 bg-yellow-50' : ''}`}
            onClick={() => {
              setSelectedDate(date);
              openViewModal();
            }}
          >
            <div className="text-sm font-semibold text-gray-700 mb-2">
              {formatDate(date)}
            </div>
            <div className="flex flex-col gap-1">
              {dayEvents.map((ev, i) => (
                <div
                  key={i}
                  className={`rounded px-2 py-0.5 text-[12px] truncate ${getBgColor(ev.category)}`}
                  title={ev.title}
                >
                  {ev.title}
                </div>
              ))}
              {dayEvents.length === 0 && (
                <span className="text-gray-300 italic text-xs">няма събития</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
