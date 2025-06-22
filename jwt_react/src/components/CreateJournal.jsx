import React, { useState } from 'react';

const CreateJournal = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    if (!token) {
      alert('User not authenticated');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/journal/create-journal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content
        })
      });

      const result = await response.json();

      if (response.ok) {
        alert('Journal created successfully!');
        setFormData({ title: '', content: '' });
      } else {
        alert(result.message || 'Failed to create journal.');
      }

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('token');
        navigate('/login');
      }

    } catch (error) {
      console.error('Error creating journal:', error);
      alert('Something went wrong!');
    }
    console.log('Form Data:', formData);
    console.log('Token:', token);
    window.location.reload();
  };

  return (
    <div className="hero bg-gradient-to-r from-[#0061FF] to-[#60EFFF] min-h-screen flex items-center justify-center">
      <div className="form-portion bg-stone-100 sm:w-[80%] w-[90%] mx-auto rounded-xl shadow-md">
        <div className="heading mx-auto text-center">
          <h1 className="mx-auto mt-5 text-center sm:text-4xl text-3xl font-bold">Create Journals</h1>
        </div>
        <form className="p-5" onSubmit={handleSubmit}>
          <div className="md:p-5 p-1 sm:mt-1 mt-1">
            <div className="md:mt-1 mt-2">
              <label htmlFor="title" className="text-xl">Title:</label><br />
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Mention Title"
                className="w-full px-4 py-2 mt-1 rounded-xl border"
              />
            </div>

            <div className="mt-5">
              <label htmlFor="content" className="text-xl">Content:</label><br />
              <textarea
                name="content"
                rows="5"
                value={formData.content}
                onChange={handleChange}
                placeholder="Write your content here"
                className="w-full px-4 py-2 rounded-xl appearance-none text-heading text-md border"
                autoComplete="off"
                spellCheck="false"
              ></textarea>
            </div>
          </div>

          <div className="btn mt-2 w-full flex items-center">
            <button
              type="submit"
              className="px-4 py-2 mx-auto rounded-xl text-center text-xl bg-black text-white hover:text-black hover:bg-white hover:font-bold hover:shadow-xl transition"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJournal;
