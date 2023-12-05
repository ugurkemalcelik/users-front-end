import React from 'react';

const DisplayMessage = ({state}) => {

    const {message,alert} = state;

  return (
    <div className={alert} style={{margin:"auto"}}>
        {            
          message
        }
    </div>
  )
}

export default DisplayMessage;
