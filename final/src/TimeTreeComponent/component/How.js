import React from "react";
import "./How.css"

const How=(selectedTodos) => {

    return(
        <div>
            {selectedTodos.text}
        </div>
        );
    

}
// 제목이 클릭될 경우 
//상태창이 이쪽으로 넘어와서 값 입력
export default How;