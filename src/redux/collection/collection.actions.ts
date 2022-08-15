import { Dispatch } from "react"
import { getInfo} from "../../utils/service"
import { Anime, AnimeInfo } from "../../utils/type"
import { CollectionActionTypes } from "./collection.types"

interface loadAnime {
    type: CollectionActionTypes.LOADING_ANIME_RANKING,
    payload: AnimeInfo[]
}
interface loadAnimeInfoSlide {
    type: CollectionActionTypes.LOADING_ANIME_INFO_SLIDE,
    payload: AnimeInfo[]
}


export type actions = loadAnime | loadAnimeInfoSlide


export const fetchAnimeRank = (Rank: Anime[]) => {
    return async (dispatch: Dispatch<actions>) => {
        try {
            let res = await Promise.all(Rank!.map(e => getInfo(e.slug)))
            res = res.filter(item => item !== undefined)
            let resJson = await Promise.all(res.map(e => { return e }))
            dispatch({
                type: CollectionActionTypes.LOADING_ANIME_RANKING,
                payload: resJson
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const fetchAnimeInfoSlide = (SlideData: Anime[]) => {
    return async (dispatch: Dispatch<actions>) => {
        try {
            let res = await Promise.all(SlideData!.map(e => getInfo(e.slug)))
           
            let resJson = await Promise.all(res.map(e => { return e }))
            dispatch({
                type: CollectionActionTypes.LOADING_ANIME_INFO_SLIDE,
                payload: resJson
            })
        } catch (err) {
            console.log(err)
        }
      
    }
}