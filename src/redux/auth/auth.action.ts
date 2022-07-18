import { Dispatch } from "redux";
import { auth } from "../../firebase/firebase";
import { UserActionTypes } from "./auth.types";

export interface user {
    uid : string,
    name : string,
    email : string,
    img : string,
    createAt : string
}
interface useType {
    type : UserActionTypes.SIGN_OUT_CURRENT_USER,
}

interface setUser {
    type : UserActionTypes.SET_CURRENT_USER,
    payload : user
}

export type actions = setUser | useType

export const setCurrentUser = (user : any) => {
    return (dispatch : Dispatch<actions>) => {
        dispatch({
            type : UserActionTypes.SET_CURRENT_USER,
            payload : user
        })
    }
}
export const signOutCurrentUser = () => {
    return (dispatch : Dispatch<actions>) => {
        auth.signOut()
        dispatch({
            type : UserActionTypes.SIGN_OUT_CURRENT_USER,
        })
    }
}