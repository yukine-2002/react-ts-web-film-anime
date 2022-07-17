import SlickCarousel from "../../component/slick-carousel/slick-carousel";
import ItemSlideMovie from "../../component/itemslideMovie/itemslideMovie";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import {
  useFetchMove,
  useFetchRecently,
  useFetchRecommender,
  useFetchSlide,
} from "../../utils/useFetchSerice";
import { Spinner } from "../../component/lazyLoading/lazyLoading";
import Item from "../../component/itemslide/item";
import ItemSliderHeader from "../../component/itemslide/item-slide-header";
import { useEffect, useState } from "react";
import { Anime, AnimeInfo } from "../../utils/type";
import {
  getInfo,
  getSlide,
  handlePath,
  rankDate,
} from "../../utils/service";
import ItemRecommended from "../../component/itemslide/item-recommended";

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
  const { data: SlideData, isSuccess: isSlideLoading } = useFetchSlide();
  const [dataSlide, setDataSlide] = useState<AnimeInfo[]>([]);
  const [dataRecommended, setDataRecommended] = useState<AnimeInfo[]>([]);
  const listLocalStorage: Anime[] = JSON.parse(localStorage.getItem("recent")!);

  useEffect(() => {
    getSlide()
      .then((response) => {
        return response;
      })
      .then((data) => {
        let fromapi = data;
        fromapi.map((item: Anime) =>
          getInfo(item.slug)
            .then((response) => {
              return response;
            })
            .then((data) => {
              let data_api: AnimeInfo = data;
              setDataSlide((oldItem) => {
                const isEx = oldItem.find((item) => item.id === data_api.id);
                if (isEx) {
                  return oldItem;
                }
                return [...oldItem, data_api];
              });
            })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    rankDate()
      .then((response) => {
        return response;
      })
      .then((data) => {
        let fromapi = data;
        fromapi.map((item: Anime) => {
          getInfo(item.slug)
            .then((response) => {
              return response;
            })
            .then((data) => {
              let data_api: AnimeInfo = data;
              setDataRecommended((oldItem) => {
                const isEx = oldItem.find((item) => item.id === data_api.id);
                if (isEx) {
                  return oldItem;
                }
                return [...oldItem, data_api];
              });
            });
        });
      });
  }, []);
  return (
    <div>
      <div className="body">
        <div className="slide p-l-r m-top-100 m-bottom-50">
          <SlickCarousel setting={settingSlide} className="Slider-slick-sl">
            {isSlideLoading ? (
              dataSlide.map((item) => (
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
            {dataRecommended.map((item) => (
              <ItemRecommended key={item.slug} item={item} />
            ))}
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
