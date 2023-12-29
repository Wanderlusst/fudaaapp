/* eslint-disable no-unused-vars */
import { useTheme } from "./ThemeContext";
import React, { useEffect, useState } from "react";

import SimpleSnackbar from "./SimpleSnackbar";

const NewsLetter = () => {
  const { themeMode } = useTheme();

  const [data, setData] = useState({
    email: "",
    subject: "",
    message: "",
  });


  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const showSnackBar = (res) => {
    if (res) {
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const divStyle = {
    backgroundColor: themeMode === "dark" ? "#23272f" : "white",
  };

  const fontStyle = {
    color: themeMode === "dark" ? "#f6f7f9" : "#23272f",
  };

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const clearInput = () => {
      setData({
        email: "",
        subject: "",
        message: "",
      });
  };

  const baseUrl = "http://localhost:8000";

  const sendEmail = async () => {
    if (data.email && data.subject && data.message) {
      showSnackBar(true);
      clearInput(); // clear it while integraing server
  
      let dataSend = {
        email: data.email,
        subject: data.subject,
        message: data.message,
      };
  
      try {
        const res = await fetch(`${baseUrl}/email/sendEmail`, {
          method: "POST",
          body: JSON.stringify(dataSend),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });


        if (res.ok) {
          clearInput();
        }
      } catch (error) {
        console.error("Error sending email:", error);
      }
    }
  };

const fetchdata  = async()=>{

  try{
    const response = await fetch(baseUrl)
    const data = await response.json()
    // console.log(data,'data');
  }
  catch(err){
    console.log(err);
  }
}

useEffect(()=>{
  fetchdata()
},[snackbarOpen])
  
  return (
    <div
      className="max-w-[1520px] m-auto text-white px-4 bg-[#24262b]"
      style={{ ...divStyle, ...fontStyle }}
    >
      <div className="mx-auto grid lg:grid-cols-3">
        <div className="lg:col-span-2 my-4">
          <h1>Need advice on how to improve your flow?</h1>
          <p>Sign Up to join our newsletter and stay up to date.</p>
        </div>
        <div className="my-4">
          <div className="flex flex-col  gap-2   md::flex-row items-center justify-between w-full">
            <input
              type="email"
              placeholder="email"
              name="email"
              className="p-3 flex w-full rounded-md text-black"
              onChange={handleInputChange}
              value={data.email}
            />
            <input
              type="text"
              placeholder="Subject"
              name="subject"
              className="p-3 flex w-full rounded-md text-black"
              value={data.subject}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="text"
              name="message"
              value={data.message}
              className="p-3 flex w-full rounded-md text-black"
              onChange={handleInputChange}
            />
            <button
              onClick={() => sendEmail()}
              className="bg-[#00df9a] text-white rounded-md font-medium w-[200px] ml-4 my-6 px-6 py-3 border-none"
            >
              Notify me
            </button>
          </div>
          <SimpleSnackbar
            open={snackbarOpen}
            handleClose={handleCloseSnackbar}
            message={"Notified Successfully"}
            severity={"success"}
          />

          <p>
            we are concerned about the security of your data. Read <br></br>
            <span className="text-[#00df9a] cursor-pointer">
              Privacy Policy
            </span>
          </p>
        </div>
        <hr className="my-8 bg-gray-700 border-1 gark:bg-gray-700" />
      </div>
    </div>
  );
};

export default NewsLetter;
