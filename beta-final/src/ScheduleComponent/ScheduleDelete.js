import React from "react";
import axios from "axios";
import { TiTrash } from "react-icons/ti";

const ScheduleDelete = ({
    editID,
    onScheduleToggle,
    onChangeToggle,
    user_id
}) => {

    async function deleteData(e) {
        e.preventDefault();
        console.log("이벤트 중계");
        const res = await axios("http://localhost:3001/deleteData", {
            method: "POST",
            data: { id: editID, user_id:user_id },
            hearders: new Headers()
        })
        onChangeToggle()
        if (res.data) {
            console.log("데이터 삭제");
            return window.location.reload();
        }
        else {
            console.log("데이터 삭제 실패");
        }

    }

    const onSubmit = e => {
        e.preventDefault();
        onScheduleToggle();
        deleteData(e);
        onChangeToggle();
        console.log("이벤트 발생");
    }

    return (
        <form onSubmit={onSubmit}>

            <div>
                <button type="submit"><TiTrash /></button>
            </div>

        </form>
    );
}

export default ScheduleDelete;