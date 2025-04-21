import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const formatDateText = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('bg-BG', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

const isSameDay = (d1, d2) =>
  d1.getDate() === d2.getDate() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getFullYear() === d2.getFullYear();

export default function Tasks() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [text, setText] = useState('');
  const [date, setDate] = useState('');
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  useEffect(() => {
    // Запазваме задачите в localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
  
    // Филтрираме задачите за утре, които още не са изпълнени
    const tomorrowTasks = tasks.filter(t => {
      const d = new Date(t.date);
      return isSameDay(d, tomorrow) && !t.done;
    });
  
    // Ако има такива задачи, показваме съобщение с текстовете
    if (tomorrowTasks.length > 0) {
      const taskList = tomorrowTasks.map((t, i) => `${i + 1}. ${t.text}`).join('\n');
      alert(`Утре имаш ${tomorrowTasks.length} задачи:\n\n${taskList}`);
    }
  }, [tasks]);
  
  

  const getBgColor = (taskDate, done) => {
    if (done) return 'bg-green-100';
    const tDate = new Date(taskDate);
    const diff = Math.ceil((tDate - today) / (1000 * 60 * 60 * 24));
    if (isSameDay(tDate, today)) return 'bg-gray-100';
    if (isSameDay(tDate, tomorrow)) return 'bg-rose-100';
    if (diff <= 3) return 'bg-yellow-100';
    return 'bg-blue-100';
  };

  const groupedTasks = {
    today: tasks.filter((t) => isSameDay(new Date(t.date), today)),
    tomorrow: tasks.filter((t) => isSameDay(new Date(t.date), tomorrow)),
    future: tasks.filter((t) => new Date(t.date) > tomorrow),
  };

  const handleSave = () => {
    if (!text.trim() || !date) return;

    if (editId) {
      setTasks((prev) =>
        prev.map((t) => (t.id === editId ? { ...t, text, date } : t))
      );
      setEditId(null);
    } else {
      setTasks([
        {
          id: Date.now(),
          text,
          date,
          done: false,
        },
        ...tasks,
      ]);
    }

    setText('');
    setDate('');
    setShowModal(false);
  };

  const handleEdit = (task) => {
    setText(task.text);
    setDate(task.date);
    setEditId(task.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleDone = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  return (
    <div className="relative min-h-[100dvh] p-4 pb-24 max-w-md mx-auto">
      <Link
        to="/"
        className="fixed top-4 right-4 w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg flex items-center justify-center text-gray-500 hover:text-gray-700 transition z-50"
        title="Обратно към началната страница"
      >
        ←
      </Link>

      <h2 className="text-xl font italic text-center mb-6">Твоите задачи</h2>

      <div className="text-xs text-gray-500 flex flex-wrap justify-center gap-2 mb-4">
        <span className="px-2 py-1 rounded bg-gray-100">Днес</span>
        <span className="px-2 py-1 rounded bg-rose-100">Утре</span>
        <span className="px-2 py-1 rounded bg-yellow-100">Скоро</span>
        <span className="px-2 py-1 rounded bg-blue-100">По-нататък</span>
        <span className="px-2 py-1 rounded bg-green-100">✔️ Готово</span>
      </div>

      {Object.entries(groupedTasks).map(([key, list]) => (
        <div key={key} className="mb-6">
          {list.map((task) => (
            <div
              key={task.id}
              className={`rounded-lg px-4 py-3 mb-2 text-sm ${getBgColor(
                task.date,
                task.done
              )}`}
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleDone(task.id)}
                />
                <div className="flex flex-col flex-1">
                  <span
                    className={`font-medium ${
                      task.done ? 'line-through text-green-600' : 'text-gray-800'
                    }`}
                  >
                    {task.text}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatDateText(task.date)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(task)}
                    className="text-xs text-blue-500 hover:underline"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="text-xs text-red-500 hover:underline"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}

      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 bg-purple-500 text-white rounded-full w-12 h-12 text-xl shadow-lg hover:bg-purple-600 z-50"
        title="Нова задача"
      >
        ＋
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-[90%] max-w-md animate-in fade-in scale-95 duration-200">
            <h3 className="text-center text-lg font-semibold mb-4">
              {editId ? 'Редактирай задача' : 'Нова задача'}
            </h3>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Въведи задача..."
              className="w-full border rounded-lg px-3 py-2 text-sm mb-3"
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowModal(false);
                  setText('');
                  setDate('');
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