const Notification = ({message, isError}) => {
  

  if (! message){
    return (
     <></>
    )
  }

  return (
    <div className={isError ? 'error': 'success'}>
      {message}
    </div>
  )

}

export default Notification;