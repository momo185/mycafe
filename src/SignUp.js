import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';  // Import useNavigate and Link

const SignUpForm = ({ users, setUsers }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  const navigate = useNavigate();  // Use navigate for programmatic navigation

  const handleRegister = (e) => {
    e.preventDefault();

    // Ensure 'users' is an array
    if (!Array.isArray(users)) {
      console.error("Error: users is not an array.");
      return;
    }

    const userExists = users.some((user) => user.email === email);
    if (userExists) {
      alert('User already exists');
      return;
    }

    // Create new user object
    const newUser = { name, email, password };
    const updatedUsers = [...users, newUser];

    // Update state and localStorage
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    console.log("User registered:", newUser);  // Log the newly added user
    console.log("Updated users:", updatedUsers);  // Log updated users list

    // Redirect to login page after signup
    navigate('/login');
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default SignUpForm;
