import React from "react";
import ScheduleApp from "./ScheduleComponent/ScheduleApp";
import TimeTreeApp from "./TimeTreeComponent/TimTreeApp";
import TodoApp from "./TodoComponent/TodoApp";
const App = () => {


  return (
    <>
      <div className="title_body1">
        <ScheduleApp />
      </div>
      <div className="body2">
        <TodoApp />
        <TimeTreeApp />
      </div>
    </>
  );

}
export default App;