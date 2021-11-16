import React, { useState } from "react";
import axios from "axios";

const ScheduleInsert = ({
    onInsertToggle }) => {

    const [inputs, setInput] = useState({
        job: '',
        start: '',
        end: ''
    })
    const { job, start, end } = inputs;

    const onChange = (e) => {
        const { value, name } = e.target;
        setInput({
            ...inputs,
            [name]: value
        });
    };

    async function addData(e) {
        e.preventDefault();
        const res = await axios("http://localhost:3001/addData", {
            method: "POST",
            data: inputs,
            hearders: new Headers()
        })
        if (res.data) {
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
    return (
        <>      
        <div className="ScheduleBackground" onClick={onInsertToggle}></div>
            <form className = "ScheduleInsertForm" onSubmit={onSubmit}>

                <div>
                    아르바이트<br/>
                    <input name="job" type="text" value={job} placeholder="알바명" onChange={onChange}></input><br/>
                    시작시간<br/>
                    <input name="start" type="datetime-local" value={start} onChange={onChange}></input><br/>
                    종료시간<br/>
                    <input name="end" type="datetime-local" value={end} onChange={onChange}></input><br/>
                    <button type="submit" value="추가"> 추가</button>
                </div>
            </form>
        </>
    );
}

export default ScheduleInsert;