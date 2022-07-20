import SlickCarousel from "../../component/slick-carousel/slick-carousel";
import ItemSlideMovie from "../../component/itemslideMovie/itemslideMovie";
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
import Item from "../../component/itemslide/item";
import ItemSliderHeader from "../../component/itemslide/item-slide-header";
import { useEffect} from "react";
import { Anime} from "../../utils/type";
import { handlePath } from "../../utils/service";
import ItemRecommended from "../../component/itemslide/item-recommended";
import { useAppDispatch, useAppSelector } from "../../redux/useTypeSelector";
import {
  fetchAnimeInfoSlide,
  fetchAnimeRank,
} from "../../redux/collection/collection.actions";

const settings = {
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
  initialSlide: 0,

  responsive: [
    {
      breakpoint: 1460,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
      },
    },
    {
      breakpoint: 1260,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
      },
    },
    {
      breakpoint: 750,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 530,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
const settingSlide = {
  dots: true,
  infinite: true,
  speed: 3000,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 25000,
};

const settingsRcm = {
  infinite: true,
  slidesToShow: 4,
  speed: 500,

  responsive: [
    {
      breakpoint: 1460,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1260,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 750,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
      },
    },
    {
      breakpoint: 450,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const HomePage = () => {
  const nav = useNavigate();
  const { data: recentlyData, isSuccess: isRecenLoading } = useFetchRecently();
  const { data: RecommendedData, isSuccess: isRecommended } =
    useFetchRecommender();
  const { data: MoveData, isSuccess: isMovie } = useFetchMove();
  const { data: SlideData , isSuccess : isSuccessDataSl} = useFetchSlide();
  const { data: RankDayData , isSuccess : isSuccessDataRD } = useFetchRankDay();
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
        <div className="slide p-l-r m-top-100 m-bottom-50">
          <SlickCarousel setting={settingSlide} className="Slider-slick-sl">
            {isSuccessDataSl ? (
              selectAnimeSlideInfo.map((item) => (
                <ItemSliderHeader key={item.slug} item={item} />
              ))
            ) : (
              <Spinner />
            )}
          </SlickCarousel>
        </div>

        <div className="trending p-l-r m-top-50 m-bottom-50">
          <div className="title m-bottom-50">
            <h3>Phim mới cập nhật</h3>
          </div>
          <div className="slick-slider-trending">
            {isRecenLoading ? (
              recentlyData
                .filter((item, index) => index <= 14)
                .map((item) => (
                  <Item
                    key={item.slug}
                    anime={item}
                    onClick={() =>
                      handlePath(nav, item.slug, item.latestEpisode!.name)
                    }
                  />
                ))
            ) : (
              <Spinner />
            )}
          </div>
        </div>

        <div className="youlike p-l-r m-top-50 m-bottom-50">
          <div className="title m-bottom-50">
            <h3>Thịnh hành</h3>
          </div>
          <SlickCarousel setting={settings} className="slick-slider-youlike">
            {isRecommended ? (
              RecommendedData.map((item) => (
                <Item
                  key={item.slug}
                  anime={item}
                  onClick={() => handlePath(nav, item.slug, item.name)}
                />
              ))
            ) : (
              <Spinner />
            )}
          </SlickCarousel>
        </div>

        {listLocalStorage ? (
          <div className="watch p-l-r m-top-50 m-bottom-50">
            <div className="title m-bottom-50">
              <h3>Xem tiếp</h3>
            </div>
            <SlickCarousel setting={settings} className="slick-slider-watch">
              {listLocalStorage ? (
                listLocalStorage.map((item) => (
                  <Item
                    key={item.slug}
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
            { isSuccessDataRD ?
            selectAnimeRank.map((item) => (
              <ItemRecommended key={item.slug} item={item} />
            )) : (
              <Spinner />
            ) }
          </SlickCarousel>
        </div>

        <div className="movie p-l-r m-top-50 m-bottom-50">
          <div className="title m-bottom-50">
            <h3>Movie</h3>
          </div>
          <SlickCarousel setting={settings} className="slick-slider-movie">
            {isMovie ? (
              MoveData.map((item) => (
                <ItemSlideMovie
                  key={item.slug}
                  anime={item}
                  onClick={() => handlePath(nav, item.slug, item.name)}
                />
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
export default HomePage;
