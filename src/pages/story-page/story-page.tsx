import { useEffect } from "react";
import ItemMedium from "../../component/item-slide/item-medium";
import { Spinner } from "../../component/lazyLoading/lazyLoading";
import {
  fetchStoryComplete,
  fetchStoryNew,
  fetchStoryNewChap,
  fetchStoryRecommender,
  fetchStoryUpdate,
} from "../../redux/story/story.action";
import { useAppDispatch, useAppSelector } from "../../redux/useTypeSelector";
import "./story.style.css";
import {
  useFetchNewChapStory,
  useFetchNewStory,
  useFetchStoryComplete,
  useFetchStoryRecommender,
  useFetchStoryUpdate,
} from "../../utils/useFetchSerice";
import ItemLarge from "../../component/item-slide/item-large";
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
  const selectStoryComplete = useAppSelector(
    (state) => state.story.storyComplete
  );
  const selectStoryUpdate = useAppSelector((state) => state.story.storyUpdate);
  const { data: dataNewChapStory, isSuccess: isSsNewChapStory } =
    useFetchNewChapStory();
  const { data: dataNewStory, isSuccess: isSsNewStory } = useFetchNewStory();
  const { data: dataStoryRecommender, isSuccess: isSsStoryRecommender } =
    useFetchStoryRecommender();
  const { data: dataStoryComplete, isSuccess: isSsStoryComplete } =
    useFetchStoryComplete();
  const { data: dataStoryUpdate, isSuccess: isSsStoryUpdate } =
    useFetchStoryUpdate();
  useEffect(() => {
    dispatch(fetchStoryNewChap(dataNewChapStory!) as any);
    dispatch(fetchStoryNew(dataNewStory!) as any);
    dispatch(fetchStoryRecommender(dataStoryRecommender!) as any);
    dispatch(fetchStoryComplete(dataStoryComplete!) as any);
    dispatch(fetchStoryUpdate(dataStoryUpdate!) as any);
  }, [
    isSsNewChapStory,
    isSsNewStory,
    isSsStoryRecommender,
    isSsStoryComplete,
    isSsStoryUpdate,
  ]);

  return (
    <div className="story_page body m-top-100">
      {isSsNewChapStory &&
      isSsNewStory &&
      isSsStoryRecommender &&
      isSsStoryComplete &&
      isSsStoryUpdate ? (
        <div>
          <div className="story_page_container">
            <div className="newUpdate p-l-r m-top-50 m-bottom-50">
              <div className="title m-bottom-50">
                <h3>Truy???n m???i c???p nh???t</h3>
              </div>
              <div className="slick-slider-trending">
                {selectNewChapStory
                  ?.filter((_, index) => index < 16)
                  .map((item) => (
                    <ItemMedium key={item.slug} item={item} />
                  ))}
              </div>
            </div>

            <div className="newStory p-l-r m-top-50 m-bottom-50">
              <div className="title m-bottom-50">
                <h3>Truy???n m???i</h3>
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
                {selectNewStory?.map((item) => (
                  <ItemLarge key={item.name} item={item} />
                ))}
              </SlickCarousel>
            </div>

            <div className="newUpdate p-l-r m-top-50 m-bottom-50">
              <div className="title m-bottom-50">
                <h3>?????ng b??? l???</h3>
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
                {selectStoryRecommender?.map((item) => (
                  <ItemMedium key={item.name} item={item} />
                ))}
              </SlickCarousel>
            </div>

            <div className="story-complete p-l-r m-top-50 m-bottom-50">
              <div className="title m-bottom-50">
                <h3>???? ho??n th??nh</h3>
              </div>
              <div className="slick-slider-trending">
                {selectStoryComplete
                  ?.filter((_, index) => index < 16)
                  .map((item) => (
                    <ItemMedium key={item.slug} item={item} />
                  ))}
              </div>
            </div>

            <div className="story-update p-l-r m-top-50 m-bottom-50">
              <div className="title m-bottom-50">
                <h3>??ang c???p nh???t</h3>
              </div>
              <div className="slick-slider-trending">
                {selectStoryUpdate
                  ?.filter((_, index) => index < 16)
                  .map((item) => (
                    <ItemMedium key={item.slug} item={item} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default StoryPage;
