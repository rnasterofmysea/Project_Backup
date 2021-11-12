import './TimeTreeApp.css';
import React, {useState} from 'react';
import {createGlobalStyle} from 'styled-components';
import Progress from './component/Progress';
import { TiTrash, TiPencil } from "react-icons/ti";
import axios from 'axios';

const GlobalStyle = createGlobalStyle`
body {
  background: #e9ecef;
}
`;


const TimeTreeApp = ({
  event}) => {
  // 날짜 정보
  var now = new Date();
  let nextId = 4;
  const startTime = new Date(now.getFullYear(),now.getMonth(),now.getDate(),0,0);
  const endTime = new Date(now.getFullYear(),now.getMonth(),now.getDate(),4,0);
  const totalTime = (endTime.getTime() - startTime.getTime())/1000/60;


  async function getTimeline() {
    try {
      // 데이터를 받아오는 동안 시간이 소요됨으로 await 로 대기
      const res = await axios.get('http://localhost:3001/bringtimelineData'
      ,{
        params : {'jobData' : event.job}
      })
      // 받아온 데이터로 다음 작업을 진행하기 위해 await 로 대기
      // 받아온 데이터를 map 해주어 rowData 별로 _inputData 선언

      //현재는 DB에서 모든 데이터를 가져와서 보여준다.
      // >>>>>>>> 특정 데이터를 가져와야한다.
      // >>>>>>>> 날짜 데이터를 req 로 보내어 res 으로 처리된 값을 받는다. ...HOW?
      console.log(res.data)
      const _inputData = res.data.map((RowDataPacket) => ({
        id: RowDataPacket.timeline_id,
        time : RowDataPacket.timeline_date,
        text: RowDataPacket.timeline_title,
        checked: RowDataPacket.timeline_checked,
      })
      )
      // 선언된 _inputData 를 최초 선언한 inputData 에 concat 으로 추가
      setTodos(_inputData)
      console.log(todos);
    } catch (e) {
      console.error(e.message)
    }
  }

  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "할일 1",
      text:"a",
      time: new Date(now.getFullYear(),now.getMonth(),now.getDate(),1,0),
      checked: true
    }
  ]);

  const [selectedTodos, setSelectedTodos] = useState(
    {
    id: 0,
    title: "해야할 일",
    text:"내용",
    time: new Date(now.getFullYear(),now.getMonth(),now.getDate(),0,0),
    checked: true
  });
  // 작업리스트

  //버튼 구현

  //리스트 출력 부분
  const dateNumType = Date.parse(event.start)
  const dateDateType = new Date(dateNumType);

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


//시작시간 종료시간 fullcalendar 
  return (
    <>
    <GlobalStyle />
        <div className="TimeTreeTemplate">

          <div className="TimeTreeHead">
            <h1>알바명: {event.job}</h1>
            <h2> 시작시간 {event.start}- 
                  종료시간 {event.end}</h2>
          </div>

          <div className = "bodynRBbanner">


          <div className="TimeTreeBody">

              <div className="context">
              <Progress startTime={startTime} endTime = {endTime} totalTime = {totalTime} todos= {todos}
              setSelectedTodos = {setSelectedTodos}/>
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