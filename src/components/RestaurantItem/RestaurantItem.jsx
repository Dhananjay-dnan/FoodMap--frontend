import React from 'react'
import { assets } from '../../assets/assets'
import './RestaurantItem.css'
import { Link } from 'react-router-dom'

const RestaurantItem = ({id,name,location,rating,image}) => {
  return (
    <Link to ='/restaurant'><div className='restaurant-item'>
        <div className='restaurant-item-image-container'>
            <img className= 'restaurant-item-image' src={assets.food_1} alt='' />
        </div>
        <div className="restaurant-item-info">
            <div className="restaurant-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} />
                
            </div>
            <p className="restaurant-item-address">{location}</p>
        </div>
    </div>
    </Link>
  )
}

export default RestaurantItem
