import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ username, onLogout }) => {
  const [complaints, setComplaints] = useState([]);
  const [description, setDescription] = useState('');
  const [editId, setEditId] = useState(null);
  const [editDescription, setEditDescription] = useState('');
  const [editStatus, setEditStatus] = useState('Open');
  const navigate = useNavigate();
  const role = localStorage.getItem('role') || 'user';

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      let url = `http://localhost:5000/complaints?username=${username}`;
      if (role === 'admin') url += '&role=admin';
      const res = await axios.get(url);
      setComplaints(res.data);
    } catch (err) {
      setComplaints([]);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/complaints', { username, description });
    setDescription('');
    fetchComplaints();
  };

  const handleUpdate = async (id) => {
    await axios.put(`http://localhost:5000/complaints/${id}`, { description: editDescription, status: editStatus });
    setEditId(null);
    fetchComplaints();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/complaints/${id}`);
    fetchComplaints();
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <>
      <div className="background-shapes">
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
      </div>

      <div className="dashboard">
        <div className="dashboard-card">
          <h2>
            Welcome, {username}! {role === 'admin' && <span>(Admin)</span>}
          </h2>

          <h3>
            {role === 'admin' ? 'All Community Complaints (Admin View)' : 'Your Complaints'}
          </h3>

          <form onSubmit={handleCreate} className='dashboard-layout'>
            <div className="input-group">
              <input
                type="text"
                placeholder="Describe your complaint..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="submit-btn">Submit Complaint</button>
          </form>

          {complaints.length === 0 ? (
            <p style={{ textAlign: 'center', margin: '40px', color: '#666' }}>No complaints yet.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map(c => (
                  <tr key={c.id}>
                    <td data-label="ID">{c.id}</td>
                    <td data-label="Username">{c.username}</td>
                    <td data-label="Description">
                      {editId === c.id ? (
                        <input value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
                      ) : c.description}
                    </td>
                    <td data-label="Status">
                      {editId === c.id ? (
                        <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)}>
                          <option>Open</option>
                          <option>Resolved</option>
                        </select>
                      ) : c.status}
                    </td>
                    <td data-label="Created At">{c.created_at}</td>
                    <td data-label="Actions">
                      {editId === c.id ? (
                        <button onClick={() => handleUpdate(c.id)}>Save</button>
                      ) : (
                        <button onClick={() => { setEditId(c.id); setEditDescription(c.description); setEditStatus(c.status); }}>
                          Edit
                        </button>
                      )}
                      <button onClick={() => handleDelete(c.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;