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
  const [expandedNote, setExpandedNote] = useState(null);

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

  const toggleExpand = (id) => {
    setExpandedNote(expandedNote === id ? null : id);
  };

  return (
    <div className="relative min-h-[100dvh] p-4 pb-24 max-w-md mx-auto">
      <Link
        to="/"
        className="fixed top-4 right-4 w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg flex items-center justify-center text-gray-500 hover:text-gray-700 transition z-50"
        title="Обратно към началото"
      >
        ←
      </Link>

      <h2 className="text-xl font italic text-center mb-10">Какво ще си запишеш... </h2>

      <div className="flex flex-col gap-4">
        {notes.map((note) => {
          const isLong = note.text.length > 200;
          const isExpanded = expandedNote === note.id;
          return (
            <div
              key={note.id}
              className={`p-4 rounded-xl text-sm break-words whitespace-pre-wrap ${note.color}`}
            >
              <div className="text-xs text-gray-500 mb-2">{note.date}</div>
              <div className="text-gray-800 leading-relaxed">
                {isLong && !isExpanded
                  ? note.text.slice(0, 200) + '...'
                  : note.text}
              </div>
              {isLong && (
                <button
                  onClick={() => toggleExpand(note.id)}
                  className="text-xs text-blue-500 hover:underline mt-1"
                >
                  {isExpanded ? 'Скрий' : 'Покажи повече'}
                </button>
              )}
              <div className="flex justify-end mt-3 gap-2 text-xs">
                <button
                  onClick={() => handleEdit(note)}
                  className="text-blue-500 hover:underline"
                >
                  ✏️ Редактирай
                </button>
                <button
                  onClick={() => handleDelete(note.id)}
                  className="text-red-500 hover:underline"
                >
                  🗑️ Изтрий
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating button */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 bg-purple-500 text-white rounded-full w-12 h-12 text-xl shadow-lg hover:bg-purple-600 z-50"
        title="Нова бележка"
      >
        ＋
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-[90%] max-w-md animate-in fade-in scale-95 duration-200">
            <h3 className="text-center text-lg font-semibold mb-4">
              {editId ? 'Редактирай бележка' : 'Нова бележка'}
            </h3>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Напиши нещо..."
              rows={4}
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
                className="text-sm px-4 py-2 rounded-lg bg-purple-400 text-white hover:bg-purple-500"
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