import { useState, useImperativeHandle, forwardRef } from 'react'

const Togglable = forwardRef((props, refs) => {
  const [isVisible, setVisibility] = useState(false)

  const toggleVisibility = () => {
    setVisibility(!isVisible)
  }

  const display = {
    display: isVisible ? 'block' : 'none',
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  const label = props.buttonLabel === 'new blog' ? 'new blog' : (isVisible ? 'hide' : 'view')

  return (
    <>
      <button onClick={toggleVisibility}>{label}</button>
      <div style={display} className="details">{props.children}</div>
    </>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable
