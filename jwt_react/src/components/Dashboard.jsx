import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [journals, setJournals] = useState([]);
  const [editJournalId, setEditJournalId] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', content: '' });
  const token = localStorage.getItem('token');

  const fetchJournals = async () => {
    try {
      const response = await fetch('http://localhost:3000/journal/my-journals', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setJournals(data.journals || []);
      } else {
        console.error('Failed to fetch journals:', data.message);
      }

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('token');
        navigate('/login');
        }
    } catch (error) {
      console.error('Error fetching journals:', error);
    }
  };

  useEffect(() => {
    fetchJournals();
  }, []);

  const handleDelete = async (journalId) => {
    try {
      const response = await fetch(`http://localhost:3000/journal/delete/${journalId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        setJournals((prev) => prev.filter(j => j._id !== journalId));
      } else {
        const data = await response.json();
        alert(data.message || 'Delete failed');
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleEdit = (journal) => {
    setEditJournalId(journal._id);
    setEditForm({ title: journal.title, content: journal.content });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/journal/edit/${editJournalId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(editForm)
      });

      const result = await response.json();
      if (response.ok) {
        alert('Journal updated successfully');
        fetchJournals();
        setEditJournalId(null);
      } else {
        alert(result.message || 'Update failed');
      }
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  return (
    <div className="max-w-[720px] mx-auto p-4">

        {editJournalId && (
        <div className="mt-8 bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Edit Journal</h3>
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              name="title"
              value={editForm.title}
              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
              className="w-full p-2 mb-2 border rounded"
              placeholder="Title"
            />
            <textarea
              name="content"
              value={editForm.content}
              onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
              className="w-full p-2 mb-2 border rounded"
              placeholder="Content"
              rows="4"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => setEditJournalId(null)}
              className="ml-4 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Journal Entries</h3>
        </div>
        <table className="min-w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-sm font-medium text-gray-600">Date</th>
              <th className="p-4 text-sm font-medium text-gray-600">Title</th>
              <th className="p-4 text-sm font-medium text-gray-600">Content</th>
              <th className="p-4 text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[...journals].reverse().map((journal, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-4 text-sm text-gray-700">
                  {new Date(journal.date).toLocaleDateString()}
                </td>
                <td className="p-4 text-sm text-gray-700">{journal.title}</td>
                <td className="p-4 text-sm text-gray-700">{journal.content}</td>
                <td className="p-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(journal)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(journal._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    ❌ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
    </div>
  );
};

export default Dashboard;
