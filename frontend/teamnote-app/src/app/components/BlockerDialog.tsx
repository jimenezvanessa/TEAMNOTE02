import { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import type { Task } from './StickyNote';

interface BlockerDialogProps {
  isOpen: boolean;
  task: Task | null;
  taskId: string | null;
  onClose: () => void;
  onSubmitBlockers: (blockers: string) => void;
}

export function BlockerDialog({ isOpen, task, taskId, onClose, onSubmitBlockers }: BlockerDialogProps) {
  const [blockers, setBlockers] = useState('');
  const [noBlockers, setNoBlockers] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Only allow submission if there's text or "No Blockers" is checked
    if (blockers.trim() || noBlockers) {
      onSubmitBlockers(noBlockers ? 'No blockers reported' : blockers);
      setBlockers('');
      setNoBlockers(false);
      onClose();
    }
  };

  const handleClose = () => {
    setBlockers('');
    setNoBlockers(false);
    onClose();
  };

  const canSubmit = blockers.trim().length > 0 || noBlockers;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-2">
            <AlertTriangle className="size-5 text-amber-600" />
            <h2 className="text-xl font-semibold text-gray-900">Task Completion</h2>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-4">
              You're about to mark <span className="font-semibold text-gray-900">"{task?.title}"</span> as complete.
            </p>
          </div>

          <div>
            <label htmlFor="blockers" className="block text-sm font-medium text-gray-700 mb-2">
              Did you face any blockers during this task?
            </label>
            <textarea
              id="blockers"
              value={blockers}
              onChange={(e) => {
                setBlockers(e.target.value);
                if (e.target.value.trim()) {
                  setNoBlockers(false);
                }
              }}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Describe any issues, challenges, or blockers you encountered..."
              disabled={noBlockers}
            />
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="no-blockers"
                type="checkbox"
                checked={noBlockers}
                onChange={(e) => {
                  setNoBlockers(e.target.checked);
                  if (e.target.checked) {
                    setBlockers('');
                  }
                }}
                className="size-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </div>
            <div className="ml-3">
              <label htmlFor="no-blockers" className="text-sm font-medium text-gray-700 cursor-pointer">
                No Blockers
              </label>
              <p className="text-xs text-gray-500">I completed this task without any issues</p>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!canSubmit}
              className={`flex-1 px-4 py-2 rounded-md transition-colors ${
                canSubmit
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Mark as Done
            </button>
          </div>

          {!canSubmit && (
            <p className="text-xs text-amber-600 text-center">
              Please describe blockers or check "No Blockers" to continue
            </p>
          )}
        </form>
      </div>
    </div>
  );
}