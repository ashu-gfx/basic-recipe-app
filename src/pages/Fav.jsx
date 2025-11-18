import { useEffect } from 'react'
import RecipeCard from '../Components/RecipeCard'

const Fav = () => {
  const fav = JSON.parse(localStorage.getItem('fav') ) || []
  const renderrecipes = fav.map(recipe => (
    <RecipeCard key={recipe.id} recipe={recipe}></RecipeCard>
  ))

  // useEffect(() => {
  //   localStorage.clear()
  // })
  return (
    <div className='flex flex-wrap'>
      {fav.length > 0 ? renderrecipes : 'No favorites found!'}
    </div>
  )
}

export default Fav
