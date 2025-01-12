import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import './FoodDisplay.css'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({category}) => {
    const { foodList, loading, error } = useContext(StoreContext);
    // const {food_list} = useContext(StoreContext)
  return (
    <div className='food-display' id='food-display'>
        <h2>Top dishes near you</h2>
        <div className='food-display-list'>
            {
                foodList.map((item,index)=>{
                    if(category==='All' || category===item.category)
                        return <FoodItem key={index} id={item.id} name={item.name} price= {item.price} description ={item.description} image = {item.image}/>
            })
        }
        </div>

      
    </div>
  )
}

export default FoodDisplay
