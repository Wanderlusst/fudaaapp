import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector ,useDispatch } from "react-redux";
import { useTheme } from "../ThemeContext";

// import { addTocart } from "./Redux/Cart";


const StyledForm = styled.div`
  max-width: 400px;
  margin: auto;
  height: 100vh;
`;

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 8px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
`;

const StyledButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

function CreateUser() {
  const dispatch = useDispatch()
  const { themeMode } = useTheme();


  const navigate = useNavigate()
  const[users,setUsers] = useState()
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    place: "",
    email: "",
  });
  const divStyle = {
    backgroundColor: themeMode === "dark" ? "#23272f" : "white",
  };

  const fontStyle = {
    color: themeMode === "dark" ? "#f6f7f9" : "#23272f",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.age)
    axios.post('http://localhost:9000/createUser',formData)
    .then((res)=>{
      console.log(res,'res')
      navigate('/')
    })
    .catch((err)=> console.log(err,'err'))
  };


  return (
    <div style={{...divStyle,...fontStyle}}>
      <StyledForm>
      <h1>Add User</h1>
        <form onSubmit={handleSubmit}>
          <StyledLabel>
            Name:
            <StyledInput
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </StyledLabel>

          <StyledLabel>
            Age:
            <StyledInput
              type="text"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </StyledLabel>

          <StyledLabel>
            Place:
            <StyledInput
              type="text"
              name="place"
              value={formData.place}
              onChange={handleChange}
            />
          </StyledLabel>

          <StyledLabel>
            Email:
            <StyledInput
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </StyledLabel>

          <StyledButton type="submit">Submit</StyledButton>
        </form>
      </StyledForm>
    </div>
  );
}

export default CreateUser;
