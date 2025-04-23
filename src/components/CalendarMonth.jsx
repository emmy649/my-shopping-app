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
    const fixedDate = new Date(year, month, d, 12); // 12:00 фиксация
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
                className="bg-transparent h-[90px] min-w-0"
              ></div>
            );
          }

          const iso = day.toISOString().split('T')[0];
          const dailyEvents = events.filter((e) => e.date === iso);

          return (
            <div
              key={iso}
              onClick={() => {
                setSelectedDate(iso);
                openViewModal();
              }}
              className="relative bg-white border rounded-md shadow-sm hover:shadow-md transition cursor-pointer p-2 h-[90px] min-w-0 flex flex-col justify-between"
            >
              <div className="absolute top-1 right-2 text-xs text-gray-400">
                {formatDateShort(day)}
              </div>

              <div className="flex flex-wrap gap-1 mt-6">
                {dailyEvents.slice(0, 3).map((e) => (
                  <span
                    key={e.id}
                    className={`w-3 h-3 rounded-full ${getBgColor(e.category)}`}
                    title={e.title}
                  ></span>
                ))}
                {dailyEvents.length > 3 && (
                  <span className="text-xs text-gray-500 ml-1">
                    +{dailyEvents.length - 3}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
