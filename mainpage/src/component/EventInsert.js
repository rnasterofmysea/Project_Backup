import React, { useState } from "react";

const EventInsert = ({
    events,
    onInsertToggle,
    onInsertEvent}) => {

    const [input,setInput] = useState({
        job: '',
        date:'',
        start:'',
        end:''
    })

    const onChange =e =>{
        const {value,name} = e.target;
        setInput({
            ...inputs,
            [name]: value
        });
    };

    const onSubmit = e => {
        e.preventDefault();
        onInsertToggle();
        onInsertEvent(value);
        
    }
    //onChange 구현해서 리스트 값 수정
    return(
        <>
            <form onSubmit={onSubmit}>

            <div>
                <input name = "job" type="text" value={job} placeholder="알바명" onChange={onChange}></input>
                시작시간: <input name = "start" type="date" value={date} onChange={onChange}></input>
                <input name = "start" type ="time" value={time} onChange={onChange}></input>
                종료시간: <input name = "end" type="date" value={date} onChange={onChange}></input>
                <input name = "end" type ="time" value={time} onChange={onChange}></input>
                
                <button type = "submit" value="확인"/>
            </div>
            </form>
        </>
    );
}

