import React, { useState } from "react";
import axios from "axios";
import { MdAddCircle } from "react-icons/md";
const ScheduleInsert = ({
    onInsertToggle,
    onChangeToggle,
    user_id }) => {

    const [inputs, setInput] = useState({
        user_id: user_id,
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
        onChangeToggle();
        addData(e);
    }

    //onChange 구현해서 리스트 값 수정
    return (
        <>
            <div className="ScheduleBackground" onClick={onInsertToggle}></div>
            <form className="ScheduleInsertForm" onSubmit={onSubmit}>

                <div>
                    아르바이트<br />
                    <input name="job" className="underline" type="text" value={job} placeholder="알바명" onChange={onChange}></input><br />
                    시작시간<br />
                    <input name="start" className="underline" type="datetime-local" value={start} onChange={onChange}></input><br />
                    종료시간<br />
                    <input name="end" className="underline" type="datetime-local" value={end} onChange={onChange}></input><br />
                    <button className="Schedule-addButton" type="submit" value="추가"><MdAddCircle /></button>
                </div>
            </form>
        </>
    );
}

export default ScheduleInsert;