import { useEffect, useState, FormEvent } from 'react';

interface Task {
  id: number;
  title: string;
  description?: string;
  status: string;
  createdAt: string;
  userId: number;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // Create form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Edit form state
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  // 🔄 Fetch tasks
  const fetchTasks = () => {
    fetch('http://localhost:3000/tasks')
    // fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ➕ Create task
  const handleCreateTask = async (e: FormEvent) => {
    e.preventDefault();

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        userId: 1, // 🔐 temporary, will be replaced with authenticated user
      }),
    });

    if (response.ok) {
      setTitle('');
      setDescription('');
      fetchTasks(); // refresh list
    } else {
      console.error('Failed to create task');
    }
  };

  // 🗑 Delete task
  const handleDelete = async (taskId: number) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      fetchTasks();
    } else {
      console.error('Failed to delete task');
    }
  };

  // ✏️ Start edit mode
  const startEdit = (task: Task) => {
    setEditTaskId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description || '');
  };

  // 💾 Save updated task
  const handleUpdate = async () => {
    if (editTaskId === null) return;
    console.log('Updating task:', editTaskId, editTitle, editDescription); // 🔍 Debug

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${editTaskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: editTitle,
        description: editDescription,
      }),
    });

    if (response.ok) {
      setEditTaskId(null);
      setEditTitle('');
      setEditDescription('');
      fetchTasks();
    } else {
      console.error('Failed to update task');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>📋 Task List</h1>

      {/* 🔧 Create Task Form */}
      <form onSubmit={handleCreateTask} style={{ marginBottom: '2rem' }}>
        <div>
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <textarea
            placeholder="Task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">➕ Add Task</button>
      </form>

      {/* 📋 Task List */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id} style={{ marginBottom: '1rem' }}>
              {editTaskId === task.id ? (
                <>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  />
                  <button onClick={handleUpdate}>💾 Save</button>
                  <button onClick={() => setEditTaskId(null)}>❌ Cancel</button>
                </>
              ) : (
                <>
                  <strong>{task.title}</strong> – {task.status}
                  <br />
                  {task.description && <em>{task.description}</em>}
                  <br />
                  <small>🕓 {new Date(task.createdAt).toLocaleString()}</small>
                  <br />
                  <button onClick={() => startEdit(task)}>✏️ Edit</button>
                  <button onClick={() => handleDelete(task.id)} style={{ color: 'red' }}>
                    🗑 Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
