import React from "react";
import axios from "axios";
import { TiPencil } from "react-icons/ti";
const JobEdit =({
    delID}) =>{

    async function deleteData(e){
        e.preventDefault();
        console.log("이벤트 중계");
        const res = await axios("http://localhost:3001/deleteJobData",{
            method: "POST",
            data : {id : delID},
            hearders: new Headers()
	    })
        if(res.data){
            console.log("데이터 삭제");
            return window.location.reload();
        }
        else{
            console.log("데이터 삭제 실패");
        }
    }
    
    const onSubmit = e => {
        e.preventDefault();
        deleteData(e);
        console.log("이벤트 발생");
    }

    return(
            <button onClick = {onSubmit}>
            <TiPencil/>
            </button>
    );
}

export default JobEdit;