import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import Footer from '../../components/Footer/Footer';
import RestaurantDisplay from '../../components/RestaurantDisplay.jsx/RestaurantDisplay';

const Home = () => {
   const [category, setCategory] = useState('All');
  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory = {setCategory}/>
      <RestaurantDisplay />
      <FoodDisplay category={category}/>
    </div>
  )
}

export default Home
