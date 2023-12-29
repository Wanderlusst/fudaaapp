/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Typography, Button, Input, TextField } from "@mui/material";
import SimpleSnackbar from "./SimpleSnackbar";

const BillingInformation = (amount) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    address: "",
    mobile:""
  });


  const [validation, setValidation] = useState(false);


  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const razorPayinit = async (amount) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("You are offline, failed to load...");
      return;
    }

    const options = {
      key: "rzp_test_Q3uKNb9YbqSLpf",
      currency: "INR",
      amount: Object.values(amount)[0] * 100,
      name: "foodtopia payment",
      description: "Thanks for your order",
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert("Payment successfully");
        showSnackBar(true);
      },
      prefill: {
        name: "foodtopia ",
      },
    };

    const paymentObj = new window.Razorpay(options);
    paymentObj.open();
  };

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

const userData = (e) => {
  const nameRegex = /^[a-zA-Z\s]*$/;
  const mobileRegex = /^[0-9]{10}$/; // Regex for a 10-digit mobile number

  if (e.target.name === 'name') {
    const isValidName = nameRegex.test(e.target.value);
    setValidation(!isValidName);
  } else if (e.target.name === 'mobile') {
    const isValidMobile = mobileRegex.test(e.target.value);
    setValidation(!isValidMobile);
  } else {
    setValidation(false);
  }

  setUserInfo({
    ...userInfo,
    [e.target.name]: e.target.value,
  });
};


  const totalAmount = amount ? Object.values(amount) : null;

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Billing Information
      </Typography>
      <div className="flex flex-col gap-2">
      <div>
        <TextField
          label={"name"}
          fullWidth
          color="primary"
          type="text"
          name="name"
          onChange={userData}
          helperText={validation ? "please enter a value" : ""}
          error={validation ? "error" : null}
        />
      </div>
      <div>
        <TextField
          label={"addres"}
          fullWidth
          type="text"
          name="address"
          onChange={userData}
          helperText={validation ? "please enter a value" : ""}
          error={validation ? "error" : null}
        />
      </div>
      <div>
        <TextField
          label={"mobile"}
          fullWidth
          type="number"
          name="mobile"
          onChange={userData}
          helperText={validation ? "please enter a value" : ""}
          error={validation ? "error" : null}
        />
      </div>
      </div>
      <div>
        <Typography gutterBottom>Total : {totalAmount}</Typography>
      </div>
      {userData && (
        <>
          <Button
            onClick={() => {
              if (!validation) {
                if (totalAmount > 0) {
                  razorPayinit(totalAmount);
                } else {
                  showSnackBar(true);
                }
              }
            }}
            variant="contained"
            color="primary"
          >
            Place Order
          </Button>
        </>
      )}


      <SimpleSnackbar
        open={snackbarOpen}
        handleClose={handleCloseSnackbar}
        message={ Object.values(amount)[0] <= 0 ? "Please order something to continue" : "Payment Successful"}
        severity={ Object.values(amount)[0] <= 0  ? "error" : "success"}
      />
    </div>
  );
};

export default BillingInformation;
