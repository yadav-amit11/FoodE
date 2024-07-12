import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Badge from 'react-bootstrap/Badge';
import Card from '../components/Card';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../Modal';
import Cart from './Cart';

export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [cartView, setCartView] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  }

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      response = await response.json();
      setFoodItem(response[0] || []);
      setFoodCat(response[1] || []);
    } catch (error) {
      console.error('Error loading data:', error.message);
      setFoodItem([]);
      setFoodCat([]);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
          <div className="container-fluid">
            <Link className="navbar-brand fs-1 fst-italic" to="#">FoodE-The food app</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto mb-2">
                <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
                </li>
                <li>
                  <div className="search-css">
                    <div className="mx-2 me-2">
                      <input className="form-control me-2" type="search" placeholder="I want a......." aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                  </div>
                </li>
                {localStorage.getItem("authToken") &&
                  <li className="nav-item">
                    <Link className="nav-link active fs-5" aria-current="page" to="/">My Orders</Link>
                  </li>
                }
              </ul>
              {!localStorage.getItem("authToken") ?
                <div className='d-flex'>
                  <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                  <Link className="btn bg-danger text-white mx-1" to="/createuser">Sign Up</Link>
                </div>
                :
                <div>
                  <div className='btn bg-white text-success mx-2' onClick={() => { setCartView(true) }}>
                    MyCart {"  "}<Badge pill bg="danger">2</Badge>
                  </div>
                  {cartView && <Modal onClose={() => setCartView(false)}><Cart /></Modal>}
                  <div className='btn bg-danger text-white mx-2' onClick={handleLogout}>Logout</div>
                </div>
              }
            </div>
          </div>
        </nav>
      </div>

      <div>
        <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel" style={{ maxHeight: '400px', overflow: 'hidden' }}>
          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="6000">
              <img src="https://source.unsplash.com/900x400/?Pizza" className="d-block w-100" style={{ height: '100%', filter: 'brightness(80%)' }} alt="Pizza" />
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <img src="https://source.unsplash.com/900x400/?Burger" className="d-block w-100" style={{ height: '100%', filter: 'brightness(80%)' }} alt="Burgers" />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/900x400/?cake" className="d-block w-100" style={{ height: '100%', filter: 'brightness(80%)' }} alt="Cake" />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className='container'>
        {foodCat.length !== 0 &&
          foodCat.map((data) => (
            <div className='row mb-3' key={data._id}>
              <div className="fs-8 m-6">
                <div style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                  {data.CategoryName}
                  <hr />
                </div>
                <div className='row'>
                  {foodItem.length !== 0 &&
                    foodItem
                      .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                      .map((filterItems) => (
                        <div key={filterItems._id} className='col-12 col-md-6 col-lg-4'>
                          <Card
                            foodItem={filterItems}
                            options={filterItems.options[0]}
                          />
                        </div>
                      ))}
                </div>
              </div>
            </div>
          ))}
      </div>

      <Footer />
    </div>
  );
}
