// a reducer is how we specify the app state changes in res to certain actions to our context
export default (state, action) => {
  switch (action.type) {
    case "GET_TRANSACTIONS":
      return {
        ...state,
        loading: false, //transactions were fetched
        transactions: action.payload, //payload send from GlobalState.js
      };

    case "DELETE_TRANSACTION":
      return {
        ...state,
        // send all transactions except the one that was deleted
        transactions: state.transactions.filter(
          // _id pt ca mongo
          (transaction) => transaction._id !== action.payload
        ),
      };

    case "ADD_TRANSACTION":
      return {
        transactions: [...state.transactions, action.payload],
      };

    case "TRANSACTION_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
