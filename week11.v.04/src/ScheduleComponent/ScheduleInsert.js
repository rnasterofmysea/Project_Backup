import React, { useState } from "react";
import axios from "axios";

const ScheduleInsert = ({
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

    async function addData(e){
        e.preventDefault();
        const res = await axios("http://localhost:3001/addData",{
            method: "POST",
            data : inputs,
            hearders: new Headers()
	    })
        if(res.data){
            alert("데이터 추가");
            return window.location.reload();
        }
    }

    const onSubmit = e => {
        e.preventDefault();
        onInsertToggle();    
        addData(e);
}
    //onChange 구현해서 리스트 값 수정
    return(
        <>
            <form onSubmit={onSubmit}>

            <div>
                <input name = "job" type="text" value={job} placeholder="알바명" onChange={onChange}></input>
                시작시간: <input name = "start" type="datetime-local" value={start} onChange={onChange}></input>
                종료시간: <input name = "end" type="datetime-local" value={end} onChange={onChange}></input> 
                <button type = "submit" value="추가"> 추가</button>
            </div>
            </form>
        </>
    );
}

export default ScheduleInsert;