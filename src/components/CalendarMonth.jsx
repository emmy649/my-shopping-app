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

const getMonthDays = (year, month) => {
  const days = [];
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstWeekDay = firstDayOfMonth.getDay() || 7;

  for (let i = 1; i < firstWeekDay; i++) {
    days.push(null);
  }

  for (let d = 1; d <= lastDayOfMonth.getDate(); d++) {
    const fixedDate = new Date(year, month, d, 12);
    days.push(fixedDate);
  }

  return days;
};

const formatDateShort = (date) =>
  date.toLocaleDateString('bg-BG', { day: '2-digit', month: '2-digit' });

const monthNames = [
  'Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни',
  'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември'
];

export default function CalendarMonth({
  events,
  selectedDate,
  setSelectedDate,
  openViewModal,
  currentYear,
  currentMonth,
  goToPreviousMonth,
  goToNextMonth,
}) {
  const days = getMonthDays(currentYear, currentMonth);

  return (
    <div className="p-3 border rounded-xl shadow bg-white w-full">
      {/* Навигация */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={goToPreviousMonth}
          className="text-lg px-3 py-1 rounded-full hover:bg-gray-100"
        >
          ←
        </button>
        <span className="text-base font-semibold">
          {monthNames[currentMonth]} {currentYear}
        </span>
        <button
          onClick={goToNextMonth}
          className="text-lg px-3 py-1 rounded-full hover:bg-gray-100"
        >
          →
        </button>
      </div>

      {/* Календар */}
      <div className="grid grid-cols-7 gap-2 w-full">
        {days.map((day, index) => {
          if (!day) {
            return (
              <div
                key={`empty-${index}`}
                className="bg-transparent min-w-[40px] aspect-square"
              ></div>
            );
          }

          const dateStr = day.toISOString().split('T')[0];
          const dayEvents = events.filter(e => e.date === dateStr);
          const isSelected = selectedDate === dateStr;

          return (
            <div
              key={dateStr}
              className={`rounded-md p-1 overflow-hidden text-xs border cursor-pointer flex flex-col justify-start items-start min-w-[40px] aspect-square ${isSelected ? 'bg-yellow-100 border-yellow-400' : 'bg-gray-50 hover:bg-gray-100'}`}
              onClick={() => {
                setSelectedDate(dateStr);
                openViewModal();
              }}
            >
              <div className="font-semibold text-gray-700 text-xs mb-1">
                {formatDateShort(day)}
              </div>
              <div className="flex flex-col gap-0.5 w-full">
                {dayEvents.map((ev, i) => (
                  <div
                    key={i}
                    className={`w-full rounded text-[10px] px-1 truncate ${getBgColor(ev.category)}`}
                    title={ev.title}
                  >
                    {ev.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}