 
 
const MontantReducers = (state = 0, action) => {
  switch (action.type) {
    case "SET_MONTANT":
 
      return action.payload;

    case "REMOVE_MONTANT":
      return 0;

    default:
      return state;
  }
};

export default MontantReducers;
