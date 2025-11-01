import { useEffect, useState, FormEvent } from 'react';
import { useRouter } from 'next/router';

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
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  };

  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const res = await fetch(`${API_URL}/tasks`, {
      headers: getAuthHeaders(),
    });

    if (res.ok) {
      const data = await res.json();
      setTasks(data);
    } else if (res.status === 401) {
      localStorage.removeItem('token');
      router.push('/login');
    } else {
      console.error('Failed to fetch tasks');
    }

    setLoading(false);
  };

  useEffect(() => {
    const fetchAndSet = async () => {
      await fetchTasks();
    };

    fetchAndSet();
  });

const handleCreateTask = async (e: FormEvent) => {
  e.preventDefault();

  console.log('Creating task with:', { title, description });

  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ title, description }),
  });

  const responseText = await response.text();
  console.log('Create task response status:', response.status);
  console.log('Create task response body:', responseText);

  if (response.ok) {
    setTitle('');
    setDescription('');
    fetchTasks(); // обновляем список
  } else {
    console.error('❌ Failed to create task');
  }
};


  const handleDelete = async (taskId: number) => {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (response.ok) {
      fetchTasks();
    } else {
      console.error('Failed to delete task');
    }
  };

  const startEdit = (task: Task) => {
    setEditTaskId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description || '');
  };

  const handleUpdate = async () => {
    if (editTaskId === null) return;

    const response = await fetch(`${API_URL}/tasks/${editTaskId}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
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
    <div className="min-h-screen bg-gray-100 p-8 text-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">📋 Task List</h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            localStorage.removeItem('token');
            router.push('/login');
          }}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          🚪 Logout
        </button>
      </div>


      {/* Create Task */}
      <form onSubmit={handleCreateTask} className="mb-6">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="block mb-2 p-2 border border-gray-300 rounded w-full bg-white text-gray-900"
        />
        <textarea
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="block mb-2 p-2 border border-gray-300 rounded w-full bg-white text-gray-900"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ Add Task
        </button>
      </form>

      {/* Task List */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li
              key={task.id}
              className="mb-4 bg-white p-4 rounded shadow-md text-gray-900"
            >
              {editTaskId === task.id ? (
                <>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="block mb-2 p-2 border border-gray-300 rounded w-full bg-white text-gray-900"
                  />
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="block mb-2 p-2 border border-gray-300 rounded w-full bg-white text-gray-900"
                  />
                  <button
                    onClick={handleUpdate}
                    className="bg-green-600 text-white px-3 py-1 rounded mr-2"
                  >
                    💾 Save
                  </button>
                  <button
                    onClick={() => setEditTaskId(null)}
                    className="bg-gray-400 text-white px-3 py-1 rounded"
                  >
                    ❌ Cancel
                  </button>
                </>
              ) : (
                <>
                  <strong>{task.title}</strong> – {task.status}
                  <br />
                  {task.description && <em>{task.description}</em>}
                  <br />
                  <small>🕓 {new Date(task.createdAt).toLocaleString()}</small>
                  <br />
                  <button
                    onClick={() => startEdit(task)}
                    className="text-blue-600 mr-4"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="text-red-600"
                  >
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
