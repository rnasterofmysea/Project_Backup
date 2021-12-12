import React, { useState } from "react";
import axios from 'axios';
function SignIn() {

    const [id, setId] = useState("");
    const [pw1, setPw1] = useState("");
    const [pw2, setPw2] = useState("");
    async function signIn() {
        console.log("이벤트 중계");
        try {
            const res = await axios("http://localhost:3001/Login", {
                method: "Get",
                data: {
                    id: id,
                    pw: pw1
                },
                hearders: new Headers()
            })
            if (res.data) {
                console.log("로그인 성공")
                return window.location.href = ("/Main/" + id);
            }
            else {
                console.log("로그인 실패");
            }

        } catch (e) {
            console.log(e);
        }
    }
    const onClick = e => {
        if (pw1 != pw2) {
            alert("비밀번호가 일치하지 않습니다.")
        }
        else (signIn())
}
return (
    <>
        <div>
            <div>회원가입 페이지</div>
            아이디: <input type="text" name="id" onChange={e => setId(e.target.value)} /> <br />
            비밀번호: <input type="text" name="pw1" onChange={e => setPw1(e.target.value)} /><br />
            비밀번호 재입력: <input type="text" name="pw2" onChange={e => setPw2(e.target.value)} /><br />
            <button onClick={onClick}> 로그인</button>
            <button> 회원가입</button>
        </div>

    </>
);
}

export default SignIn