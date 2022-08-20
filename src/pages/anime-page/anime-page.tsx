import SlickCarousel from "../../component/slick-carousel/slick-carousel";
import ItemSlideMovie from "../../component/item-slide/item-slide-movie";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import {
  useFetchMove,
  useFetchRankDay,
  useFetchRecently,
  useFetchRecommender,
  useFetchSlide,
} from "../../utils/useFetchSerice";
import { Spinner } from "../../component/lazyLoading/lazyLoading";
import Item from "../../component/item-slide/item";
import ItemSliderHeader from "../../component/item-slide/item-slide-header";
import { useEffect } from "react";
import { Anime } from "../../utils/type";
import { handlePath, handlePathInfo } from "../../utils/service";
import ItemRecommended from "../../component/item-slide/item-recommended";
import { useAppDispatch, useAppSelector } from "../../redux/useTypeSelector";
import {
  fetchAnimeInfoSlide,
  fetchAnimeRank,
} from "../../redux/collection/collection.actions";
import {
  settings,
  settingSlide,
  settingsRcm,
} from "../../utils/settingCarousel";

const AnimePage = () => {
  const nav = useNavigate();
  const { data: recentlyData, isSuccess: isRecenLoading } = useFetchRecently();
  const { data: RecommendedData, isSuccess: isRecommended } =
    useFetchRecommender();
  const { data: MoveData, isSuccess: isMovie } = useFetchMove();
  const { data: SlideData, isSuccess: isSuccessDataSl } = useFetchSlide();
  const { data: RankDayData, isSuccess: isSuccessDataRD } = useFetchRankDay();
  const listLocalStorage: Anime[] = JSON.parse(localStorage.getItem("recent")!);
  const dispatch = useAppDispatch();
  const selectAnimeSlideInfo = useAppSelector(
    (state) => state.collection.animeInfoSlide
  );
    
  const selectAnimeRank = useAppSelector((state) => state.collection.animeRank);
  useEffect(() => {
    dispatch(fetchAnimeInfoSlide(SlideData!) as any);
  }, [isSuccessDataSl]);

  useEffect(() => {
    dispatch(fetchAnimeRank(RankDayData!) as any);
  }, [isSuccessDataRD]);

  return (
    <div>
      <div className="body">
        {isSuccessDataSl &&
        isRecenLoading &&
        isRecommended &&
        isSuccessDataRD &&
        isMovie ? (
          <div>
            <div className="slide p-l-r m-top-100 m-bottom-50">
              <SlickCarousel setting={settingSlide} className="Slider-slick-sl">
                {selectAnimeSlideInfo.map((item,index) => (
                  <ItemSliderHeader key={index} item={item} />
                ))}
              </SlickCarousel>
            </div>

            <div className="trending p-l-r m-top-50 m-bottom-50">
              <div className="title m-bottom-50">
                <h3>Phim mới cập nhật</h3>
              </div>
              <div className="slick-slider-trending">
                {recentlyData
                  .filter((item, index) => index <= 14)
                  .map((item,index) => (
                    <Item
                      key={index}
                      anime={item}
                      onClick={() =>
                        handlePath(nav, item.slug, item.latestEpisode!.name)
                      }
                    />
                  ))}
              </div>
            </div>

            <div className="youlike p-l-r m-top-50 m-bottom-50">
              <div className="title m-bottom-50">
                <h3>Thịnh hành</h3>
              </div>
              <SlickCarousel
                setting={settings}
                className="slick-slider-youlike"
              >
                {RecommendedData.map((item,index) => (
                  <Item
                    key={index}
                    anime={item}
                    onClick={() => handlePathInfo(nav, item.slug)}
                  />
                ))}
              </SlickCarousel>
            </div>
            {listLocalStorage ? (
              <div className="watch p-l-r m-bottom-50">
                <div className="title m-bottom-50">
                  <h3>Xem tiếp</h3>
                </div>
                <SlickCarousel
                  setting={settings}
                  className="slick-slider-watch"
                >
                  {listLocalStorage ? (
                    listLocalStorage.map((item,index) => (
                      <Item
                        key={index}
                        anime={item}
                        onClick={() => handlePath(nav, item.slug, item.time)}
                      />
                    ))
                  ) : (
                    <Spinner />
                  )}
                </SlickCarousel>
              </div>
            ) : (
              ""
            )}

            <div className="recommended p-l-r m-top-50 m-bottom-50">
              <div className="title m-bottom-50">
                <h3>Đề xuất cho bạn</h3>
              </div>
              <SlickCarousel
                setting={settingsRcm}
                className="slick-slider-recommender"
              >
                {selectAnimeRank.map((item,index) => (
                  <ItemRecommended
                    key={index}
                    item={item}
                    onClick={() => handlePathInfo(nav, item.slug)}
                  />
                ))}
              </SlickCarousel>
            </div>

            <div className="movie p-l-r m-top-50 m-bottom-50">
              <div className="title m-bottom-50">
                <h3>Movie</h3>
              </div>
              <SlickCarousel setting={settings} className="slick-slider-movie">
                {MoveData.map((item,index) => (
                  <ItemSlideMovie
                    key={index}
                    anime={item}
                    onClick={() => handlePathInfo(nav, item.slug)}
                  />
                ))}
              </SlickCarousel>
            </div>
          </div>
        ) : (
          <Spinner timeLoading={100000} />
        )}
      </div>
    </div>
  );
};
export default AnimePage;
