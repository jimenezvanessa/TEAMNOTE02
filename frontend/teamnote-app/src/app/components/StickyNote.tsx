import { motion } from 'motion/react';
import { Clock, AlertCircle, CheckCircle2, User } from 'lucide-react';
import { useState } from 'react';

export type TaskStatus = 'available' | 'in-progress' | 'done';
export type TaskDifficulty = 'easy' | 'medium' | 'hard';

export interface Task {
  id: string;
  title: string;
  description: string;
  difficulty: TaskDifficulty;
  status: TaskStatus;
  assignedTo?: string;
  createdBy: string;
  blockers?: string;
}

interface StickyNoteProps {
  task: Task;
  isLeader: boolean;
  onPickTask?: (taskId: string) => void;
  onMarkDone?: (taskId: string) => void;
  onOpenBlockerDialog?: (taskId: string) => void;
  currentUser: string;
  rotation?: number;
}

export function StickyNote({ task, isLeader, onPickTask, onMarkDone, onOpenBlockerDialog, currentUser, rotation = 0 }: StickyNoteProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const difficultyColors = {
    easy: 'bg-green-300',
    medium: 'bg-yellow-300',
    hard: 'bg-pink-300',
  };

  const statusIcons = {
    available: null,
    'in-progress': <Clock className="size-4" />,
    done: <CheckCircle2 className="size-4 text-green-800" />,
  };

  const canPickTask = !isLeader && task.status === 'available';
  const canMarkDone = task.status === 'in-progress' && task.assignedTo === currentUser;
  const isAssignedToMe = task.assignedTo === currentUser;

  return (
    <motion.div
      className="relative"
      style={{ perspective: '1000px' }}
      initial={{ opacity: 0, scale: 0.8, rotate: rotation }}
      animate={{ opacity: 1, scale: 1, rotate: rotation }}
      whileHover={{ scale: 1.05, rotate: 0, zIndex: 50 }}
      transition={{ duration: 0.2 }}
    >
      {/* Push Pin */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
        <div className="relative">
          <div className="size-6 rounded-full bg-gradient-to-br from-red-500 to-red-700 shadow-lg" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 size-1.5 bg-gray-300 rounded-full" />
        </div>
      </div>

      <motion.div
        className="relative"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ transformStyle: 'preserve-3d' }}
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
      >
        {/* Front of sticky note */}
        <div
          className={`${difficultyColors[task.difficulty]} rounded-sm p-6 shadow-[4px_4px_8px_rgba(0,0,0,0.2)] min-h-[240px] w-[280px] backface-hidden relative`}
          style={{ 
            backfaceVisibility: 'hidden',
            boxShadow: '4px 4px 12px rgba(0,0,0,0.15), inset 0 0 60px rgba(255,255,255,0.1)'
          }}
        >
          {/* Sticky note texture lines */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="h-full w-full" style={{ 
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 24px, rgba(0,0,0,0.3) 24px, rgba(0,0,0,0.3) 25px)',
            }} />
          </div>

          <div className="relative">
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-handwriting text-xl text-gray-900 pr-2 leading-tight" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                {task.title}
              </h3>
              {statusIcons[task.status]}
            </div>
            
            <p className="text-base text-gray-800 mb-4 line-clamp-5" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              {task.description}
            </p>
            
            <div className="absolute bottom-0 left-0 right-0">
              {task.assignedTo && (
                <div className="flex items-center gap-1.5 text-sm text-gray-700 mb-2">
                  <User className="size-4" />
                  <span style={{ fontFamily: 'Comic Sans MS, cursive' }}>{task.assignedTo}</span>
                  {isAssignedToMe && <span className="text-blue-700 font-medium">(You)</span>}
                </div>
              )}
              
              {task.status === 'done' && (
                <div className="text-sm text-green-800 font-medium flex items-center gap-1">
                  <CheckCircle2 className="size-4" />
                  <span style={{ fontFamily: 'Comic Sans MS, cursive' }}>Completed</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Back of sticky note */}
        <div
          className={`${difficultyColors[task.difficulty]} rounded-sm p-6 shadow-[4px_4px_8px_rgba(0,0,0,0.2)] min-h-[240px] w-[280px] absolute top-0 left-0 backface-hidden`}
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            boxShadow: '4px 4px 12px rgba(0,0,0,0.15), inset 0 0 60px rgba(255,255,255,0.1)'
          }}
        >
          {/* Sticky note texture lines */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="h-full w-full" style={{ 
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 24px, rgba(0,0,0,0.3) 24px, rgba(0,0,0,0.3) 25px)',
            }} />
          </div>

          <div className="flex flex-col h-full relative">
            <h4 className="font-semibold text-gray-900 mb-3 text-base" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              Task Details
            </h4>
            <p className="text-sm text-gray-800 mb-4 flex-1" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              {task.description}
            </p>
            
            <div className="space-y-2">
              {canPickTask && onPickTask && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPickTask(task.id);
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2.5 px-4 rounded shadow-md transition-colors font-medium"
                >
                  Pick This Task
                </button>
              )}
              
              {canMarkDone && onOpenBlockerDialog && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenBlockerDialog(task.id);
                  }}
                  className="w-full bg-green-600 hover:bg-green-700 text-white text-sm py-2.5 px-4 rounded shadow-md transition-colors font-medium"
                >
                  Mark as Done
                </button>
              )}

              {task.status === 'in-progress' && !isAssignedToMe && (
                <div className="text-sm text-gray-700 flex items-center gap-1.5" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                  <AlertCircle className="size-4" />
                  <span>In progress by {task.assignedTo}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}