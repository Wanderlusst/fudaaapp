import { useState } from "react";
import { mealData } from "../data/data";
import { useTheme } from "./ThemeContext";
import Button from "@mui/material/Button";
import { deepOrange, green } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import LocalMallSharpIcon from "@mui/icons-material/LocalMallSharp";
import { Dialog } from "@mui/material";
import CartPage from "./CartPage";
import { useSelector } from "react-redux";

const Meals = () => {
  const { themeMode } = useTheme();
  const {cartCount} = useSelector((state)=> state.cart)

  const divStyle = {
    backgroundColor: themeMode === "dark" ? "#23272f" : "white",
  };
  const fontStyle = {
    color: themeMode === "dark" ? "#f6f7f9" : "#23272f",
  };

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    "&:hover": {
      backgroundColor: deepOrange[700],
    },
  }));

  const CartButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  }));

  const [foods, setFoods] = useState(mealData);
  const [cart, setCart] = useState([]);
  const [count, setCount] = useState(cartCount);


  const dataProps = {
    cart,
    count,
  };

  const addToCart = (item, isRemove = false) => {
    if (isRemove) {
      if (count[item.id] && count[item.id] > 0) {
        setCount({
          ...count,
          [item.id]: count[item.id] - 1,
        });

        if (count[item.id] === 0) {
          setCart(cart.filter((cartItem) => cartItem.id !== item.id));
          setDescriptions({
            ...descriptions,
            [item.id]: false,
          });
        }
      }
    } else {
      if (!cart.find((cartData) => cartData.id === item.id)) {
        setCount({
          ...count,
          [item.id]: (count[item.id] || 0) + 1,
        });
        setCart([...cart, item]);
        setDescriptions({
          ...descriptions,
          [item.id]: false,
        });
      } else {
        setCount({
          ...count,
          [item.id]: (count[item.id] || 0) + 1,
        });
      }
    }
  };

  const [cartOpen, setCartOpen] = useState(false);
  const [descriptions, setDescriptions] = useState({});

  const handleCartOpen = () => {
    setCartOpen(true);
  };

  const handleCartClose = () => {
    setCartOpen(false);
  };

  const fillterCat = (category) => {
    setFoods(
      mealData.filter((item) => {
        return item.category === category;
      })
    );
  };
  return (
    <div
      className="max-w-[1520px] m-auto px-4 py-12"
      style={{ ...divStyle, ...fontStyle }}
    >
      <h1 className="text-orange-500 font-bold text-2xl text-center py-2">
        Our Meal
      </h1>
      <div className="flex flex-col lg:flex-row justify-center">
        <div className="flex justify-center md:justify-center gap-5">
          <ColorButton
            variant="contained"
            onClick={() => setFoods(mealData)}
            className="m-1 border-orange-700 text-white bg-orange-700 hover:bg-white hover:border-orange-700"
          >
            All
          </ColorButton>
          <ColorButton
            variant="contained"
            onClick={() => fillterCat("pizza")}
            className="m-1 border-orange-700 text-white bg-orange-700 hover:bg-white23272f hover:border-orange-700"
          >
            Pizza
          </ColorButton>
          <ColorButton
            variant="contained"
            onClick={() => fillterCat("chicken")}
            className="m-1 border-orange-700 text-white bg-orange-700 hover:bg-white23272f hover:border-orange-700"
          >
            Chicken
          </ColorButton>
          <ColorButton
            variant="contained"
            onClick={() => fillterCat("salad")}
            className="m-1 border-orange-700 text-white bg-orange-700 hover:bg-white23272f hover:border-orange-700"
          >
            Salad
          </ColorButton>
        </div>
      </div>
      <div className="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-6  py-4">
        {foods.map((item) => (
          <div
            key={item.id}
            className="border-none hover:scale-105 duration-300"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-[200px] object-cover rounded-lg"
            />
            <div className="flex justify-between py-2 px-2">
              <p className="font-bold ">{item.name}</p>
              <p className="bg-orange-700 h-18 w-18 rounded-full -mt-10 text-white py-4 px-2 border-8 border-white font-bold">
                {item.price}
              </p>
            </div>

            <div className="pl-2 py-4 -mt-7 gap-2 flex">
              <CartButton
                onClick={() => addToCart(item)}
                endIcon={<AddShoppingCartIcon />}
              >
                Add {count[item.id] || 0}{" "}
              </CartButton>
              <CartButton
                onClick={() => addToCart(item,true)}
                endIcon={<AddShoppingCartIcon />}
              >
                Remove {count[item.id] || 0}{" "}
              </CartButton>
              <CartButton
                onClick={handleCartOpen}
                endIcon={<LocalMallSharpIcon />}
              >
                Buy Now
              </CartButton>
              <p
                onClick={() =>
                  setDescriptions({
                    ...descriptions,
                    [item.id]: !descriptions[item.id],
                  })
                }
                className="flex items-center text-indigo-600 cursor-pointer select-none"
              >
                View More
              </p>
            </div>
            {descriptions[item.id] && (
              <span className="text-sm">{item?.description}</span>
            )}
          </div>
        ))}
      </div>
      { dataProps.cart && dataProps.count &&
        <>
          <Dialog open={cartOpen} onClose={handleCartClose} maxWidth="md">
            <CartPage cart={dataProps.cart} count={dataProps.count} />
          </Dialog>
        </>
      }
    </div>
  );
};

export default Meals;
