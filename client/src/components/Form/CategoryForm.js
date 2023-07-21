import React from 'react'

const CategoryForm = ({handleSubmit,value,setValue}) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='flex mt-3'>
        <input
        type='text'
        className='border border-gray-300 bg-gray-900 rounded-lg px-4 py-2 w-1/2 mr-3'
        placeholder='Enter New Category'
        value={value}
        onChange={(e)=>setValue(e.target.value)}
        />
        <button type="submit" className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
    Create Category
  </button>
        </div>
      </form>
    </>
  )
}

export default CategoryForm
 