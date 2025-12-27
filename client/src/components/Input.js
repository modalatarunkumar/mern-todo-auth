import React from 'react'

const Input = ({name, value,type="text",label, onChange, ...props}) => {
  return (
    <div>
        <label htmlFor={name} >{label}</label>
        <input type={type} 
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        style={{marginLeft: "10px", padding: "5px"}}
        className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
        {...props}/>
    </div>
  )
}

export default Input