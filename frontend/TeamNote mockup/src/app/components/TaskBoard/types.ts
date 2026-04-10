export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type Status = 'available' | 'in-progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  status: Status;
  ownerId: string; // id of the account that owns this task
}
