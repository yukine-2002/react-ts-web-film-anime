import { posts } from "../../utils/type"
import { actions } from "./posts.action"
import { PostActionTypes } from "./posts.types"


interface typeState {
    posts: posts[] | null
}
const INITIAL_STATE = {
    posts: null
}

const postReducer = (state: typeState = INITIAL_STATE, action: actions) => {
    switch (action.type) {
        case PostActionTypes.LOADING_POST:
            return {
                ...state,
                posts: action.payload
            }
      
        default:
            return state
    }
}
export default postReducer