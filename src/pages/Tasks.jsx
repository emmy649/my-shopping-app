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
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }

    const uncompletedTomorrowTasks = tasks.filter(
      (t) => isSameDay(new Date(t.date), tomorrow) && !t.done
    );

    if (uncompletedTomorrowTasks.length > 0 && Notification.permission === 'granted') {
      const lines = uncompletedTomorrowTasks.map((t) => `• ${t.text}`).join('\n');

      new Notification('Задачи за утре:', {
        body: lines,
      });
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
      const newTask = {
        id: Date.now(),
        text,
        date,
        done: false,
      };
      setTasks([newTask, ...tasks]);
    }

    setText('');
    setDate('');
    setShowModal(false);
  };

  const toggleDone = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
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

  const renderTaskGroup = (title, taskList) => (
    <div className="mb-6">
      {taskList.length > 0 && (
        <>
          <h3 className="text-sm text-gray-600 mb-2">{title}</h3>
          <ul className="flex flex-col gap-2">
            {taskList.map((task) => (
              <li
                key={task.id}
                className={`flex flex-col gap-1 rounded-lg px-3 py-2 shadow-sm ${getBgColor(
                  task.date,
                  task.done
                )}`}
              >
                <div className="text-xs text-gray-500">{formatDateText(task.date)}</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={task.done}
                      onChange={() => toggleDone(task.id)}
                    />
                    <span
                      className={`text-sm ${
                        task.done ? 'line-through text-gray-400' : ''
                      }`}
                    >
                      {task.text}
                    </span>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <button
                      onClick={() => handleEdit(task)}
                      className="text-gray-500 hover:text-gray-700"
                      title="Редактирай"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="text-red-400 hover:text-red-600"
                      title="Изтрий"
                    >
                      Х
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );

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

      <h2 className="text-xl font italic text-center mb-4">Какво имаш да правиш...</h2>
         <div className="flex flex-wrap justify-center gap-4 mb-4 text-xs text-gray-600">
            <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-gray-100"></span>
              За днес
         </div>
            <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-rose-100"></span>
             За утре
         </div>
            <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-yellow-100"></span>
              След 2–3 дни
         </div>
            <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-blue-100"></span>
              По-нататък
         </div>
            <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-green-100"></span>
               Изпълнена
        </div>
      </div>


      {renderTaskGroup('За днес', groupedTasks.today)}
      {renderTaskGroup('За утре', groupedTasks.tomorrow)}
      {renderTaskGroup('Предстоящи', groupedTasks.future)}

      {/* Плаващ бутон */}
      <button
        onClick={() => {
          setText('');
          setDate('');
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
              {editId ? 'Редакция на задача' : 'Нова задача'}
            </h3>

            <input
              type="text"
              placeholder="Опиши задачата..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm mb-4"
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
