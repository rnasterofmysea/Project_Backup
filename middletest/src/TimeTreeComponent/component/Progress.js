import moment from "moment";
import React, { useEffect} from "react";

import { FaFlagCheckered } from "react-icons/fa"

const Progress = ({ setSelectedTodos, event, todos, value }) => {

  // 작업리스트

  var now = new Date();
  const splitTime = (value) =>{
    const time = value.split(":")
    const h = parseInt(time[0]) * 60;
    const m = parseInt(time[1]);
    return(
      h + m
    )
  }

  const startCreate = () => {
    return (
      createIcon
    )
  }

  const createIcon = (todos.map(todos => {
    console.log((splitTime(todos.time) - splitTime(event.start)))
    return (
      <button2
        style={{ left: `${(splitTime(todos.time) - splitTime(event.start))* 10}px`, position: "relative" }}
        key={todos.id}>
        <FaFlagCheckered style={{ width: "20px", height: "20px", color: !todos.checked && '#FA5353' ||
        todos.checked && "#20c997" }} onClick={() => setSelectedTodos(todos)}
        />
      </button2>
    );
  }
  )
  );
  
  var ingTime = (splitTime(moment(now).format("kk:mm:ss"))-splitTime(event.start))*10;

  useEffect(() => {
    startCreate();
  })

  return (
    <div className="progress-template">
      <div className="progress-div" style={{ width: splitTime(event.end) - splitTime(event.start) * 10 + "px" }}>
        <div className="progress" style={{ width: ingTime + "px" }}> </div>
      </div>
      {createIcon}
    </div>
    //Mouseover 기능 구현하여서 리스트 값 읽기
  );
}

//    <FaRegFlag onMouseOver={() =>{
//        alert("뭐야");
//        <ProgressItem todos = {todos}/>
//    }}/>

export default Progress