import React, { useState } from 'react';
import axios from 'axios';

function CreateUserForm() {
  // Define state variables to store the form input values
  const [formData, setFormData] = useState({
    name: '',
    username: '',
  });

  // Function to handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    // You can do something with the form data here, such as sending it to a server
    const { name, username } = formData;
    const data = {
      name,
      username
    };
    try {
      await axios.post('/api/users/new', data);

    } catch (error) {
      console.log("error", error)
    }
  };

  return (
    <div>
      <h1>React Form Example</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateUserForm;
