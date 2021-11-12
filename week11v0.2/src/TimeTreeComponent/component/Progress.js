import React, {useEffect, useState} from "react";

import {FaFlagCheckered} from "react-icons/fa"

const Progress =({startTime, endTime, totalTime, todos, setSelectedTodos}) =>{

    // 날짜 정보
  var now = new Date();

  const betaTime = new Date(now.getFullYear(),now.getMonth(),now.getDate(),3,0);
  // 프로그레스 바
  
  // 작업리스트

  const startCreate = () =>{
      return(
          createIcon
      )
  }
  
  const createIcon =(todos.map(todos => {
            return(
                    <button className = "progress-flag"
                    style={{left: `${(todos.time.getTime()-startTime.getTime())/1000/60*16.5}px`}}
                    key = {todos.id}>
                      <FaFlagCheckered style={{width: "20px", height: "20px"}} onClick={() => setSelectedTodos(todos)}
                      />
                    </button>
            ); //여기 해결 온클릭이되면
            //onClick 이 되면 해당 todo의 id가 how 로 넘어감
        }
    )
  );

  var ingTime = (betaTime.getTime()-startTime.getTime())/1000/60*16.5;

    useEffect(()=>{
        startCreate();
    })

    return(
      <div className="progress-template">
        <div className="progress-div" style={{width : totalTime * 16.5 +"px"}}>
          <div className="progress" style={{width: ingTime+"px"}}> </div>
        </div>
          {createIcon }
      </div>
      //Mouseover 기능 구현하여서 리스트 값 읽기
      );
    }
    
//    <FaRegFlag onMouseOver={() =>{
//        alert("뭐야");
//        <ProgressItem todos = {todos}/>
//    }}/>

export default Progress