import React from "react";
import axios from "axios";

const ScheduleDelete =({
    editID,
    onScheduleToggle}) =>{

    async function deleteData(e){
        e.preventDefault();
        console.log("이벤트 중계");
        const res = await axios("http://localhost:3001/deleteData",{
            method: "POST",
            data : {id : editID},
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
        onScheduleToggle();
        deleteData(e);
        console.log("이벤트 발생");
    }

    return(
        <form onSubmit = {onSubmit}>

        <div>
            <button type = "submit" value="확인"> 삭제 </button>
        </div>
        
        </form>
    );
}

export default ScheduleDelete;