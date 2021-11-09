import React , {useState} from "react";
import ScheduleApp from "./ScheduleComponent/ScheduleApp";
import TimeTreeApp from "./TimeTreeComponent/TimTreeApp";
import TodoApp from "./TodoComponent/TodoApp";
const App = () => {

  const today = new Date();
  const [date, setDate] = useState(Date);

  return (
    <>
      <div className="title_body1">
        <ScheduleApp setDate = {setDate}/>
      </div>
      <div className="body2">
        <TodoApp date = {date}/>
        <TimeTreeApp/>
      </div>
    </>
  );

}
export default App;