import React, { useEffect, useState } from "react";
import Template from "./Template";
import TodoList from "./TodoList";
import TodoInsert from "./TodoInsert";
import axios from "axios";
import moment from "moment";

const TodoApp = ({ date }) => {
  const [change, setChange] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [insertToggle, setInsertToggle] = useState(false);
  const [todos, setTodos] = useState([
    {
      id: 0,
      text: "default",
      checked: true,
      date: "2021-11-05"
    }
  ]);
  useEffect(() => {
    axios.get('http://localhost:3001/bringTodoData')
      .then(response => {
        console.log(response)
      });
  }, []);

  useEffect(() => {
    getTodo();
  }, [date])

  useEffect(() => {
    getTodo();
    console.log("값 변경")
  }, [change])

  const dateNumType = Date.parse(date)
  const dateDateType = new Date(dateNumType);

  async function getTodo() {
    try {
      // 데이터를 받아오는 동안 시간이 소요됨으로 await 로 대기
      const res = await axios.get('http://localhost:3001/bringTodoData'
        , {
          params: { 'Fdate': moment(new Date(Date.parse(date))).format("YYYY-MM-DD") }
        })
      // 받아온 데이터로 다음 작업을 진행하기 위해 await 로 대기
      // 받아온 데이터를 map 해주어 rowData 별로 _inputData 선언

      //현재는 DB에서 모든 데이터를 가져와서 보여준다.
      // >>>>>>>> 특정 데이터를 가져와야한다.
      // >>>>>>>> 날짜 데이터를 req 로 보내어 res 으로 처리된 값을 받는다. ...HOW?

      const _inputData = res.data.map((RowDataPacket) => ({
        id: RowDataPacket.todo_id,
        text: RowDataPacket.todo_title,
        checked: RowDataPacket.todo_checked,
        date: RowDataPacket.todo_date
      })
      )
      // 선언된 _inputData 를 최초 선언한 inputData 에 concat 으로 추가
      setTodos(_inputData)
    } catch (e) {
      console.error(e.message)
    }
  }


  const onInsertToggle = () => {
    if (selectedTodo) {
      setSelectedTodo(null);
    }
    setInsertToggle(prev => !prev);
  };

  const onInsertTodo = (text, e) => {
    if (text === "") {
      return alert("할 일을 입력해주세요.");
    } else {
      const todo = {
        date: moment(new Date(Date.parse(date))).format("YYYY-MM-DD"),
        text: text,
        checked: 0
      };

      async function addTodo() {
        const res = await axios("http://localhost:3001/addTodoData", {
          method: "POST",
          data: todo,
          hearders: new Headers()
        })
        if (res.data) {
          alert("데이터 추가");
          return window.location.reload();
        }
      }
      addTodo()
      setChange(prev => !prev);

      // setTodos(todos => todos.concat(todo)); 
      // todo_table 디비 연동 부분
    }
  };

  const onCheckToggle = (id) => {
    setTodos(todos =>
      todos.map(todo =>
        (todo.id === id ? { ...todo, checked: !todo.checked } : todo)))
  };

  const onChangeSelectedTodo = (todo) => {
    setSelectedTodo(todo);
  }

  const onRemove = id => {
    onInsertToggle();
    setTodos(todos => todos.filter(todo => todo.id !== id))

    async function deleteTodoData() {
      console.log("이벤트 중계");
      const res = await axios("http://localhost:3001/deleteTodoData", {
        method: "POST",
        data: {id : id},
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

    deleteTodoData()
    setChange(prev => !prev)
  };

  const onUpdate = (id, text) => {
    onInsertToggle();
    setTodos(todos =>
      todos.map(todo => (todo.id === id ? { ...todo, text } : todo))
    );
  };

  return (
    <>
      <Template
        todoLength={todos.length}
        onInsertToggle={onInsertToggle}
        date={date}>
        <TodoList
          todos={todos}
          onCheckToggle={onCheckToggle}
          onInsertToggle={onInsertToggle}
          onChangeSelectedTodo={onChangeSelectedTodo}
        />
        {insertToggle && (
          <TodoInsert
            selectedTodo={selectedTodo}
            onInsertToggle={onInsertToggle}
            onInsertTodo={onInsertTodo}
            onRemove={onRemove}
            onUpdate={onUpdate}
          />
        )}
      </Template>
    </>

  );
};

//분기점

export default TodoApp;