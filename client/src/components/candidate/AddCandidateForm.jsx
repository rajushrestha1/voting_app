import React, { useState } from 'react';

const AddCandidateForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    party: '',
    position: 'President',
    image: null, // Add image to state
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Use FormData for image and text fields
  const data = new FormData();
data.append('name', formData.name);
data.append('party', formData.party);
data.append('position', formData.position);
data.append('image', formData.image); // ← correct

onSubmit(data); // ← parent sends this via axios/fetch with content-type multipart/form-data
  }

  return (
    <div className="mb-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
      <h3 className="text-lg font-medium mb-4">Add New Candidate</h3>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Candidate Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div>
            <label htmlFor="party" className="block text-sm font-medium text-gray-700 mb-1">
              Party
            </label>
            <input
              type="text"
              id="party"
              name="party"
              value={formData.party}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
              Position
            </label>
            <select
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value="President">President</option>
              <option value="Vice President">Vice President</option>
              <option value="Candidate">Candidate</option>
            </select>
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              Candidate Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
        </div>

        <div className="flex space-x-3">
          <button type="submit" className="btn-primary">
            Add Candidate
          </button>
          <button type="button" onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCandidateForm;
