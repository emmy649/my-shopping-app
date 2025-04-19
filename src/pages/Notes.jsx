import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const bgColors = [
  'bg-rose-100', 'bg-green-100', 'bg-blue-100', 'bg-yellow-100',
  'bg-purple-100', 'bg-pink-100', 'bg-indigo-100', 'bg-teal-100'
];

const formatDate = (date) => {
  const daysBg = ['Неделя', 'Понеделник', 'Вторник', 'Сряда', 'Четвъртък', 'Петък', 'Събота'];
  const day = daysBg[date.getDay()];
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  return `${day}, ${d}.${m}.${y} г.`;
};

export default function Notes() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('notes');
    return saved ? JSON.parse(saved) : [];
  });

  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleSave = () => {
    if (!text.trim()) return;

    if (editId) {
      setNotes((prev) =>
        prev.map((n) => (n.id === editId ? { ...n, text } : n))
      );
      setEditId(null);
    } else {
      const newNote = {
        id: Date.now(),
        text,
        date: formatDate(new Date()),
        color: bgColors[Math.floor(Math.random() * bgColors.length)],
      };
      setNotes([newNote, ...notes]);
    }

    setText('');
    setShowModal(false);
  };

  const handleEdit = (note) => {
    setText(note.text);
    setEditId(note.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="relative min-h-screen p-4 pb-24 max-w-md mx-auto">
      {/* Бутон назад */}
      <Link
        to="/"
        className="fixed top-4 right-4 w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg flex items-center justify-center text-gray-500 hover:text-gray-700 transition z-50"
        title="Обратно към началото"
      >
        ←
      </Link>

      <h2 className="text-xl font italic text-center mb-10">Какво ще си запишеш... </h2>

      <div className="flex flex-col gap-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className={`rounded-xl shadow p-4 ${note.color} flex flex-col gap-2`}
          >
            <div className="text-xs text-gray-500">{note.date}</div>
            <div className="text-sm text-gray-800 whitespace-pre-line">{note.text}</div>
            <div className="flex justify-end gap-2 text-sm mt-1">
              <button
                onClick={() => handleEdit(note)}
                className="text-gray-500 hover:text-gray-700"
                title="Редактирай"
              >
                ✏️
              </button>
              <button
                onClick={() => handleDelete(note.id)}
                className="text-red-400 hover:text-red-600"
                title="Изтрий"
              >
                Х
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Плаващ бутон */}
      <button
        onClick={() => {
          setText('');
          setEditId(null);
          setShowModal(true);
        }}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-blue-300 text-white shadow-lg hover:bg-blue-400 transition flex items-center justify-center text-3xl"
      >
        +
      </button>

      {/* Модален прозорец */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-80">
            <h3 className="text-lg font-semibold mb-4 text-center">
              {editId ? 'Редакция на бележка' : 'Нова бележка'}
            </h3>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Въведи бележка..."
              rows={5}
              className="w-full border rounded-lg px-3 py-2 text-sm mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowModal(false);
                  setText('');
                  setEditId(null);
                }}
                className="text-sm px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
              >
                Отказ
              </button>
              <button
                onClick={handleSave}
                className="text-sm px-4 py-2 rounded-lg bg-blue-400 text-white hover:bg-blue-500"
              >
                Запази
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
