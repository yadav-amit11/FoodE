import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';

export default function Navbar() {
  
  const [search, setSearch] = useState('');
  return (
    <div>
      
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
  <div className="container-fluid">
    <Link className="navbar-brand fs-1 fst-itallic" to="#">FoodE-The food app</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="#">Home</Link>
        </li>
    
        
      </ul>
         
         <div>

         <Link className="btn btn bg-white text-success mx-1" to="/login">Login</Link>
        <Link  className="btn btn bg-white text-success mx-1" to="/createuser">Sign Up</Link>
         </div>
      
          
        

      <div className="d-flex ">

  <div className="d-flex justify-content-end mr-12">
    <input className="form-control me-2" type="search" placeholder="I want to eat" aria-label="Search " value={search} onChange={(e)=>{
      setSearch(e.target.value)
    }}/>
    <button className="btn btn-outline-success text-black bg-white" type="submit">Search</button>
  </div>

</div>

     
    </div>
  </div>
</nav>
      
      </div>
  )
}
