import React, { useState, useEffect } from "react";
import { useTable } from "react-table";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useTheme } from "../ThemeContext";
import Button from "@mui/material/Button";

const TableContainer = styled.div`
  width: 100%;
  margin: auto;
  height: 100vh;
  overflow: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  background-color: grey;
`;

const TableData = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const TableRow = styled.tr`
  &:hover {
    background-color: grey;
  }
`;

function Admin() {
  const [users, setUsers] = useState([]);
  const { themeMode } = useTheme();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/users`);
        const data = await response.data;
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    getUsers();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/deleteUser/${id}`)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const data = React.useMemo(() => users, [users]);
  const columns = React.useMemo(
    () => [
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "First Name",
        accessor: "firstName",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
      },
      {
        Header: "Password",
        accessor: "password",
      },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div className="flex justify-evenly">
            <Link to={`/update/${row.original._id}`}>
              <Button variant="outlined" className="border-red-300">
                Edit
              </Button>
            </Link>
            <Button
              variant="outlined"
              onClick={() => handleDelete(row.original._id)}
            >
              Delete
            </Button>
          </div>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const divStyle = {
    backgroundColor: themeMode === "dark" ? "#23272f" : "white",
  };

  const fontStyle = {
    color: themeMode === "dark" ? "#f6f7f9" : "#23272f",
  };

  return (
    <div style={{ ...divStyle, ...fontStyle }}>
      <TableContainer>
        <Link to="/create">
          <button>Create user</button>
        </Link>
        <StyledTable {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map((column) => (
                  <TableHeader key={column.id} {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </TableHeader>
                ))}
              </TableRow>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <TableRow key={row.id} {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <TableData key={cell.id} {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </TableData>
                  ))}
                </TableRow>
              );
            })}
          </tbody>
        </StyledTable>
      </TableContainer>
    </div>
  );
}

export default Admin;
