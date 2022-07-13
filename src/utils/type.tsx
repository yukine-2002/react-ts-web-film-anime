import React from "react";



export interface Route {
  name: string;
  path: string;
  component: React.ComponentType;
  dropdown?: boolean;
  dropdownData?: any[];
  header: boolean;
  dropdownPath?: (data: any) => string;
  listKey?: (data: any) => string;
  navigation?: boolean;
  icon?: React.ComponentType<Icon>;
}

export interface Icon {
  size?: number;
  className?: string;
}

export interface Episodes {
  id: number;
  name: number;
  special_name: number;
  detail_name: string | null;
  full_name: string;
  film_name: string;
  slug: string;
  link: string;
  views: number;
  is_copyrighted: boolean | null;
  has_preview: boolean | null;
  thumbnail_small: string;
  thumbnail_medium: string;
  upcoming: boolean | null;
}

export interface Source extends Episodes {
  videoSource: string;
}

export interface AnimeInfo {
  id: number;
  name: string;
  slug: string;
  thumbnail: string;
  views: number;
  genres: Genre[];
  likes: number;
  follows: number;
  subTeams: string[];
  description: string;
  episodes: Episodes[];
}

export interface AnimeLocalStorage {
  id: number;
  name: string;
  slug: string;
  thumbnail: string;
  views: number;
  genres: Genre[];
  likes: number;
  follows: number;
  subTeams: string[];
  description: string;
  episodes: Episodes[];
  time : string;
}

export interface Anime {
  id: number;
  name: string;
  thumbnail: string;
  time: string;
  slug: string;
  views: number;
  latestEpisode?: {
    name: string;
    views: number;
  };
  episodeIndex?:number
}
  
export interface GetListResponse {
  success: boolean;
  data: Anime[];
}
export interface Genre {
  name: string;
  slug: string;
}

export interface Ranking {
  name: string;
  slug: string;
}

export interface Sort {
  name: string;
  slug: string;
}

export const GENRES = [
  { slug: "hanh-dong", name: "Hành Động" },
  { slug: "vien-tuong", name: "Viễn Tưởng" },
  { slug: "lang-man", name: "Lãng Mạn" },
  { slug: "kinh-di", name: "Kinh Dị" },
  { slug: "vo-thuat", name: "Võ Thuật" },
  { slug: "hai-huoc", name: "Hài Hước" },
  { slug: "truong-hoc", name: "Trường Học" },
  { slug: "trinh-tham", name: "Trinh Thám" },
  { slug: "am-nhac", name: "Âm Nhạc" },
  { slug: "phieu-luu", name: "Phiêu Lưu" },
  { slug: "sieu-nhien", name: "Siêu Nhiên" },
  { slug: "doi-thuong", name: "Đời Thường" },
  { slug: "gia-tuong", name: "Giả Tưởng" },
  { slug: "robot", name: "Robot" },
  { slug: "game", name: "Game" },
  { slug: "the-thao", name: "Thể Thao" },
  { slug: "kich-tinh", name: "Kịch Tính" },
];

export const RANKINGS = [
  {
    slug: "ngay",
    name: "BXH ngày",
  },
  {
    slug: "tuan",
    name: "BXH tuần",
  },
  {
    slug: "thang",
    name: "BXH tháng",
  },
  {
    slug: "nam",
    name: "BXH năm",
  },
];