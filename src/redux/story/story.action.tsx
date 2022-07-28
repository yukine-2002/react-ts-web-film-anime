import { Story } from "../../utils/type";
import { StoryType } from "./story.type";
import { Dispatch } from "redux";
import { newChapStory } from "../../utils/service";
import { useFetchNewChapStory } from "../../utils/useFetchSerice";

export interface fetchStoryNewChap {
  type: StoryType.FETCH_STORY_NEW_CHAP;
  payload: Story[];
}
export interface fetchStoryNew {
  type: StoryType.FETCH_STORY_NEW;
  payload: Story[];
}
export interface fetchStoryRecommender {
  type: StoryType.FETCH_STORY_RECOMMENDER;
  payload: Story[];
}
export interface fetchStoryComplete {
  type: StoryType.FETCH_STORY_COMPLETE;
  payload: Story[];
}
export interface fetchStoryUpdate {
  type: StoryType.FETCH_STORY_UPDATE;
  payload: Story[];
}
export interface fetchStoryHot {
  type: StoryType.FETCH_STORY_HOT;
  payload: Story[];
}
export interface fetchStoryRankDay {
  type: StoryType.FETCH_STORY_RANK_DAY;
  payload: Story[];
}

export type actions =
  | fetchStoryNewChap
  | fetchStoryNew
  | fetchStoryRecommender
  | fetchStoryComplete
  | fetchStoryUpdate
  | fetchStoryHot
  | fetchStoryRankDay;

export const fetchStoryNewChap = (data: Story[]) => {
  return (dispath: Dispatch) => {
    dispath({
      type: StoryType.FETCH_STORY_NEW_CHAP,
      payload: data,
    });
  };
};
export const fetchStoryNew = (data: Story[]) => {
  return (dispath: Dispatch) => {
    dispath({
      type: StoryType.FETCH_STORY_NEW,
      payload: data,
    });
  };
};

export const fetchStoryRecommender = (data: Story[]) => {
  return (dispath: Dispatch) => {
    dispath({
      type: StoryType.FETCH_STORY_RECOMMENDER,
      payload: data,
    });
  };
};
export const fetchStoryComplete = (data: Story[]) => {
  return (dispath: Dispatch) => {
    dispath({
      type: StoryType.FETCH_STORY_COMPLETE,
      payload: data,
    });
  };
};
export const fetchStoryUpdate = (data: Story[]) => {
  return (dispath: Dispatch) => {
    dispath({
      type: StoryType.FETCH_STORY_UPDATE,
      payload: data,
    });
  };
};
export const fetchStoryHot = (data: Story[]) => {
  return (dispath: Dispatch) => {
    dispath({
      type: StoryType.FETCH_STORY_HOT,
      payload: data,
    });
  };
};
export const fetchStoryRankDay = (data: Story[]) => {
  return (dispath: Dispatch) => {
    dispath({
      type: StoryType.FETCH_STORY_RANK_DAY,
      payload: data,
    });
  };
};
