import React from "react";
import "./Template.css";
import { MdAddCircle } from "react-icons/md";
const Template = ({children, todoLength,onInsertToggle}) => {

    var today = new Date();
    return (
        <div className = "Template">
            <div className = "TodoHead">
                <h1>{today.getFullYear()}년
                { ('0'+(today.getMonth()+1)).slice(-2)}월
                {('0'+today.getDate()).slice(-2)}일</h1>
                <h2>할 일 {todoLength}개 남음</h2>
            </div>

            <div className ="body">{children}</div>
            
            <div className="add-todo-button" style = {{cursor: "pointer"}} onClick={onInsertToggle}>
                <MdAddCircle />
            </div>
        </div>
    )
}
//<div className="day">{today.getDay()}</div>

export default Template;