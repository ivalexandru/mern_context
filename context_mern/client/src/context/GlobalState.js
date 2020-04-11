import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

//initial state
// expense = negative nr, income = positive nr
const initialState = {
  transactions: [],
  error: null,
  loading: true,
};

//create context
export const GlobalContext = createContext(initialState);

//PROVIDER component (we'll wrap all of our components
// (ele sunt 'children' ) from App.js in this component)
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //actions:

  async function getTransactions() {
    try {
      //nu mai e nevoie de http://localhost in fata pt ca ai pus proxy in package.json
      const res = await axios.get("/api/v1/transactions");
      // res.data  => will give us the entire obj, as set in the controller
      //daca vrei doar array-ul interior, numit tot data, pui inca un .data
      // verifici asta facand un get cu postman si vezi ce returneaza:
      // {
      //   "success": true,
      //   "count": 3,
      //   "data": [
      //       { .......

      dispatch({
        type: "GET_TRANSACTIONS",
        payload: res.data.data, // the transactions from the backend
      });
    } catch (err) {
      //verifici cu postman, daca vreau sa adaug ceva cu post si nu pun nimic in body,
      // iau eroarea:
      // {
      //   "success": false,
      //   "error": [
      //       "Please add a pozitive or negative nr",
      //       "Please add some text"
      //   ]
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  async function deleteTransaction(id) {
    try {
      await axios.delete(`/api/v1/transactions/${id}`);

      dispatch({
        type: "DELETE_TRANSACTION",
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  async function addTransaction(transaction) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("api/v1/transactions", transaction, config);

      dispatch({
        type: "ADD_TRANSACTION",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  //accesezi chestii din initialState cu state.ceVrei..
  // (acum ai un singur array acolo, dar poti avea mai multe)
  //la fel, aici pui si functiile pe care vrei sa le accesezi altundeva
  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        getTransactions,
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
