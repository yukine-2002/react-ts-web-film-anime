import { AnimeInfo } from "../../utils/type"
import { actions } from "./collection.actions"
import { CollectionActionTypes } from "./collection.types"


interface typeState {
    animeRank: AnimeInfo[] | [],
    animeInfoSlide: AnimeInfo[] | [],
}
const INITIAL_STATE = {
    animeRank: [],
    animeInfoSlide: []
}

const collectionReducer = (state: typeState = INITIAL_STATE, action: actions) => {
    switch (action.type) {
        case CollectionActionTypes.LOADING_ANIME_RANKING:
            return {
                ...state,
                animeRank: action.payload
            }
        case CollectionActionTypes.LOADING_ANIME_INFO_SLIDE:
            return {
                ...state,
                animeInfoSlide: action.payload
            }

        default:
            return state
    }
}
export default collectionReducer