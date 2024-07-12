import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch('http://localhost:5000/api/loginuser', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password }),
      });

      const json = await response.json();

      if (!json.success) {
        alert('Invalid credentials');
      } else {
        localStorage.setItem('authToken', json.authToken);
        console.log(localStorage.getItem('authToken'));
        navigate('/');
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      alert('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark ">
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-lg bg-light text-dark">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={credentials.email}
            onChange={onChange}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={credentials.password}
            onChange={onChange}
            id="exampleInputPassword1"
          />
        </div>

        <button type="submit" className="m-3 btn btn-primary" disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
        <Link to="/createuser" className="m-3 btn btn-danger rounded">
          New User
        </Link>
      </form>
    </div>
  );
}
