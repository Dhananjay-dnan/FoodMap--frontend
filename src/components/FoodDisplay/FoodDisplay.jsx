import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import './FoodDisplay.css'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({category}) => {
    const { foodList, loading, error } = useContext(StoreContext);
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error loading food items: {error.message}</div>;
    }

    const validFoodList = Array.isArray(foodList) ? foodList : [];
    // const {food_list} = useContext(StoreContext)
  return (
    <div className='food-display' id='food-display'>
        <h2>Order your favourites</h2>
        <div className='food-display-list'>
            {
                validFoodList.map((item,index)=>{
                    if(category==='All' || category===item.category)
                        return <FoodItem key={index} id={item.id} name={item.name} price= {item.price} description ={item.description} image = {item.image}/>
            })
        }
        </div>

      
    </div>
  )
}

export default FoodDisplay
