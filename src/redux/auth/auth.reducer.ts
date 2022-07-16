import { actions, user } from "./auth.action"
import { UserActionTypes } from "./auth.types"

interface typeState {
    currentUser: user | null
}
const INITIAL_STATE = {
    currentUser: null
}

const authReducer = (state: typeState = INITIAL_STATE, action: actions) => {
    switch (action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        case UserActionTypes.SIGN_OUT_CURRENT_USER:
            return {
                ...state,
                currentUser: null
            }

        default:
            return state
    }
}
export default authReducer