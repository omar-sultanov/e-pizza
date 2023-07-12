import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
const FullPizza = () => {
    const [pizza, setPizza] = useState()
    const {id} = useParams()
    const navigate = useNavigate()
    useEffect(()=>{
        async function fetchPizza (){
            try {
                 const {data} = await axios.get('https://63f9462c473885d837cbf5ac.mockapi.io/items/'+id)
                 setPizza(data)
            } catch (error) {
                alert("Ощибка при получении пиццы!")
                navigate("/")
            }
        }
        fetchPizza()
    },[])

    if(!pizza){
        return 'Loading ...'
    }
  return (
    <div>
        <div className="container">
            <img src={pizza.imageUrl} alt="" />
            <h2>{pizza.title}</h2>
            <h4>{pizza.price} ₽</h4>
        </div>
    </div>
  )
}

export default FullPizza