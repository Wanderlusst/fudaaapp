/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { createContext} from "react";


const initialState = {
    isDialogOpen: false,
  };
  
export const actionTypes = {
    OPEN_DIALOG: 'OPEN_DIALOG',
    CLOSE_DIALOG: 'CLOSE_DIALOG',
  };
  
 export function operationReducer(state, action) {
    switch (action.type) {
      case actionTypes.OPEN_DIALOG:
        return { ...state, isDialogOpen: true };
      case actionTypes.CLOSE_DIALOG:
        return { ...state, isDialogOpen: false };
      default:
        return state;
    }
  }
  
  // Example actions to open and close the dialog
//   const openDialogAction = { type: actionTypes.OPEN_DIALOG };
//   const closeDialogAction = { type: actionTypes.CLOSE_DIALOG };
  
  // Initialize the state with the reducer
  let state = initialState;
  
//   // Open the dialog
//   state = operationReducer(state, openDialogAction);
  
//   console.log('Dialog Open:', state.isDialogOpen);
  
//   // Close the dialog
//   state = operationReducer(state, closeDialogAction);
  
//   console.log('Dialog Open:', state.isDialogOpen);

  export const operationContext = React.createContext();

  export function useTheme() {
    return React.useContext(operationContext);
  }
