import React, { useState } from "react";
import axios from "axios";

const ScheduleInsert = ({
    editID,
    onScheduleToggle}) => {

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
        const res = await axios("http://localhost:3001/editData",{
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
        onScheduleToggle();    
        addData(e);
}
    //onChange 구현해서 리스트 값 수정
    return(
        <>
            <form onSubmit={onSubmit}>

            <div>
                <div>{editID}</div> <br />
                <input name = "job" type="text" value={job} placeholder="알바명" onChange={onChange}></input>
                시작시간: <input name = "start" type="date" value={start} onChange={onChange}></input>
                종료시간: <input name = "end" type="date" value={end} onChange={onChange}></input> 
                <button type = "submit" value="수정"> 수정</button>
            </div>
            </form>
        </>
    );
}

export default ScheduleInsert;