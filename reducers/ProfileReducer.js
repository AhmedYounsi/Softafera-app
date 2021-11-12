import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_PROFILE":
            AsyncStorage.setItem("PROFILE", JSON.stringify(action.payload));
            return action.payload;

        case "REMOVE_PROFILE":
            AsyncStorage.removeItem("PROFILE");
            return null;

        default:
            return state;
    }
};

export default ProfileReducer;