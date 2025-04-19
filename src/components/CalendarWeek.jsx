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
        <span className="text-base font-semibold">{formatWeekLabel()}</span>
        <button
          onClick={goToNextWeek}
          className="text-lg px-3 py-1 rounded-full hover:bg-gray-100"
        >
          →
        </button>
      </div>

      {/* Седем хоризонтални дни */}
      {weekDates.map((date) => {
        const dayEvents = events.filter((e) => e.date === date);

        return (
          <div
            key={date}
            onClick={() => {
              setSelectedDate(date);
              openViewModal();
            }}
            className="bg-white rounded-md shadow-sm hover:shadow-md transition cursor-pointer p-4 flex items-center justify-between border"
          >
            <div className="text-sm font-medium text-gray-700">
              {formatDate(date)}
            </div>
            <div className="flex gap-2">
              {dayEvents.slice(0, 3).map((e) => (
                <span
                  key={e.id}
                  className={`w-3 h-3 rounded-full ${getBgColor(e.category)}`}
                  title={e.title}
                ></span>
              ))}
              {dayEvents.length > 3 && (
                <span className="text-xs text-gray-500">+{dayEvents.length - 3}</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
