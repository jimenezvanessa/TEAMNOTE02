import React, { useState } from 'react';
import type { Difficulty, Status, Task } from './types';

export function TaskModal({ isOpen, onClose, onSave }: { isOpen: boolean; onClose: () => void; onSave: (t: Omit<Task, 'ownerId'>) => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('Easy');
  const [status, setStatus] = useState<Status>('available');

  if (!isOpen) return null;

  const handleSave = () => {
    if (!title.trim()) return;
    const newTask: Omit<Task, 'ownerId'> = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      difficulty,
      status,
    };
    onSave(newTask);
    setTitle(''); setDescription(''); setDifficulty('Easy'); setStatus('available');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Add Task</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full rounded-md border px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full rounded-md border px-3 py-2" rows={3} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Difficulty</label>
              <select value={difficulty} onChange={(e) => setDifficulty(e.target.value as Difficulty)} className="mt-1 block w-full rounded-md border px-3 py-2">
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value as Status)} className="mt-1 block w-full rounded-md border px-3 py-2">
                <option value="available">Available</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-md bg-gray-200">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 rounded-md bg-amber-500 text-white">Save</button>
        </div>
      </div>
    </div>
  );
}

export default TaskModal;
