import { getUserFail, getUserSuccess,getUserPending } from "../slices/userSlice";

const getUser =() => dispatch => {
    try {
        dispatch(getUserPending());

    } catch (err) {
        dispatch(getUserFail("Failed to get user, please try again later"));
    }
}
