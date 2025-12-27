import React from 'react'

function Button({
    type = "button",
    children,
    className="",
    disabled = false,
    ...props
}) {
  return (
    <button
    type={type}
    disabled={disabled}
    className={`w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition my-1 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    {...props}
    >{children}</button>
  )
}

export default Button;