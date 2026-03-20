import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const token = user?.token;

  const fetchTasks = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  // Redirect if not logged in
  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      fetchTasks();
    }
  }, [navigate, token, fetchTasks]);

  // Add / Update Task
  const createTask = async (e) => {
    e.preventDefault();

    try {
      if (editingTask) {
        await axios.put(
          `http://localhost:5000/api/tasks/${editingTask._id}`,
          { title, description },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEditingTask(null);
      } else {
        await axios.post(
          "http://localhost:5000/api/tasks",
          { title, description },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Task
  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  // Toggle Complete
  const toggleStatus = async (task) => {
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${task._id}`,
        {
          status:
            task.status === "completed" ? "pending" : "completed",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  // Edit Task
  const editTask = (task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-color)" }}>
      <Navbar />
      
      <div className="container">
        <h2 className="dashboard-header">My Tasks</h2>

        <div className="task-form-card">
          <form onSubmit={createTask} className="task-form-row">
            <div className="form-group" style={{ flex: 2 }}>
              <label style={{fontWeight: 600}}>Task Title</label>
              <input
                type="text"
                placeholder="What needs to be done?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={{border: '2px solid #000', borderRadius: '8px', padding: '0.8rem'}}
              />
            </div>
            <div className="form-group" style={{ flex: 3 }}>
              <label style={{fontWeight: 600}}>Description</label>
              <input
                type="text"
                placeholder="Details..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{border: '2px solid #000', borderRadius: '8px', padding: '0.8rem'}}
              />
            </div>
            <button type="submit" className="btn-retro" style={{ width: "auto" }}>
              {editingTask ? "Update Task" : "Add Task"}
            </button>
          </form>
        </div>

        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task._id} className={`task-card ${task.status === "completed" ? "completed-task" : ""}`}>
              <div className="task-content">
                <div className="task-title">
                  <span className="task-title-text">{task.title}</span>
                  <span className={`badge ${task.status === 'completed' ? 'badge-completed' : 'badge-pending'}`}>
                    {task.status}
                  </span>
                </div>
                <p className="task-desc">{task.description}</p>
                <div className="task-actions">
                  <button 
                    onClick={() => toggleStatus(task)}
                    className={`btn-sm ${task.status === 'completed' ? 'btn-secondary' : 'btn-success'}`}
                  >
                    {task.status === "completed" ? "Mark Pending" : "Complete"}
                  </button>
                  <button 
                    onClick={() => editTask(task)}
                    className="btn-secondary btn-sm"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => deleteTask(task._id)}
                    className="btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
          {tasks.length === 0 && (
            <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-secondary)", backgroundColor: "var(--surface-color)", borderRadius: "12px", border: "1px dashed var(--border-color)" }}>
              <p>No tasks yet. Create one above to get started!</p>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;