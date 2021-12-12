import React , {useState} from "react";
import ScheduleApp from "../ScheduleComponent/ScheduleApp";
import TimeTreeApp from "../TimeTreeComponent/TimTreeApp";
import TodoApp from "../TodoComponent/TodoApp";
import { useParams } from 'react-router';

const Main =() => {
  const params = useParams();
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
          <ScheduleApp setDate = {setDate} setEvent ={setEvent} user_id = {params.id} />
        </div>
        <div className="body2">
          <TodoApp date = {date}  user_id = {params.id}/>
          <TimeTreeApp event = {event}  user_id = {params.id} user_type = {params.type}/>
        </div>
      </>
    );
}

export default Main;