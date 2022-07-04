import { useQuery } from "react-query"
import { getInfo, getMovie, getRecently, getRecommender, getSlide, getSource } from "./service"
import { Source } from "./type"

export const useFetchSoure = (animeId:number , episode:number,enable : boolean) => {
    return useQuery<Source>(['source',{animeId,episode}],()=> getSource(animeId,episode),{enabled : enable})
}
export const useFetchInfor = (slug : string) => {
    return useQuery(['info',{slug}],()=> getInfo(slug))
}
export const useFetchRecently = () => {
    return useQuery(['recently'],()=> getRecently())
}
export const useFetchRecommender = () => {
    return useQuery(['recommender'],()=> getRecommender())
}
export const useFetchMove = () => {
    return useQuery(['move'],()=> getMovie())
}
export const useFetchSlide = () => {
    return useQuery(['slide'],()=> getSlide())
}
