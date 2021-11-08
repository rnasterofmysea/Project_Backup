import React from "react"

const ProgressItem = ({todos}) => {

    const renderTodos = todos.map(todos =>{
        return(
          <div style={{margin: "100px"}}>{todos.text}</div>
        );
      }
        )

    return(
        <div className = "timedo-template"> 
            <div style= {{display: 'flex', flexDirection: 'row'}}>
            {renderTodos}</div>
        </div>
        );
}

export default ProgressItem