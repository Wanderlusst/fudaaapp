// CartItem.jsx
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
} from "@mui/material";
import { useTheme } from "./ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "../Redux/Cart";

const CartItem = ({ data, count, dispatch }) => {
  const { themeMode } = useTheme();
  const { cartCount } = useSelector((state) => state.cart);


  const divStyle = {
    backgroundColor: themeMode === "dark" ? "#23272f" : "white",
};
  const fontStyle = {
    color: themeMode === "dark" ? "#f6f7f9" : "#23272f",
  };

  return (
    <Card style={{ ...divStyle, ...fontStyle }}>
      <CardMedia
        component="img"
        alt={data.name}
        height="140"
        image={data.image}
      />
      <CardContent>
        <Typography variant="h6">{data.name}</Typography>
        <Typography variant="body2">Price: {data.price}</Typography>
        <Typography variant="body2">Quantity: {count}</Typography>

        {/* <Typography variant="body2"> // to be implemented further to include the cart count in the component
          <Button
            variant="outlined"
            onClick={() => dispatch(increment(data.id))}
          >
            +Add
          </Button>{cartCount[data.id]}
          <Button
            variant="outlined"
            onClick={() => dispatch(decrement(data.id))}
          >
            -Dec
          </Button>
        </Typography> */}
      </CardContent>
    </Card>
  );
};

export default CartItem;
