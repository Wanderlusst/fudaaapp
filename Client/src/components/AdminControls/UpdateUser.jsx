import React, { useState,useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";


const StyledForm = styled.div`
  max-width: 400px;
  margin: auto;
  height:100vh
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

function UpdateUser() {
  const { themeMode } = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [fetching, isFetching] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    place: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    setFormData({
      name: users.name || "",
      age: users.age || "",
      place: users.place || "",
      email: users.email || "",
    });
  }, [users]);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put('http://localhost:8000/updateUser/'+id,formData)
    .then((res)=>{
      console.log(res,'res')
      navigate('/')
    })
    .catch((err)=> console.log(err,'err'))
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get("http://localhost:8000/getUser/"+id);
        console.log(data,'data in updateuser');
        isFetching(true);
        setUsers(data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const divStyle = {
    backgroundColor: themeMode === "dark" ? "#23272f" : "white",
  };

  const fontStyle = {
    color: themeMode === "dark" ? "#f6f7f9" : "#23272f",
  };

  if (!fetching) {
    return <div>Loading...</div>;
  }

  return (
    <div  style={{...divStyle,...fontStyle}}>
      <StyledForm>
        <h1>Update User</h1>
        <form onSubmit={handleUpdate}>
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

          <StyledButton type="submit">Update</StyledButton>
        </form>
      </StyledForm>
    </div>
  );
}

export default UpdateUser;
