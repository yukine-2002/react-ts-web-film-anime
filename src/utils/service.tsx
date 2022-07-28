import { async } from "@firebase/util";
import axios from "axios";
import { Anime, AnimeInfo, Source, Story } from "./type";

export const instance = axios.create({
  baseURL: `https://json-api-anime.herokuapp.com/api/v1`,
});

interface GetListResponse {
  success: boolean;
  data: Anime[];
  pagination: {
    totalPage: number;
    currentPage: number;
  };
}

interface GetListData {
  category: string;
  slug: string;
  page?: number;
  sort?: string;
}
interface SearchProps {
  q: string;
  limit: number;
  page: number;
}

export const handlePath = (nav: any, slug: string, name: string) => {
  nav(`/watch/${slug}/${name}`);
};

export const getSlide = async (): Promise<Anime[]> => {
  const { data } = await instance.get("/slide");
  return data.data;
};
export const getMovie = async (): Promise<Anime[]> => {
  const { data } = await instance.get("/movie");
  return data.data;
};
export const getRecently = async (): Promise<Anime[]> => {
  const { data } = await instance.get("/recently");
  return data.data;
};
export const getRecommender = async (): Promise<Anime[]> => {
  const { data } = await instance.get("/recommended");
  return data.data;
};
export const getInfo = async (slug: string): Promise<AnimeInfo> => {
  const { data } = await instance.get(`/anime/${slug}`);
  return data.data;
};
export const getList = async ({
  category,
  slug,
  ...rest
}: GetListData): Promise<GetListResponse> => {
  const { data } = await instance.get(`/${category}/${slug}`, {
    params: rest,
  });
  return data;
};

export const getSource = async (
  animeId: number,
  episodeId: number
): Promise<Source> => {
  const { data } = await instance.get(
    `/anime/${animeId}/episodes/${episodeId}`
  );
  return data.data;
};

export const Search = async (props: SearchProps): Promise<GetListResponse> => {
  const { data } = await instance.get("/search", {
    params: props,
  });
  return data;
};
export const rankDate = async (): Promise<Anime[]> => {
  const { data } = await instance.get("/ranking/ngay");
  return data.data;
};

export const storyInstance = axios.create({
  baseURL : 'https://json-api-story.herokuapp.com/api/v2'
})
export const newChapStory = async() : Promise<Story[]> => {
  const {data} = await storyInstance.get('/newChapStory')
  return data.data
}
export const newStory = async() : Promise<Story[]> => {
  const {data} = await storyInstance.get('/newStory')
  return data.data
}
export const storyRecommender = async() : Promise<Story[]> => {
  const {data} = await storyInstance.get('/storyRecommender')
  return data.data
}
export const storyComplete = async() : Promise<Story[]> => {
  const {data} = await storyInstance.get('/storyComplete')
  return data.data
}
export const storyUpdate = async() : Promise<Story[]> => {
  const {data} = await storyInstance.get('/storyUpdate')
  return data.data
}
export const storyHot = async() : Promise<Story[]> => {
  const {data} = await storyInstance.get('/storyHot')
  return data.data
}
export const rankDayStory = async() : Promise<Story[]> => {
  const {data} = await storyInstance.get('/rankDay')
  return data.data
}
export const getMenu = async() : Promise<Story[]> => {
  const {data} = await storyInstance.get('/getMenu')
  return data.data
}

