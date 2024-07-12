import React, { useState } from 'react';
import { Link } from 'react-router-dom';


export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    phonenumber: "",
    geolocation: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        phoneno: credentials.phonenumber,
        location: credentials.geolocation
      })
    });
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Invalid creds");
    }
    // Handle the response here
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-lg bg-light text-dark" style={{ width: '600px' }}>
        <div className="mb-3">
          <label htmlFor="Name" className="form-label">Name</label>
          <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPhoneNo" className="form-label">Phone Number</label>
          <input type="text" className="form-control" name='phonenumber' value={credentials.phonenumber} onChange={onChange} />
          <div className="form-text">We'll never share your phone no. with anyone else.</div>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
        </div>

        <div className="mb-3">
          <label htmlFor="City" className="form-label">City</label>
          <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange} />
        </div>

        <button type="submit" className="m-3 btn btn-primary">Submit</button>
        <Link to="/login" className='m-3 btn btn-danger rounded'>Sign in</Link>
      </form>
    </div>
  );
}
