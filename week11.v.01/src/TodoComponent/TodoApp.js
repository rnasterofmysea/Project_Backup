import React, { useEffect, useState } from "react";
import Template from "./Template";
import TodoList from "./TodoList";
import TodoInsert from "./TodoInsert";
import axios from "axios";
let nextId = 4;

const TodoApp = ({date}) => {
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [insertToggle, setInsertToggle] = useState(false);
  const [todos, setTodos] = useState([
    {
      id: 0,
      text:"default",
      checked: true
    }
  ]);
  useEffect(() => {
    axios.get('http://localhost:3001/bringTodoData')
      .then(response => {
        console.log(response)
      });
  }, []);

  useEffect(()=>{
    getTodo()
    },[])

  async function getTodo() {
    try {
      // 데이터를 받아오는 동안 시간이 소요됨으로 await 로 대기
      const res = await axios.get('http://localhost:3001/bringTodoData')
      // 받아온 데이터로 다음 작업을 진행하기 위해 await 로 대기
      // 받아온 데이터를 map 해주어 rowData 별로 _inputData 선언
      const _inputData = res.data.map((RowDataPacket) => ({
        id: RowDataPacket.todo_id,
        text: RowDataPacket.todo_title,
        checked : RowDataPacket.todo_checked
      })
      )
      // 선언된 _inputData 를 최초 선언한 inputData 에 concat 으로 추가
      setTodos(todos.concat(_inputData))
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
        id: nextId,
        text,
        checked: false
      };

      async function addTodo(e) {
        e.preventDefault();
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
    addTodo(e)
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
        date = {date}>
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