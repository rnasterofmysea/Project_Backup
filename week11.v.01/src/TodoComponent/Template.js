import React, { useState } from "react";
import "./Template.css";
import { MdAddCircle } from "react-icons/md";
const Template = ({ children, todoLength, onInsertToggle, date }) => {
    console.log(date)
    const dateNumType = Date.parse(date)
    console.log(dateNumType +","+ typeof dateNumType)
    const dateDateType = new Date(dateNumType);
    console.log(dateDateType + "," + typeof dateDateType)
    return (
        <div className="Template">
            <div className="TodoHead">
                <h1>
                    {dateDateType.getFullYear()}년
                    {('0' + (dateDateType.getMonth() + 1)).slice(-2)}월
                    {('0' + dateDateType.getDate()).slice(-2)}일
                    </h1>
            </div>

            <div className="body">{children}</div>

            <div className="add-todo-button" style={{ cursor: "pointer" }} onClick={onInsertToggle}>
                <MdAddCircle />
            </div>
        </div>
    )
}
//<div className="day">{today.getDay()}</div>

export default Template;