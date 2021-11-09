import './TimeTreeApp.css';
import React, {useState} from 'react';
import {createGlobalStyle} from 'styled-components';
import Progress from './component/Progress';
import { TiTrash, TiPencil } from "react-icons/ti";

const GlobalStyle = createGlobalStyle`
body {
  background: #e9ecef;
}
`;


const TimeTreeApp = () => {
  // 날짜 정보
  var now = new Date();
  let nextId = 4;
  const startTime = new Date(now.getFullYear(),now.getMonth(),now.getDate(),0,0);
  const endTime = new Date(now.getFullYear(),now.getMonth(),now.getDate(),4,0);
  const totalTime = (endTime.getTime() - startTime.getTime())/1000/60;
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "할일 1",
      text:"a",
      time: new Date(now.getFullYear(),now.getMonth(),now.getDate(),1,0),
      checked: true
    },
    {
      id: 2,
      title: "할일 2",
      text:"b",
      time: new Date(now.getFullYear(),now.getMonth(),now.getDate(),2,0),
      checked: true
    },
  ]);

  const [selectedTodos, setSelectedTodos] = useState(    {
    id: 0,
    title: "해야할 일",
    text:"내용",
    time: new Date(now.getFullYear(),now.getMonth(),now.getDate(),0,0),
    checked: true
  });
  // 작업리스트

  //버튼 구현

  //리스트 출력 부분

  const titleList = todos && todos.map(todo => {
    return(
      <div className = "titleList">
        <div style={{cursor: "pointer"}} key ={todo.id} onClick = {()=>{setSelectedTodos(todo)}}>
            {todo.title}
        </div>
        <TiPencil /><TiTrash/>
      </div>
    );
})

  return (
    <>
    <GlobalStyle />
        <div className="TimeTreeTemplate">

          <div className="TimeTreeHead">
            <h1>알바명</h1>
            <h2> 시작시간 {startTime.getHours()}:{startTime.getMinutes()} - 
                  종료시간 {endTime.getHours()}:{endTime.getMinutes()}</h2>
          </div>

          <div className = "bodynRBbanner">


          <div className="TimeTreeBody">

              <div className="context">
              <Progress startTime={startTime} endTime = {endTime} totalTime = {totalTime} todos= {todos}/>
              </div>

            <div className = "How-Template">
                <div className="How-head">
                  <h2>{selectedTodos.title}</h2>
                  {selectedTodos.time.getHours()}시 
                  {selectedTodos.time.getMinutes()}분
                </div>
                
                <div className = "How-body">  
                  {selectedTodos.text}
                  </div>

                <div className = "How-bottom">
                  <input type="button" value="추가"></input>
                  <input type="button" value="수정"></input>
                  <input type="button" value="삭제"></input>
                </div>
            </div> 

          </div>

          <div className = "RBbanner">
            {titleList}
          </div>
          
          </div>
        </div>
       </>
  );
}
export default TimeTreeApp;