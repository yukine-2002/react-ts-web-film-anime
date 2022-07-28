import { Story } from "../../utils/type";
import { actions } from "./story.action";
import { StoryType } from "./story.type";

interface typeState {
  storyNewChap: Story[] | null;
  newStory: Story[] | null;
  storyRecommender: Story[] | null;
  storyComplete: Story[] | null;
  storyHot: Story[] | null;
  storyUpdate: Story[] | null;
  rankDay: Story[] | null;
}
const INITIAL_STATE = {
  storyNewChap: null,
  newStory: null,
  storyRecommender: null,
  storyComplete: null,
  storyHot: null,
  storyUpdate: null,
  rankDay: null,
};

const storyReducer = (state: typeState = INITIAL_STATE, action: actions) => {
  switch (action.type) {
    case StoryType.FETCH_STORY_NEW_CHAP:
      return {
        ...state,
        storyNewChap: action.payload,
      };
    case StoryType.FETCH_STORY_NEW:
      return {
        ...state,
        newStory: action.payload,
      };
    case StoryType.FETCH_STORY_RECOMMENDER:
      return {
        ...state,
        storyRecommender: action.payload,
      };
    case StoryType.FETCH_STORY_COMPLETE:
      return {
        ...state,
        storyComplete: action.payload,
      };
    case StoryType.FETCH_STORY_UPDATE:
      return {
        ...state,
        storyUpdate: action.payload,
      };
    case StoryType.FETCH_STORY_HOT:
      return {
        ...state,
        storyHot: action.payload,
      };
    case StoryType.FETCH_STORY_RANK_DAY:
      return {
        ...state,
        rankDay: action.payload,
      };

    default:
      return state;
  }
};
export default storyReducer;
