import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { recipecontext } from '../Context/RecipeCotext'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const SingleRecipe = () => {
  // const { data } = useContext(recipecontext)
  const { data, setdata } = useContext(recipecontext)
  const params = useParams()
  // console.log(data, params.id)
  const recipe = data.find(recipe => params.id == recipe.id)
  // console.log(recipe)

  const navigate = useNavigate()

  const { register, handleSubmit } = useForm({
    // for autofilling the exiting data
    defaultValues: {
      title: recipe?.title,
      chef: recipe?.chef,
      description: recipe?.description,
      image: recipe?.image,
      ingredients: recipe?.ingredients,
      instructions: recipe?.instructions,
      category: recipe?.category
    }
  })

  const UpdateHandler = newrecipedata => {
    const recipeindex = data.findIndex(recipe => params.id == recipe.id)
    console.log(recipeindex)
    const copydata = [...data]
    copydata[recipeindex] = { ...copydata[recipeindex], ...newrecipedata }
    setdata(copydata)
    localStorage.setItem('recipes', JSON.stringify(copydata))
    toast.success('Recipe Updated')
  }

  const DeleteHandler = () => {
    const filterdata = data.filter(r => r.id != params.id)
    // data other than r.id may got added to our array
    // data excluding a pertcular recipe will be added back to our array
    setdata(filterdata)
    localStorage.setItem('recipes', JSON.stringify(filterdata))
    toast.success('recipe deleted!')
    navigate('/recipes')

    const updated = favorites.filter(f => f.id !== recipe?.id)
    setFavorites(updated)
    localStorage.setItem('fav', JSON.stringify(updated))
    console.log('Removed from favorites:', updated)
  }

  // ✅ use state for favorites
  const [favorites, setFavorites] = React.useState([])

  useEffect(
    () => {
      console.log('SingleRecipe.jsx mounted')

      // ✅ load favorites on mount
      const stored = JSON.parse(localStorage.getItem('fav')) || []
      setFavorites(stored)

      return () => {
        console.log('SingleRecipe.jsx Unmounted')
      }
    },
    []
    // this square brackets stops rerendering of our page
  )

  const FavHandler = () => {
    if (!favorites.find(f => f.id === recipe.id)) {
      const updated = [...favorites, recipe]
      setFavorites(updated)
      localStorage.setItem('fav', JSON.stringify(updated))
      console.log('Added to favorites:', updated)
    }
  }

  const UnFavHandler = () => {
    const updated = favorites.filter(f => f.id !== recipe?.id)
    setFavorites(updated)
    localStorage.setItem('fav', JSON.stringify(updated))
    console.log('Removed from favorites:', updated)
  }

  return recipe ? (
    <div className='w-full flex'>
      <div className='relative left w-1/2 p-10'>
        {favorites.find(f => f.id === recipe.id) ? (
          <i
            onClick={UnFavHandler}
            className='right-[5%] absolute text-3xl text-red-400 ri-heart-fill'
          ></i>
        ) : (
          <i
            onClick={FavHandler}
            className='right-[5%] absolute text-3xl text-red-400 ri-heart-line'
          ></i>
        )}

        <h1 className='text-5xl font-black'>{recipe.title}</h1>
        <img className='h-[20vh]' src={recipe.image} alt='' />
        <h1 className='text-red-400'> {recipe.chef}</h1>
        <p className='opacity-30'>{recipe.description}</p>
      </div>

      <form className='right  w-1/2 p-2' onSubmit={handleSubmit(UpdateHandler)}>
        <input
          className='block border-b outline-0 p-2'
          {...register('image')}
          type='url'
          placeholder='Enter image URL'
        />
        <small className='text-red-400'>as</small>
        <input
          className='block border-b outline-0 p-2'
          {...register('title')}
          type='text'
          placeholder='Recipe Title'
        />
        <small className='text-red-400'>as</small>

        <input
          className='block border-b outline-0 p-2'
          {...register('chef')}
          type='text'
          placeholder='Chef Name'
        />

        <textarea
          className='block border-b outline-0 p-2'
          {...register('description')}
          placeholder='start from here'
        />
        <small className='text-red-400'>as</small>

        <textarea
          className='block border-b outline-0 p-2'
          {...register('ingredients')}
          placeholder='write ingredients saprated by comma'
        />
        <small className='text-red-400'>as</small>

        <textarea
          className='block border-b outline-0 p-2'
          {...register('instructions')}
          placeholder='write ingredients saprated by comma'
        />
        <small className='text-red-400'>as</small>

        <select
          className='block border-b outline-0 p-2 '
          {...register('category')}
        >
          <option className='bg-gray-700' value='breakfast'>
            breakfast
          </option>
          <option className='bg-gray-700' value='lunch'>
            Lunch
          </option>
          <option className='bg-gray-700' value='supper'>
            Supper
          </option>
          <option className='bg-gray-700' value='dinner'>
            Dinner
          </option>
        </select>
        <button className='mt-5 block bg-blue-500 px-4 py-2 rounded '>
          Update Recipe
        </button>
        <button
          onClick={DeleteHandler}
          className='mt-5 block bg-red-500 px-4 py-2 rounded '
        >
          Delete Recipe
        </button>
      </form>
    </div>
  ) : (
    'Loading...'
  )
}

export default SingleRecipe
