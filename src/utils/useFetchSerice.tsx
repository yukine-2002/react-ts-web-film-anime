import { useInfiniteQuery, useQuery } from "react-query";
import {
  getInfo,
  getList,
  getMovie,
  getRecently,
  getRecommender,
  getSlide,
  getSource,
  Search,
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

// export const useSearch = ({
//   keyword,
//   limit = 24,
//   enabled = true,
// }: {
//   keyword: string;
//   limit: number;
//   enabled?: boolean;
//   sort?: string;
// }) => {
//   const fetchList = ({ pageParam = 1 }) =>
//     Search({ q: keyword, page: pageParam, limit });

//   return useInfiniteQuery(["search", { limit, keyword }], fetchList, {
//     enabled: !keyword ? false : enabled,
//     getNextPageParam: ({ pagination }) => {
     
//       return pagination.currentPage >= pagination.totalPage
//         ? null
//         : pagination.currentPage + 1;
//     },
//   });
// };

