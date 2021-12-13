import React from 'react';
import './Switch.css';
import axios from 'axios';

const Switch = ({ isOn, handleToggle, selectedTodos }) => {
    
    async function editData() {
        const res = await axios("http://localhost:3001/ToggleData", {
            method: "POST",
            data: {id: selectedTodos.id,
            checked: !selectedTodos.checked},
            hearders: new Headers()
        })
        if (res.data) {
            alert("데이터 추가");
            return window.location.reload();
        }
    }

    const onChange = e =>{
        handleToggle();
        editData();
    }
    return (
        <>
            {/* <input
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
      />
      <label
        className="react-switch-label"
        htmlFor={`react-switch-new`}
      >
        <span className={`react-switch-button`} />
      </label> */}
            <input
                checked={isOn}
                onChange={onChange}
                className="react-switch-checkbox"
                id={`react-switch-new`}
                type="checkbox"
            />
            <label
                style={{ background: isOn && '#06D6A0' || !isOn && "rgba(10, 10, 10, 0.29)" }}
                className="react-switch-label"
                htmlFor={`react-switch-new`}
            >
                <span className={`react-switch-button`} />
            </label>
        </>
    );
};

export default Switch;