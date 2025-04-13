const Notification = ({message, status}) => {
  
  if (! status){
    return (
     <></>
    )
  }

  return (
    <div className={status == 'error' ? 'error': 'success'}>
      {status}
      {message}
    </div>
  )

}

export default Notification;