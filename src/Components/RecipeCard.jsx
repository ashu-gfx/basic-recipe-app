import React from 'react'
import { Link } from 'react-router-dom'

const RecipeCard = props => {
  const { id, image, title, description, chef } = props.recipe

  return (
    <Link className='duration-150 hover:scale-101 mr-3 mb-3 block w-[23vw] rounded overflow-hidden' to={`/recipes/details/${id}`}>
      <img className='object-cover w-full h-[20vh]' src={image} alt='' />
      <h1 className='mt-2 font-black px-2'>{title}</h1>
      <small className='px-2 text-red-200'>{chef}</small>
      <p className='px-2 pb-3 '>
        {description ? description.slice(0, 100) : 'No description available'}
        {description && <small className='text-blue-400'> more</small>}
      </p>
    </Link>
  )
}

export default RecipeCard
