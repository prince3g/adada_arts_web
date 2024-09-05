import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const MessageEditor = ({ value, onChange }) => {
  // Local state for message
  const [message, setMessage] = useState(value);

  useEffect(() => {
    // Update local state when prop value changes
    setMessage(value);
  }, [value]);

  const handleChange = (newValue) => {
    if (newValue === undefined || newValue === null) {
      console.warn('Received undefined or null value in handleChange');
      return;
    }
    setMessage(newValue);
    if (onChange) {
      onChange(newValue); // Notify parent component of the change
    }
  };

  return (
    <div className='couse-descpt-Box'>
      <ReactQuill
        theme="snow"
        value={message}
        onChange={handleChange}
        placeholder="Type here..."
        modules={{
          toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link', 'image'],
            ['clean']
          ]
        }}
      />
    </div>
  );
};

export default MessageEditor;
