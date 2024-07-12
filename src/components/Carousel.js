import React from 'react'

export default function Carousel() {
  return (
    <div>
      <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
    <div className="carousel-inner" id='carousel'>
      <div className="carousel-item active" data-bs-interval="10000">
      <img src="https://source.unsplash.com/900x700/?burgers" className="d-block w-100" style={{ filter: "brightness(80%)" }} alt="pizza" />
      <h5>First slide label</h5>
        <p>Some representative placeholder content for the first slide.</p>
      <div className="carousel-caption d-none d-md-block">
        <h5>First slide label</h5>
        <p>Some representative placeholder content for the first slide.</p>
      </div>
      </div>
      <div className="carousel-item" data-bs-interval="2000">
      <img src="https://source.unsplash.com/900x700/?Noodles" className="d-block w-100" style={{ filter: "brightness(80%)" }} alt="pizza" />
      </div>
      <div className="carousel-item">
      <img src="https://source.unsplash.com/900x700/?pizza" className="d-block w-100" style={{ filter: "brightness(80%)" }} alt="pizza" />
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
  </div></div>
  )
}
