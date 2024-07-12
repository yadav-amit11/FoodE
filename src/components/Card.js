import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart,useCart } from './ContextReducer';
//import { useSearchParams } from 'react-router-dom';

export default function Card(props){  
    let dispatch=useDispatchCart();
    let data=useCart();
    const priceRef=useRef();
	let options=props.options;    
    let priceOptions=Object.keys(options);
    const [qty,setQty]=useState(1)
    const[size,setSize]=useState(1)
    
    //let foodItem=props.foodItems;
    
    const handleAddToCart = async()=>{
    await dispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name,price: props.finalPrice,qty:qty,size:size})
    console.log(data);
     

    }
 
    let finalPrice=qty*parseInt(options[size]);
    useEffect(() => {
        setSize(priceRef.current.value)

    },[])

    return (
        <div>


            <div>

                <div className="card mt-2" style={{ width: 18+ 'em', maxHeight: 360 + 'px' }}>

                  <img src={props.foodItem.img} className='card-img-top'  alt='xyz' style={{height:"140px"}} />

                    <div className="card-body">

                        <h5 className="card-title">{props.foodItem.name}</h5>

                        {/* <p className="card-text">Some quick example text to .</p> */}

                        <div className='container w-100'>

                            <select className='m-2 h-100  bg-success rounded 'onChange={(e)=>setQty(e.target.value)}>

                                {Array.from(Array(10), (e, i) => {

                                    return (

                                        <option key={i + 1} value={i + 1}>{i + 1} </option>
                                    )

                                })}
                                
                                </select>

                            <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
                               {priceOptions.map((data)=>{
                                return <option key={data} value={data}>{data}</option>
                               })}
                            </select>
                            <div className='d-inline h-100 fs-5'>
                               Rs{finalPrice}/- 
                            </div>
                            <hr>
                            </hr>
                            <button className={`btn btn-success justify-center ms-2`} onClick={handleAddToCart}>Add to Cart </button>


                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}