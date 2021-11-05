import React, { useState } from "react";

const EventInsert = ({
    onInsertToggle}) => {

    const [inputs,setInput] = useState({
        job: '',
        start:'',
        end:''
    })
    const {job, start, end} = inputs;

    const onChange =(e) =>{
        const {value,name} = e.target;
        setInput({
            ...inputs,
            [name]: value
        });
    };

    const onSubmit = e => {
        e.preventDefault();
        onInsertToggle();
    }
    //onChange 구현해서 리스트 값 수정
    return(
        <>
            <form onSubmit={onSubmit}>

            <div>

                <input name = "job" type="text" value={job} placeholder="알바명" onChange={onChange}></input>
                시작시간: <input name = "start" type="date" value={start} onChange={onChange}></input>
                종료시간: <input name = "end" type="date" value={end} onChange={onChange}></input> 
                <button type = "submit" value="확인"/>
            </div>
            </form>
        </>
    );
}

export default EventInsert;