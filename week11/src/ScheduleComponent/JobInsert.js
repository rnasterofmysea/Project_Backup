import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import {TiPlusOutline} from "react-icons/ti"

const JobInsert = () => {

    const [inputs, setInput] = useState({
        job: '',
        location: '',
        pay: ''
    })
    const { job, location, pay } = inputs;

    const onChange = (e) => {
        const { value, name } = e.target;
        setInput({
            ...inputs,
            [name]: value
        });
    };

    async function addData(e) {
        e.preventDefault();
        const res = await axios("http://localhost:3001/addJobData", {
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
        addData(e);
    }
    //onChange 구현해서 리스트 값 수정
    return (
        <>
            <form onSubmit = {onSubmit}>
                <div className="jobItemTitle"> 아르바이트 추가
                            <button type = "submit"><TiPlusOutline/></button>
                </div>
                <div className="jobItemItem">
                    <div> 아르바이트명 : <input type="text" name="job" value={job} onChange={onChange} /> </div>
                    <div> 장소: <input type="text" name="location" value={location} onChange={onChange} /> </div>
                    <div> 급여: <input type="text" name="pay" value={pay} onChange={onChange} /> </div>
            </div>
            </form>
        </>
    );
}

export default JobInsert;