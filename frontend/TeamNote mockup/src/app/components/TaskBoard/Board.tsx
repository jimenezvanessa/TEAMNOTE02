import React, { useState, useEffect } from 'react';
import type { Task as TTask, Difficulty } from './types';
import TaskModal from './TaskModal';
import TaskCard from './TaskCard';
import BoardHeader from './Header';
import type { Account } from '../LoginScreen';

export function Board({ user }: { user: Account }) {
  const [tasks, setTasks] = useState<TTask[]>(() => {
    try {
      const raw = localStorage.getItem('taskboard_tasks');
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('taskboard_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // addTask receives a task without ownerId from the modal; attach ownerId from current user
  const addTask = (t: Omit<TTask, 'ownerId'>) => {
    const withOwner: TTask = { ...t, ownerId: user.id };
    setTasks((s) => [withOwner, ...s]);
  };
  const markInProgress = (id: string) => setTasks((s) => s.map(t => t.id === id ? { ...t, status: 'in-progress' } : t));
  const markDone = (id: string) => setTasks((s) => s.map(t => t.id === id ? { ...t, status: 'done' } : t));
  const deleteTask = (id: string) => setTasks((s) => s.filter(t => t.id !== id));

  // Filter tasks to only those owned by the current user
  const userTasks = tasks.filter(t => t.ownerId === user.id);

  const byDifficulty = (d: Difficulty) => userTasks.filter(t => t.difficulty === d);

  return (
    <div>
      <BoardHeader user={user} />

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-amber-100">Task Board</h2>
        <div className="flex items-center gap-3">
            <div className="text-sm text-amber-200">Tasks: {userTasks.length}</div>
            <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 rounded bg-amber-500 text-amber-900 font-semibold">Add Task</button>
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(['Easy','Medium','Hard'] as const).map((d) => (
          <div key={d} className="bg-amber-100/90 rounded-lg p-4 shadow-inner border border-amber-300 min-h-[220px]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${d === 'Easy' ? 'bg-green-400' : d === 'Medium' ? 'bg-yellow-400' : 'bg-red-500'}`}></span>
                <h3 className="font-semibold text-amber-900">{d}</h3>
                <span className="text-xs text-amber-700">({byDifficulty(d).length})</span>
              </div>
            </div>

            <div className="space-y-3">
              {byDifficulty(d).length === 0 ? (
                <div className="text-center text-amber-800/70 py-12">No tasks yet</div>
              ) : (
                byDifficulty(d).map(task => (
                  <TaskCard key={task.id} task={task} onMarkInProgress={markInProgress} onMarkDone={markDone} onDelete={deleteTask} />
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={addTask} />
    </div>
  );
}

export default Board;
