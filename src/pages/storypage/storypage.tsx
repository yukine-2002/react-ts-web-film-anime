import { useEffect } from "react";
import ItemMedium from "../../component/itemslide/item-medium";
import { Spinner } from "../../component/lazyLoading/lazyLoading";
import {
  fetchStoryNew,
  fetchStoryNewChap,
  fetchStoryRecommender,
} from "../../redux/story/story.action";
import { useAppDispatch, useAppSelector } from "../../redux/useTypeSelector";
import "./story.style.css";
import {
  useFetchNewChapStory,
  useFetchNewStory,
  useFetchStoryRecommender,
} from "../../utils/useFetchSerice";
import ItemLarge from "../../component/itemslide/itemlarge";
import SlickCarousel from "../../component/slick-carousel/slick-carousel";
import { settings, settingSlide } from "../../utils/settingCarousel";

const StoryPage = () => {
  const dispatch = useAppDispatch();
  const selectNewChapStory = useAppSelector(
    (state) => state.story.storyNewChap
  );
  const selectNewStory = useAppSelector((state) => state.story.newStory);
  const selectStoryRecommender = useAppSelector(
    (state) => state.story.storyRecommender
  );
  const { data: dataNewChapStory, isSuccess: isSsNewChapStory } =
    useFetchNewChapStory();
  const { data: dataNewStory, isSuccess: isSsNewStory } = useFetchNewStory();
  const { data: dataStoryRecommender, isSuccess: isSsStoryRecommender } =
    useFetchStoryRecommender();
    
  useEffect(() => {
    dispatch(fetchStoryNewChap(dataNewChapStory!) as any);
    dispatch(fetchStoryNew(dataNewStory!) as any);
    dispatch(fetchStoryRecommender(dataStoryRecommender!) as any);
  }, [isSsNewChapStory, isSsNewStory, isSsStoryRecommender]);

  return (
    <div className="story_page body m-top-100">
      <div className="story_page_container">
        <div className="newUpdate p-l-r m-top-50 m-bottom-50">
          <div className="title m-bottom-50">
            <h3>Truyện mới cập nhật</h3>
          </div>
          <div className="slick-slider-trending">
            {isSsNewChapStory ? (
              selectNewChapStory
                ?.filter((_, index) => index < 16)
                .map((item) => <ItemMedium key={item.slug} item={item} />)
            ) : (
              <Spinner />
            )}
          </div>
        </div>

        <div className="newStory p-l-r m-top-50 m-bottom-50">
          <div className="title m-bottom-50">
            <h3>Truyện mới</h3>
          </div>
          <SlickCarousel
            setting={{
              ...settings,
              slidesToShow: 8,
              responsive: [
                {
                  breakpoint: 1460,
                  settings: {
                    slidesToShow: 6,
                  },
                },
                {
                  breakpoint: 1160,
                  settings: {
                    slidesToShow: 4,
                  },
                },
                {
                  breakpoint: 760,
                  settings: {
                    slidesToShow: 3,
                  },
                },
                {
                  breakpoint: 560,
                  settings: {
                    slidesToShow: 2,
                  },
                },
              ],
            }}
            className="Slider-slick-sl"
          >
            {isSsNewStory ? (
              selectNewStory?.map((item) => (
                <ItemLarge key={item.name} item={item} />
              ))
            ) : (
              <Spinner />
            )}
          </SlickCarousel>
        </div>

        <div className="newUpdate p-l-r m-top-50 m-bottom-50">
          <div className="title m-bottom-50">
            <h3>Đừng bỏ lỡ</h3>
          </div>
          <SlickCarousel
            setting={{
              ...settings,
              slidesToShow: 8,
              responsive: [
                {
                  breakpoint: 1460,
                  settings: {
                    slidesToShow: 6,
                  },
                },
                {
                  breakpoint: 1160,
                  settings: {
                    slidesToShow: 4,
                  },
                },
                {
                  breakpoint: 760,
                  settings: {
                    slidesToShow: 3,
                  },
                },
                {
                  breakpoint: 560,
                  settings: {
                    slidesToShow: 2,
                  },
                },
              ],
            }}
            className="Slider-slick-sl"
          >
            {isSsStoryRecommender ? (
              selectStoryRecommender?.map((item) => (
                <ItemMedium key={item.name} item={item} />
              ))
            ) : (
              <Spinner />
            )}
          </SlickCarousel>
        </div>
      </div>
    </div>
  );
};

export default StoryPage;
