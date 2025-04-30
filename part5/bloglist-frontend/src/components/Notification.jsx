const Notification = ({ status, text }) => {
  if (!status) {
    return <></>
  }

  let colour
  switch (status) {
  case 'error':
    colour = 'red'
    break
  case 'success':
    colour = 'green'
    break
  }

  return (
    <div
      style={{
        border: `2px solid ${colour}`,
        background: '#ddd',
        padding: '2px',
        margin: '10px 0',
      }}
    >
      {text}
    </div>
  )
}

export default Notification
