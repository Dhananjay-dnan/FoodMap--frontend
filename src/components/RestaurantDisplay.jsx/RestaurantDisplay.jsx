import React, { useEffect, useState } from 'react'
import RestaurantItem from '../RestaurantItem/RestaurantItem'
import axiosInstance from '../../api/axiosInstance';
import './RestaurantDisplay.css'

const RestaurantDisplay = () => {
    const [restaurantList,setRestaurantList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    useEffect(() => {
        const fetchRestaurant = async () => {
          try {
            const response = await axiosInstance.get('/restaurants');
            setRestaurantList(response.data);
          } catch (err) {
            console.error('Error fetching Restaurants:', err);
            setError('Failed to load Restaurants.');
          } finally {
            setLoading(false);
          }
        };
    
        fetchRestaurant();
      }, []);
      if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error loading Restaurants: {error.message}</div>;
      }
      const validRestaurantList = Array.isArray(restaurantList) ? restaurantList : [];
  return (
    <div className='restaurant-display' id='restaurant-display'>
    <h2>Restaurants near you</h2>
    <div className='restaurant-display-list'>
        {
            validRestaurantList.map((item,index)=>{
                    return <RestaurantItem key={index} id={item.id} name={item.name} location= {item.address} rating = "4" image = {item.image}/>
        })
    }
    </div>

  
</div>
  )
}

export default RestaurantDisplay
