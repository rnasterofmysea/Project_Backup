import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Login from "./Page/Login";
import Main from "./Page/Main";
import SignIn from "./Page/SignIn";
import Sub1 from "./Page/Sub1";

function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Routes>
          <Route path= "/"exact={true} element={<Login/>} />
          <Route path="/Main/:id/:type" element={<Main />}/ >
          <Route path="/Sub1/:subid/:subname/:subpay" element={<Sub1 />}/>
          <Route path="/SignIn" element={<SignIn />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}


export default App;