import { useInfiniteQuery, useQuery } from "react-query";
import {
  getInfo,
  getList,
  getMenu,
  getMovie,
  getRecently,
  getRecommender,
  getSlide,
  getSource,
  newChapStory,
  newStory,
  rankDate,
  rankDayStory,
  Search,
  storyComplete,
  storyHot,
  storyRecommender,
  storyUpdate,
} from "./service";
import { Source } from "./type";
interface Props {
  category: string;
  slug: string;
}
export const useFetchSoure = (
  animeId: number,
  episode: number,
  enable: boolean
) => {
  return useQuery<Source>(
    ["source", { animeId, episode }],
    () => getSource(animeId, episode),
    { enabled: enable }
  );
};
export const useFetchInfor = (slug: string) => {
  return useQuery(["info", { slug }], () => getInfo(slug));
};
export const useFetchRecently = () => {
  return useQuery(["recently"], () => getRecently());
};
export const useFetchRecommender = () => {
  return useQuery(["recommender"], () => getRecommender());
};
export const useFetchMove = () => {
  return useQuery(["move"], () => getMovie());
};
export const useFetchSlide = () => {
  return useQuery(["slide"], () => getSlide());
};
export const useFetchRankDay = () => {
  return useQuery(["rankDay"], () => rankDate());
};
export const useFetchList = ({ category, slug }: Props) => {
  const useFetch = ({ pageParam = 1 }) =>
    getList({ category, slug, page: pageParam });

  return useInfiniteQuery(["collection", slug], useFetch, {
    getNextPageParam: (response) => {
      if (!response.pagination) return;
      return response.pagination.currentPage > response.pagination.totalPage
        ? null
        : response.pagination.currentPage + 1;
    },
  });
};

export const useSearch = ({
    keyword,
    limit = 24,
    enabled = true,
  }: {
    keyword: string;
    limit: number;
    enabled?: boolean;
    sort?: string;
  })=>{
    return useQuery(['search',{limit,keyword}] , ()=> Search({q : keyword , limit : limit , page : 1}), { enabled: !keyword ? false :  enabled })
  }

//story 

export const useFetchNewChapStory = () => {
  return useQuery(["newStoryChap"], () => newChapStory());
}
export const useFetchNewStory = () => {
  return useQuery(["newStory"], () => newStory());
}
export const useFetchStoryRecommender= () => {
  return useQuery(["storyRecommender"], () => storyRecommender());
}
export const useFetchStoryComplete= () => {
  return useQuery(["storyComplete"], () => storyComplete());
}
export const useFetchStoryUpdate= () => {
  return useQuery(["storyUpdate"], () => storyUpdate());
}
export const useFetchStoryHot= () => {
  return useQuery(["storyHot"], () => storyHot());
}
export const useFetchRankDaySTory= () => {
  return useQuery(["rankDay"], () => rankDayStory());
}
export const useFetchGetMenu= () => {
  return useQuery(["getMenu"], () => getMenu());
}





