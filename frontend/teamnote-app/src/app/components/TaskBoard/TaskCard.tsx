import React from 'react';
import type { Task, Status } from './types';

const statusColors: Record<Status, string> = {
  'available': 'bg-gray-200 text-gray-800',
  'in-progress': 'bg-blue-200 text-blue-800',
  'done': 'bg-green-200 text-green-800',
};

export function TaskCard({ task, onMarkInProgress, onMarkDone, onDelete }: { task: Task; onMarkInProgress: (id: string) => void; onMarkDone: (id: string) => void; onDelete: (id: string) => void }) {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-4 w-full">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="font-semibold text-amber-900">{task.title}</h4>
          <p className="text-sm text-amber-800 mt-1">{task.description || <span className="text-amber-500/60">No description</span>}</p>
        </div>
        <div className="text-right">
          <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${statusColors[task.status]}`}>{task.status.replace('-', ' ')}</div>
        </div>
      </div>

      <div className="mt-3 flex gap-2 justify-end">
        {task.status !== 'in-progress' && task.status !== 'done' && (
          <button onClick={() => onMarkInProgress(task.id)} className="px-3 py-1 text-sm rounded bg-blue-100 text-blue-800">Mark In Progress</button>
        )}
        {task.status !== 'done' && (
          <button onClick={() => onMarkDone(task.id)} className="px-3 py-1 text-sm rounded bg-green-100 text-green-800">Mark Done</button>
        )}
        <button onClick={() => onDelete(task.id)} className="px-3 py-1 text-sm rounded bg-red-100 text-red-800">Delete</button>
      </div>
    </div>
  );
}

export default TaskCard;
