// eslint-disable-next-line no-unused-vars
import React,{useContext} from "react";
import { useState } from "react";
import { AiOutlineMenu, AiOutlineSearch, AiOutlineClose} from "react-icons/ai";
import { MdDarkMode} from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { TbTruckReturn } from "react-icons/tb";
import { FaGoogleWallet } from "react-icons/fa";
import { PiSunLight } from "react-icons/pi";
import { MdHelp, MdOutlineFavorite } from "react-icons/md";
import { useTheme } from "./ThemeContext";
import { Dialog, IconButton ,Button } from "@mui/material";
import CartPage from "./CartPage";
import ModalDialog from "./ModalDialog";
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import { useSelector } from "react-redux";
import Autocomplete from "./Common/AutoComplete";

const TopNav = () => {
  const [sideNav, setSideNav] = useState(false);
  const [search , setSearch] = useState(false)
  const [isFreeDeliveryOrange, setIsFreeDeliveryOrange] = useState(false);
  const { isDarkTheme, toggleTheme ,themeMode} = useTheme();

  const [cartOpen, setCartOpen] = useState(false);
  const [profile , setProfile] = useState(false);
  const { isLogin } = useSelector((state) => state.cart);

  // eslint-disable-next-line no-unused-vars
  const handleCartOpen = () => {
    setCartOpen(true);
  };

  const handleCartClose = () => {
    setCartOpen(false);
  };

  const toggleFreeDeliveryColor = () => {
    setIsFreeDeliveryOrange(!isFreeDeliveryOrange);
  };

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      toggleFreeDeliveryColor();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  });

  const divStyle = {
    backgroundColor: themeMode === 'dark' ? '#23272f' : 'white',
  };

  const fontStyle = {
    color: themeMode === 'dark' ? '#f6f7f9' : '#23272f',

  }
  const inputColor = {
    color: themeMode === 'dark' ? '#ffff' : '#333945',
  }
  
  const freeBackgroundClass = isFreeDeliveryOrange ? "bg-orange-700" : "bg-gray-200";
  const deliveryBackgroundClass = isFreeDeliveryOrange ? "bg-gray-200" : "bg-orange-700";


  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  return (
    <div
      className="max-w-[1520] mx-auto  flex justify-between iems-center p-4"
      style={divStyle}
    >
      <div className="flex items-center">
        <div onClick={() => setSideNav(!sideNav)} className="cursor-pointer">
          <AiOutlineMenu size={25} style={{ ...divStyle, ...fontStyle }} />
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2 ">
          <span className="font-bold" style={fontStyle}>
            FoodTopia
          </span>
        </h1>
        <div className="hidden lg:flex items-center bg-gray-200 rounded-full p-1 text-[14px]">
          <p
            style={{ ...fontStyle }}
            onClick={toggleFreeDeliveryColor}
            className={
              freeBackgroundClass +
              " select-none text-white rounded-full p-2 text-bold"
            }
          >
            Free
          </p>
          <p
            style={{ ...fontStyle }}
            onClick={toggleFreeDeliveryColor}
            className={
              deliveryBackgroundClass +
              " text-white rounded-full select-none p-2 text-bold cursor-pointer"
            }
          >
            Delivery
          </p>
        </div>
      </div>
      <div
        className="bg-gray-200 rounded-full flex items-center px-2 w-[200px] sm:w-[400px] lg:w-[500px]"
        style={{ ...inputColor }}
      >
        <AiOutlineSearch size={25}  />
        <div onClick={() => setSearch(!search)}>
          <Autocomplete className="relative w-full max-w-xl mx-auto"/>
        </div>
      </div>
      <IconButton
        onClick={toggleTheme}
        className="text-black hidden md:flex items-center  rounded-full"
      >
        {isDarkTheme ? (
          <PiSunLight style={{ ...divStyle, ...fontStyle }} size={25} />
        ) : (
          <MdDarkMode style={{ ...divStyle, ...fontStyle }} size={25} />
        )}{" "}
      </IconButton>

      <Dialog open={cartOpen} onClose={handleCartClose} maxWidth="md">
        <CartPage />
      </Dialog>

      {sideNav ? (
        <div
          className="bg-black/60 fixed w-full h-screen z-10 top-0 left-0"
          onClick={() => setSideNav(!sideNav)}
        ></div>
      ) : (
        ""
      )}
      <div
        style={{ ...divStyle, ...fontStyle }}
        className={
          sideNav
            ? "fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300"
            : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300"
        }
      >
        <AiOutlineClose
          className="absolute right-4 top-4"
          onClick={() => setSideNav(!sideNav)}
          size={25}
        />
        <h2 className="text-2xl p-4 font-medium">
          KFC <span className="text-red-700 font-bold"> 🏳️‍⚧️Eng</span>
        </h2>
        <nav style={{ ...divStyle, ...fontStyle }}>
          <ul
            style={{ ...divStyle, ...fontStyle }}
            className="flex flex-col p-4 text-gray-900"
          >
            <li
              className="text-xl py-4 flex"
              onClick={() => setProfile(!profile)}
            >
              <BsPerson
                className="mr-4 text-white bg-black rounded-full"
                size={25}
                onClick={handleOpen}
              />
              profile
              
              <ModalDialog open={open} isLogin={!profile} handleClose={handleClose} />
            </li>
            <li className="text-xl py-4 flex">
              <TbTruckReturn
                className="mr-4 text-white bg-black rounded-full"
                size={25}
              />
              Delivery
            </li>
            <li className="text-xl py-4 flex">
              <MdOutlineFavorite
                className="mr-4 text-white bg-black rounded-full"
                size={25}
              />
              Favourite
            </li>
            <li className="text-xl py-4 flex">
              <FaGoogleWallet
                className="mr-4 text-white bg-black rounded-full"
                size={25}
              />
              Wallet
            </li>
            <li className="text-xl py-4 flex">
              <MdHelp
                className="mr-4 text-white bg-black rounded-full"
                size={25}
              />
              Help
            </li>
          </ul>
        </nav>
      </div>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        <AccountCircleSharpIcon size={25} /> { isLogin ? "Login" : "Signup" }
      </Button>
      <ModalDialog open={open} handleClose={handleClose} />
    </div>
  );
};

export default TopNav;
