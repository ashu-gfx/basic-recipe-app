import { nanoid } from 'nanoid'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { recipecontext } from '../Context/RecipeCotext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Create = () => {
  const navigate = useNavigate()
  const { data, setdata } = useContext(recipecontext)

  const { register, handleSubmit, reset } = useForm()

  const SubmitHandler = newrecipedata => {
    newrecipedata.id = nanoid()

    // console.log(newrecipedata)

    const copydata = [...data]
    copydata.push(newrecipedata)
    setdata(copydata)  
    localStorage.setItem('recipes', JSON.stringify(copydata))

    // setdata([...data, newrecipedata])
    toast.success('New recipe created!')
    reset()
    navigate('/recipes')
  }

  return (
    <form onSubmit={handleSubmit(SubmitHandler)}>
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
        {...register('categories')}
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
      <button className='mt-5 block bg-gray-900 px-4 py-2 rounded '>
        Save Recipe
      </button>
    </form>
  )
}

export default Create
