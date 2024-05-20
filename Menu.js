
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FaShoppingCart } from "react-icons/fa";
import Catbuttons from './Catbuttons';
import Form from 'react-bootstrap/Form';
import Catoptions from './Catoptions';

function Menu() {
    const [food,setFood]=useState([])
    const [cart,setCart]=useState([])
    const [flag,setFlag]=useState(false)
    useEffect(()=>{
           displayprods() 
           cartitems()
           setFood([...food.sort((a,b)=>{return a.price-b.price})])           
    },[])
    function displayprods()
    {
      fetch("http://localhost:3000/fooditems").then((resp1)=>{
        resp1.json().then((resp2)=>{
            console.log(resp2)
            setFood(resp2)
        })
    })
    }
    function cartitems()
    {
      fetch("http://localhost:3000/cart").then((resp1)=>{
        resp1.json().then((resp2)=>{
            console.log(resp2)
            setCart(resp2)
        })
    })
    }
   function sortfood(e)
   {
    if(e.target.value==="LowToHigh")
    {
      setFood([...food.sort((a,b)=>{return a.price-b.price})])
    }
    if(e.target.value==="HighToLow")
    {
      setFood([...food.sort((a,b)=>{return b.price-a.price})])
    }
   }
   
    function filtercategory(categ)
    {
     const newfood=food.filter((c1)=>c1.category===categ)
      setFood(newfood)
    }
    function addtocart(cartitem)
    { 
      if(cart.some((item)=>item.id===cartitem.id))
      {
        alert("Item already added in the cart")
      }
      else
      {
          fetch("http://localhost:3000/cart",{
            method:"post",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify(cartitem)
        }).then((resp1)=>{
          resp1.json().then((resp2)=>{
            console.log(resp2)
            displayprods()
          })
        })
        
      } 
    }
  
  return (
    <div className='container-fluid'>
        <h1 className='text-center mt-4' style={{fontFamily:"brush script mt"}}>Our Menu</h1>
        <div className='row'>
            <div className='col-3 bg-dark text-white fs-5'>
              <h4 className='mt-5 mb-4'>Get Products By Price</h4>
          <Form.Select aria-label="Default select example"
          onChange={(e)=>sortfood(e)}>
            <option>Select Price Option</option>
            <option value="LowToHigh">Ascending</option>
            <option value="HighToLow">Descending</option>
          </Form.Select>
          <h4 className='mt-5 mb-4'>Get Products By Category</h4>
          
          <Catoptions food={food} filtercategory={filtercategory} displayprods={displayprods}/>
          
            </div>
              <div className='col-9'>
                <Catbuttons food={food} filtercategory={filtercategory} displayprods={displayprods}/>
              
                  <div className='row row-cols-1 row-cols-md-3 g-3 mt-5'>
                   {
                    food.map((fd,i)=>{
                        return (
                            <div className='col' key={i}>
<Card style={{ width: '17rem' }} className='h-100 border-0 bg-dark text-white rounded-4'>
    <div className='h-75 bg-light p-4 rounded-top-4' style={{borderBottomLeftRadius: "50px"}}>
      <Card.Img variant="top" src={fd.image} className='img-fluid h-100 w-50 mx-auto d-block'/>
      </div>
      <Card.Body>
        <Card.Title>{fd.name}</Card.Title>
        <Card.Text>
        Veniam debitis quaerat officiis quasi cupiditate quo, quisquam velit, magnam voluptatem repellendus sed eaque
        </Card.Text>
        <div className='d-flex justify-content-between'>
            <p>${fd.price}</p>
        <Button variant="warning" className='text-white rounded-circle fs-5' onClick={()=>addtocart(fd)}><FaShoppingCart /></Button>
        </div>
        
      </Card.Body>
    </Card>
                            </div>
                        )                        
                    })
                  
                   }
                  </div>
              </div>
        </div>
    </div>
  )
  
}
export default Menu
