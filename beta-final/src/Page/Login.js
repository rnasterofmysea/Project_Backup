import React, { useState } from "react";
import axios from 'axios';
function Login() {

    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    async function login() {
        console.log("이벤트 중계");
        try {
            const res = await axios("http://localhost:3001/Login", {
                method: "Post",
                params: {
                    id: id,
                    pw: pw
                },
                hearders: new Headers()
            })
            if (res.data) {
                console.log("로그인 성공")
                const _data = res.data.map((RowDataPacket) => ({
                    user_type: RowDataPacket.user_type
                })
                )
                const type = _data[0].user_type;
                return window.location.href = ("/Main/"+id+"/"+type);
            }
            else {
                console.log("로그인 실패");
            }

        } catch (e) {
            console.log(e);
        }
    }
    const onClick = e => {
        login();
    }
    return (
        <>
            <div>
                <div>로그인 페이지</div>
                아이디: <input type="text" name="id" onChange={e => setId(e.target.value)} /> <br />
                비밀번호: <input type="text" name="pw" onChange={e => setPw(e.target.value)} />
                <button onClick={onClick}> 로그인</button>
                <button onClick={e =>{window.location.href = ("/SignIn")}}> 회원가입</button>
            </div>

        </>
    );
}

export default Login