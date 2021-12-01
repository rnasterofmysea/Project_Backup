import React , {useState} from "react";
import ScheduleApp from "../ScheduleComponent/ScheduleApp";
import TimeTreeApp from "../TimeTreeComponent/TimTreeApp";
import TodoApp from "../TodoComponent/TodoApp";

const Main =() => {
    const [date, setDate] = useState(Date);
    const [event , setEvent] = useState({
      job: "",
      start: "",
      end: ""
    });
    console.log(event.start)
  
    return (
      <>
        <div className="title_body1">
          <ScheduleApp setDate = {setDate} setEvent ={setEvent} />
        </div>
        <div className="body2">
          <TodoApp date = {date}/>
          <TimeTreeApp event = {event}/>
        </div>
      </>
    );
}

export default Main;