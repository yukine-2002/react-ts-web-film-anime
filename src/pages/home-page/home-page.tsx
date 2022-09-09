import "./page.style.css";
import slide from "../../assests/bg-editter.png";
import ItemMedium from "../../component/item-slide/item-medium";
import {
  useFetchNewChapStory,
  useFetchNewStory,
  useFetchRankDay,
  useFetchRankMonth,
  useFetchRecently,
  useFetchRecommender,
  useFetchSlide,
  useFetchStoryComplete,
  useFetchStoryRecommender,
} from "../../utils/useFetchSerice";
import SlickCarousel from "../../component/slick-carousel/slick-carousel";
import {
  settingCustom,
  settingItem,
  settings,
  settingsRcm,
} from "../../utils/settingCarousel";
import Item from "../../component/item-slide/item";
import { useLocation, useNavigate } from "react-router-dom";
import { Spinner } from "../../component/lazyLoading/lazyLoading";
import { useAppDispatch, useAppSelector } from "../../redux/useTypeSelector";
import { useEffect } from "react";
import {
  fetchAnimeInfoSlide,
  fetchAnimeRank,
} from "../../redux/collection/collection.actions";
import ItemSliderHeader from "../../component/item-slide/item-slide-header";
import ItemRecommended from "../../component/item-slide/item-recommended";
const HomePage = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const handlePathNameAnime = (slug: string) => {
    if (pathname.includes("anime")) {
      nav(`${slug}`);
    } else {
      nav(`anime/${slug}`);
    }
  };
  const { data: dataStoryRecommender, isSuccess: isSsStoryRecommender } =
    useFetchStoryRecommender();
  const { data: dataStoryComplete, isSuccess: isSsStoryComplete  } =
    useFetchStoryComplete();
  const { data: dataNewStory, isSuccess: isSsNewStory } = useFetchNewStory();
  const { data: RecommendedData, isSuccess: isRecommended } =
    useFetchRecommender();

  const { data: recentlyData, isSuccess: isRecenLoading } = useFetchRecently();
  const selectAnimeSlideInfo = useAppSelector(
    (state) => state.collection.animeInfoSlide
  );
  
  const { data: RankDayData, isSuccess: isSuccessDataRD } = useFetchRankDay();
  const { data: rankMonthData, isSuccess: isSuccessRankMonth } = useFetchRankMonth();
  const { data: dataNewChapStory, isSuccess: isSsNewChapStory } =
    useFetchNewChapStory();
  const selectAnimeRank = useAppSelector((state) => state.collection.animeRank);
  const { data: SlideData, isSuccess: isSuccessDataSl } = useFetchSlide();
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(fetchAnimeInfoSlide(SlideData!) as any);
    dispatch(fetchAnimeRank(RankDayData!) as any);
  }, [isSuccessDataSl, isSuccessDataRD]);
  
  return (
    <div className="homepage">
      {isSsStoryRecommender &&
      isRecommended &&
      isRecenLoading &&
      isSsNewStory &&
      isSsStoryComplete &&
      isSuccessDataRD &&
      isSsNewChapStory ? (
        <div className="containers">
          <div className="section-slide">
            <img src={slide} alt="" />
            <div className="content">
              <h1>WELCOME TO</h1>
              <span>Anime Manga</span>
              {/* <div className="button-r">
                <button>ANIME</button>
                <button>MANGA</button>
              </div> */}
            </div>
          </div>
          <div className="section-recommender">
            <SlickCarousel setting={settingCustom} className="Slider-slick-sl">
              {dataStoryRecommender?.map((item) => (
                <ItemMedium key={item.name} item={item} />
              ))}
            </SlickCarousel>
          </div>
          <div className="body section-container">
            <div className="containers">
              <div className="hot-anime">
                <div className="title m-bottom-50">
                  <h3>Anime Thịnh hành</h3>
                </div>
                <SlickCarousel
                  setting={settings}
                  className="slick-slider-youlike"
                >
                  {RecommendedData?.map((item) => (
                    <Item
                      key={item.slug}
                      anime={item}
                      onClick={() => handlePathNameAnime(item.slug)}
                    />
                  ))}
                </SlickCarousel>
              </div>
              <div className="update-anime">
                <div className="title m-top-50 m-bottom-50">
                  <h3>Anime Hot</h3>
                </div>
                <SlickCarousel
                  setting={settings}
                  className="slick-slider-youlike"
                >
                  {rankMonthData?.map((item) => (
                    <Item
                      key={item.slug}
                      anime={item}
                      onClick={() => handlePathNameAnime(item.slug)}
                    />
                  ))}
                </SlickCarousel>
              </div>
              <div className="slide p-l-r m-top-50 m-bottom-50">
                <SlickCarousel
                  setting={settingItem}
                  className="Slider-slick-sl"
                >
                  {selectAnimeSlideInfo.map((item, index) => (
                    <ItemSliderHeader key={index} item={item} />
                  ))}
                </SlickCarousel>
              </div>
              <div className="newUpdate p-l-r m-top-50 m-bottom-50">
                <div className="title m-bottom-50">
                  <h3>Manga hot</h3>
                </div>
                <SlickCarousel
                  setting={settingCustom}
                  className="Slider-slick-sl"
                >
                  {dataNewStory?.map((item) => (
                    <ItemMedium key={item.name} item={item} />
                  ))}
                </SlickCarousel>
              </div>
              <div className="story-complete p-l-r m-top-50 m-bottom-50">
                <div className="title m-bottom-50">
                  <h3>Manga đã hoàn thành</h3>
                </div>
                <div className="slick-slider-trending">
                  {dataStoryComplete
                    ?.filter((_, index) => index < 16)
                    .map((item) => (
                      <ItemMedium key={item.slug} item={item} />
                    ))}
                </div>
              </div>
              <div className="recommended p-l-r m-bottom-50">
                <div className="title m-bottom-50">
                  <h3>Đề xuất cho bạn</h3>
                </div>
                <SlickCarousel
                  setting={settingsRcm}
                  className="slick-slider-recommender"
                >
                  {selectAnimeRank.map((item, index) => (
                    <ItemRecommended
                      key={index}
                      item={item}
                      onClick={() => handlePathNameAnime(item.slug)}
                    />
                  ))}
                </SlickCarousel>
              </div>
              <div className="newUpdate p-l-r m-bottom-50">
                <div className="title m-bottom-50">
                  <h3>Manga mới cập nhật</h3>
                </div>
                <div className="slick-slider-trending">
                  {dataNewChapStory
                    ?.filter((_, index) => index < 16)
                    .map((item) => (
                      <ItemMedium key={item.slug} item={item} />
                    ))}
                </div>
              </div>

              <div className="trending p-l-r m-top-50 m-bottom-50">
                <div className="title m-bottom-50">
                  <h3>Anime mới cập nhật</h3>
                </div>
                <div className="slick-slider-trending">
                  {recentlyData
                    .filter((item, index) => index <= 14)
                    .map((item, index) => (
                      <Item
                        key={index}
                        anime={item}
                        onClick={() => handlePathNameAnime(item.slug)}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Spinner timeLoading={100000} />
      )}
    </div>
  );
};

export default HomePage;
