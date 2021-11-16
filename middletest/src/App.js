import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Main from "./Page/Main";
import Sub1 from "./Page/Sub1";

function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Routes>
          <Route path="/" exact={true} element={<Main />}></Route>
          <Route path="/Sub1" element={<Sub1 />}></Route>
        </Routes>

      </BrowserRouter>
    </div>
  );
}


export default App;