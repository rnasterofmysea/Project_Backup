import React, { useState } from "react";
import axios from "axios";
import ScheduleDelete from "./ScheduleDelete";
import { TiPencil } from "react-icons/ti";
import "./ScheduleApp.css";
const ScheduleEdit = ({
    editID,
    onScheduleToggle,
    onChangeToggle
}) => {

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

    async function editData() {
        const res = await axios("http://localhost:3001/editData", {
            method: "POST",
            data: {
                id: editID,
                job: inputs.job,
                start: inputs.start,
                end: inputs.end
            },
            hearders: new Headers()
        })
        if (res.data) {
            alert("데이터 추가");
            return window.location.reload();
        }
       
    }

    const onSubmit = e => {
        e.preventDefault();
        onScheduleToggle();
        editData();
        onChangeToggle();
    }
    //onChange 구현해서 리스트 값 수정
    return (
        <>
            <div className="ScheduleBackground" onClick={onScheduleToggle}></div>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div className="ScheduleInsertForm">
                    <form onSubmit={onSubmit}>
                        <div style={{ display: "flex", flexDirection: "row" }}>아르바이트 <button type="submit"><TiPencil /></button></div><br />
                        <input className="underline" name="job" type="text" value={job} placeholder="알바명" onChange={onChange}></input><br />
                        시작시간<br /> <input className="underline" name="start" type="datetime-local" value={start} onChange={onChange}></input> <br />
                        종료시간<br /> <input className="underline" name="end" type="datetime-local" value={end} onChange={onChange}></input><br />
                    </form>
                    <ScheduleDelete onScheduleToggle={onScheduleToggle} editID={editID} onChangeToggle={onChangeToggle} />
                </div>
            </div>
        </>
    );
}

export default ScheduleEdit;