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
        {...props}/>
    </div>
  )
}

export default Input