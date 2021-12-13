import React, { useState } from "react";
import axios from 'axios';
import { createGlobalStyle } from 'styled-components';

function SignIn() {
    const GlobalStyle = createGlobalStyle`
    body {
      background: #e9ecef;
    }`
    const titleStyle = {
        width: "40vw",
        height: "40vh",
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
    const [pw1, setPw1] = useState("");
    const [pw2, setPw2] = useState("");
    async function signIn() {
        console.log("이벤트 중계");
        try {
            const res = await axios("http://localhost:3001/SignIn", {
                method: "Post",
                params: {
                    id: id,
                    pw: pw1
                },
                hearders: new Headers()
            })
            if (res.data) {
                console.log("로그인 성공")
                return window.location.replace("/");
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
            <GlobalStyle />
            <div style={titleStyle}>
                <div style={{ fontSize: "7vw" }}>
                    Job-Ant</div>
                <div style={{ marginBottom: "3vh" }}>
                    <div style={{ fontSize: "2vw" }}>Register</div>
                    <div style={{textAlign:"left", marginLeft: "14vw", marginTop:"2vh"}}>
                        <div>
                            ID <input type="text" name="id" onChange={e => setId(e.target.value)} />
                        </div>
                        <div>
                            Password <input type="text" name="pw" onChange={e => setPw1(e.target.value)} />
                        </div>
                        <div>
                            re -Password <input type="text" name="pw" onChange={e => setPw2(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div style={{ marginLeft: "17vw", marginBottom: "1vh", display: "flex", flexDirection: "row" }}>
                    <button onClick={onClick}> Confirm</button>
                </div>
            </div>

        </>
    );
}

export default SignIn