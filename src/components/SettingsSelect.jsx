/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react'

// eslint-disable-next-line react/prop-types
const SettingsSelect = ({label, id, state, setState, options}) => {

  return (
    <label htmlFor={id} className='flex flex-col gap-1 border-b border-t dark:border-gray-700 first:border-t-0 last:border-b-0 py-4'>
        {label}

        <select 
            name={id} 
            id={id} 
            className='bg-transparent text-gray-600 dark:text-gray-300 mx-4 py-1 outline-none focus:outline-none' 
            value={state} 
            onChange={(e) => setState(e.target.value)} 
        >
            {options.map((option, index) => (
                <option key={`${id}${index}`} className='text-[#1a1a1a]' value={option.toLowerCase()}>{option}</option>
            ))}
    </select>
    </label>
  )
}

export default SettingsSelect