import React, { useState } from 'react';

export default function ModalAddEvent({ date, onClose, onSave }) {
  const [selectedDate, setSelectedDate] = useState(date);
  const [time, setTime] = useState('');
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [category, setCategory] = useState('general');

  const handleSubmit = () => {
    if (!time || !title.trim()) return;
    onSave({
      id: Date.now(),
      date: selectedDate,
      time,
      title,
      note,
      category,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-md animate-fade-in scale-95 animate-in duration-200 ease-out">
        <h3 className="text-lg font-semibold mb-4 text-center">Нова среща</h3>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm mb-3"
        />

        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm mb-3"
        />

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Заглавие"
          className="w-full border rounded-lg px-3 py-2 text-sm mb-3"
        />

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Бележка (по желание)"
          className="w-full border rounded-lg px-3 py-2 text-sm mb-3"
          rows={2}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm mb-4"
        >
          <option value="work">Работа</option>
          <option value="personal">Лични</option>
          <option value="home">Домашни</option>
          <option value="special">Специални</option>
          <option value="general">Общи</option>
        </select>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="text-sm px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Отказ
          </button>
          <button
            onClick={handleSubmit}
            className="text-sm px-4 py-2 rounded-lg bg-purple-400 text-white hover:bg-purple-500"
          >
            Запази
          </button>
        </div>
      </div>
    </div>
  );
}
