import React, { useState } from "react";
import { createGlobalStyle } from 'styled-components';
import axios from 'axios';
import "./Login.css";
function Login() {
    const GlobalStyle = createGlobalStyle`
    body {
      background: #e9ecef;
    }`
    const titleStyle = {
        width: "40vw",
        height: "30vh",
        padding: "1vw 1vw 1vw 1vw",
        background: "white",
        borderRadius: "16px",
        boxShadow: "0 0 8px 0 rgba(0, 0, 0, 0.04)",
        textAlign: "center",
        marginTop: "25vh",
        marginLeft: "30vw",
        marginBottom: "3vh"
    }
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
                return window.location.href = ("/Main/" + id + "/" + type);
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
            <GlobalStyle />
            <div style={titleStyle}>
                <div style={{ fontSize: "7vw" }}>
                    Job-Ant</div>
                <div style={{ marginLeft: "8vw", marginBottom: "3vh", display:"flex", flexDirection:"row" }}>
                    <div>
                        ID  <input type="text" name="id" onChange={e => setId(e.target.value)} />
                    </div>
                    <div style={{marginLeft: "1vw"}}>
                    Password <input type="text" name="pw" onChange={e => setPw(e.target.value)} />
                    </div>
                </div>
                <div style={{ marginLeft: "14vw", marginBottom: "1vh", display:"flex", flexDirection:"row" }}>
                    <button onClick={onClick}> 로그인</button>
                    <button style={{marginLeft:"1vw"}} onClick={e => { window.location.href = ("/SignIn") }}> 회원가입</button>
                </div>
            </div>

        </>
    );
}

export default Login