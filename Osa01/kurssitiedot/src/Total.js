import { useState } from "react";

const Total = ({ parts }) => {
   
  
    const total = parts.reduce((total, part) => {
        return total + part.exercises;
      }, 0);     
        

        


  return (
    <div>
      {}

      <p>Number of exercises {total}</p>
    </div>
  );
};

export default Total;
