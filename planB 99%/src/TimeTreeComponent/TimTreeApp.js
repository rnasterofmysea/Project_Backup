import './TimeTreeApp.css';
import React, { useEffect, useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import Progress from './component/Progress';
import axios from 'axios';

const GlobalStyle = createGlobalStyle`
body {
  background: #e9ecef;
}
`;


const TimeTreeApp = ({
  event }) => {

  // 날짜 정보
  const [TimelineInsertToggle, setTimelineInsertToggle] = useState(true);
  const [TimelineEditToggle, setTimelineEditToggle] = useState(true);


  const onTimelineInsertToggle = () => {
    setTimelineInsertToggle(prev => !prev);
  }
  const onTimelineEditToggle = () => {
    setTimelineEditToggle(prev => !prev);
  }
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "defualt",
      text: "defualt",
      time: "",
      checked: true
    }
  ]);

  const [selectedTodos, setSelectedTodos] = useState(
    {
      id: 0,
      title: "default",
      text: "default",
      time: "",
      checked: true
    });

  const [inputs, setInputs] = useState({
    id: 0,
    job: "",
    title: "",
    text: "",
    time: "",
    checked: true
  })

  const [del,setDel] = useState();

  async function getTimeline() {
    try {
      // 데이터를 받아오는 동안 시간이 소요됨으로 await 로 대기
      const res = await axios.get('http://localhost:3001/bringtimelineData'
        , {
          params: {
            job: event.job,
            start: event.start,
            end: event.end
          }
        })
      // 받아온 데이터로 다음 작업을 진행하기 위해 await 로 대기
      // 받아온 데이터를 map 해주어 rowData 별로 _inputData 선언
      //현재는 DB에서 모든 데이터를 가져와서 보여준다.
      // >>>>>>>> 특정 데이터를 가져와야한다.
      // >>>>>>>> 날짜 데이터를 req 로 보내어 res 으로 처리된 값을 받는다. ...HOW?
      console.log(res.data)
      const _inputData = res.data.map((RowDataPacket) => ({
        id: RowDataPacket.timeline_id,
        title: RowDataPacket.timeline_title,
        text: RowDataPacket.timeline_text,
        time: RowDataPacket.timeline_time,
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

  async function addData(e) {
    e.preventDefault();
    const res = await axios("http://localhost:3001/addTimelineData", {
      method: "POST",
      data: inputs,
      hearders: new Headers()
    })
    if (res.data) {
      alert("데이터 추가");
      return window.location.reload();
    }
    else {
      console.log("errrrrrrrrrrrrrrrrrrrror");
    }
  }

  async function editData() {
    console.log("이벤트 중계");
    const res = await axios("http://localhost:3001/editTimelineData", {
      method: "POST",
      data: inputs,
      hearders: new Headers()
    })
    if (res.data) {
      console.log("데이터 수정");
      return window.location.reload();
    }
    else {
      console.log("데이터 수정 실패");
    }
  }

  async function deleteData(e) {
    e.preventDefault();
    console.log("이벤트 중계");
    const res = await axios("http://localhost:3001/deleteTimelineData", {
      method: "POST",
      data: { id: del },
      hearders: new Headers()
    })
    if (res.data) {
      console.log("데이터 삭제");
      return window.location.reload();
    }
    else {
      console.log("데이터 삭제 실패");
    }
  }
  const onInsert = e => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
      job: event.job,
      checked: 1,

    });
  };

  const onEdit = e => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
      job: event.job,
      checked: 1,
      id: selectedTodos.id
    });
  };

  const onSubmitInsert = e => {
    addData(e);
    onTimelineInsertToggle();
  }


  const onSubmitEdit = e => {
    editData(e);
    onTimelineEditToggle();
  }

  const TimelineDelete = e => {
    deleteData(e)
  }
  useEffect(() => {
    getTimeline();
  }, [event])
  // 작업리스트

  //버튼 구현

  //리스트 출력 부분

  const titleList = todos && todos.map(todo => {
    return (
      <div className="titleList" key={todo.id}>
        <div style={{ cursor: "pointer" }} onClick={() => { setSelectedTodos(todo); setDel(todo.id)}}>
          {todo.title}
        </div>
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

        <div className="bodynRBbanner">


          <div className="TimeTreeBody">

            <div className="context">
              <Progress todos={todos} event={event}
                setSelectedTodos={setSelectedTodos} />
            </div>

            <div className="How-Template">

              {(TimelineInsertToggle && TimelineEditToggle) && <div>
                <div className="How-head">
                  <h2>{selectedTodos.title} <button> 완료</button></h2>
                  {selectedTodos.time}
                </div>

                <div className="How-body">
                  {selectedTodos.text}
                </div>
                <div className="How-bottom">
                  <input type="button" value="추가" onClick={onTimelineInsertToggle}></input>
                  <input type="button" value="수정" onClick={onTimelineEditToggle}></input>
                  <input type="button" value="삭제" onClick={TimelineDelete}></input>
                </div>
              </div>
              }
              {!TimelineInsertToggle && <div>
                <form onSubmit={onSubmitInsert}>
                  <div className="How-head">
                    <h2>해야할 일:<input type="text" placeholder="업무" name="title" onChange={onInsert}></input></h2>
                    시간: <input type="time" name="time" onChange={onInsert}></input>
                  </div>

                  <textarea name="text" className="How-body" style={{ resize: 'none' }} onChange={onInsert}></textarea>

                  <div className="How-bottom">
                    <button type="submit">확인</button>
                    <input type="button" value="추가" onClick={onTimelineInsertToggle}></input>
                    <input type="button" value="수정" onClick={onTimelineEditToggle}></input>
                    <input type="button" value="삭제" onClick={TimelineDelete}></input>
                  </div>
                </form>
              </div>}

              {!TimelineEditToggle && <div>
                <form onSubmit={onSubmitEdit}>
                  <div className="How-head">
                    <h2>해야할 일:<input type="text" placeholder="업무" name="title" onChange={onEdit}></input></h2>
                    시간: <input type="time" name="time" onChange={onEdit}></input>
                  </div>

                  <textarea name="text" className="How-body" style={{ resize: 'none' }} onChange={onEdit}></textarea>
                  <div className="How-bottom">
                    <button type="submit">확인</button>
                    <input type="button" value="추가" onClick={onTimelineInsertToggle}></input>
                    <input type="button" value="수정" onClick={onTimelineEditToggle}></input>
                    <input type="button" value="삭제" onClick={TimelineDelete}></input>
                  </div>
                </form>
              </div>}

            </div>

          </div>

          <div className="RBbanner">
            {titleList}
          </div>

        </div>
      </div>
    </>
  );
}
export default TimeTreeApp;