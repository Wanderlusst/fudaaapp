import React, { useEffect, useState } from "react";
import { Container, Typography, Grid, Paper } from "@mui/material";
import BillingInformation from "./BillingInformation";
import { useTheme } from "./ThemeContext";
import CartItem from "./CartItem";
import { useSelector, useDispatch } from "react-redux";

const CartPage = ({ cart: data, count }) => {
  const { themeMode } = useTheme();
  const [amount,setTotalAmount] = useState()
  const dispatch = useDispatch();
  const { cartCount } = useSelector((state) => state.cart);

  const divStyle = {
    backgroundColor: themeMode === "dark" ? "#23272f" : "white",
  };
  const fontStyle = {
    color: themeMode === "dark" ? "#f6f7f9" : "#23272f",
  };
  const paperModeStyle = {
    backgroundColor: themeMode === "dark" ? "#7f7f7f" : "white",
  };

  const totalAmount = data.reduce((acc, item) => {
    const itemPrice = parseFloat(item.price.replace("$", ""));
    return acc + itemPrice * count[item.id];
  }, 0);


  // Recalculate totalAmount when count changes
  useEffect(() => {
      const updatedTotalAmount = data.reduce((acc, item) => {
        const itemPrice = parseFloat(item.price.replace("$", ""));
        return acc + itemPrice * cartCount[item.id];
      }, 0);
      setTotalAmount(updatedTotalAmount);


  }, [count, data,cartCount]);

  return (
    <>
      {totalAmount > 0 && (
        <Container className="" style={{ ...divStyle, ...fontStyle }}>
          <Typography variant="h4" gutterBottom align="center">
            Cart Details
          </Typography>
          <Grid container spacing={2}>
            {data
              ? data.map((item, index) => (
                  <Grid item xs={4} key={index}>
                    <CartItem
                      data={item}
                      count={count[item.id]}
                      dispatch={dispatch}
                    />
                  </Grid>
                ))
              : ""}
          </Grid>

          <Paper
            style={{ ...paperStyle, ...fontStyle, ...paperModeStyle }}
            elevation={12}
          >
            <BillingInformation totalAmount={isNaN(amount) ? totalAmount : amount} />
          </Paper>
        </Container>
      )}
    </>
  );
};

const paperStyle = {
  padding: "16px",
  marginBottom: "20px",
};

export default CartPage;
