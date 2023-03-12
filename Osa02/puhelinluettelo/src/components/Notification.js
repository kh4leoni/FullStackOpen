

const Notification = ({ message, color }) => {
    
    if (message === null) return null

    return (
        <div>   
          
               <h1 className={color}>{message}</h1> 
          
        </div>
    );
}

export default Notification;
