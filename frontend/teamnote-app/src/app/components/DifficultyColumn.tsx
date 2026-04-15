import { motion } from 'motion/react';
import type { Task, TaskDifficulty } from './StickyNote';
import { StickyNote } from './StickyNote';

interface DifficultyColumnProps {
  difficulty: TaskDifficulty;
  tasks: Task[];
  isLeader: boolean;
  currentUser: string;
  onPickTask: (taskId: string) => void;
  onMarkDone: (taskId: string) => void;
  onOpenBlockerDialog: (taskId: string) => void;
}

export function DifficultyColumn({
  difficulty,
  tasks,
  isLeader,
  currentUser,
  onPickTask,
  onMarkDone,
  onOpenBlockerDialog,
}: DifficultyColumnProps) {
  const difficultyConfig = {
    easy: {
      title: 'Easy',
      icon: '🟢',
    },
    medium: {
      title: 'Medium',
      icon: '🟡',
    },
    hard: {
      title: 'Hard',
      icon: '🔴',
    },
  };

  const config = difficultyConfig[difficulty];
  const filteredTasks = tasks.filter((task) => task.difficulty === difficulty);

  // Generate random rotations for sticky notes
  const getRotation = (index: number) => {
    const rotations = [-3, -2, -1, 0, 1, 2, 3];
    return rotations[index % rotations.length];
  };

  return (
    <div className="flex-1 min-w-[280px] p-6">
      <div className="flex items-center gap-3 mb-6 pb-3 border-b-4 border-amber-800/30">
        <span className="text-3xl drop-shadow">{config.icon}</span>
        <h2 className="text-2xl font-bold text-amber-900" style={{ fontFamily: 'Comic Sans MS, cursive', textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}>
          {config.title}
        </h2>
      </div>

      <div className="space-y-6 min-h-[400px] flex flex-col items-center">
        {filteredTasks.length === 0 ? (
          <div className="text-center text-amber-800 text-sm py-12 opacity-60" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            No tasks yet
          </div>
        ) : (
          filteredTasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <StickyNote
                task={task}
                isLeader={isLeader}
                currentUser={currentUser}
                onPickTask={onPickTask}
                onMarkDone={onMarkDone}
                onOpenBlockerDialog={onOpenBlockerDialog}
                rotation={getRotation(index)}
              />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}