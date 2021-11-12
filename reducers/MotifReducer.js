const MotifReducer = (state = null, action) => {
    switch (action.type) {
        case "SET_MOTIF":

            return action.payload;

        case "REMOVE_MOTIF":
            return null;

        default:
            return state;
    }
};

export default MotifReducer;
