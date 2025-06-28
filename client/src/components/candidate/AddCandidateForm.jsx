import React, { useState } from 'react';

const AddCandidateForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    party: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="mb-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
      <h3 className="text-lg font-medium mb-4">Add New Candidate</h3>
      <form onSubmit={handleSubmit}>
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
        </div>
        <div className="flex space-x-3">
          <button
            type="submit"
            className="btn-primary"
          >
            Add Candidate
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCandidateForm;