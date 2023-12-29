// App.js
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Admin from "./components/AdminControls/Admin";
import Home from "./components/Home";
import CreateUser from "./components/AdminControls/CreateUser";
import UpdateUser from "./components/AdminControls/UpdateUser";
import { ThemeProvider } from "./components/ThemeContext";
import Spinner from "./components/Common/Spinner";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () =>{
      clearTimeout(timer);
    } 
  },[]);


  return (
    <>
      <BrowserRouter>
        <ThemeProvider style= {{position:'relative'}}>
          { loading ? (<Spinner/> ) :
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/admin" element={<Admin />}></Route>
              <Route path="/create" element={<CreateUser />}></Route>
              <Route path="/update/:id" element={<UpdateUser />}></Route>
            </Routes>
          }
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
