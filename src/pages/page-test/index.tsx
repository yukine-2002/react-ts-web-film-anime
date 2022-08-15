import "./page.style.css";
import slide from "../../assests/bg-editter.png";
import ItemMedium from "../../component/item-slide/item-medium";
import {
  useFetchRecently,
  useFetchRecommender,
  useFetchStoryRecommender,
} from "../../utils/useFetchSerice";
import SlickCarousel from "../../component/slick-carousel/slick-carousel";
import { settings } from "../../utils/settingCarousel";
import { handlePathInfo } from "../../utils/service";
import Item from "../../component/item-slide/item";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../component/lazyLoading/lazyLoading";
const PageTest = () => {
  const nav = useNavigate();
  const { data: dataStoryRecommender, isSuccess: isSsStoryRecommender } =
    useFetchStoryRecommender();
  const { data: RecommendedData, isSuccess: isRecommended } =
    useFetchRecommender();
  const { data: recentlyData, isSuccess: isRecenLoading } = useFetchRecently();
  return (
    <div className="homepage">
      {isSsStoryRecommender && isRecommended && isRecenLoading ? (
        <div className="container">
          <div className="section-slide">
            <img src={slide} alt="" />
            <div className="content">
              <h1>WELCOME TO</h1>
              <span>Anime Manga</span>
              <div className="button-r">
                <button>ANIME</button>
                <button>MANGA</button>
              </div>
            </div>
          </div>
          <div className="section-recommender">
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
              {dataStoryRecommender?.map((item) => (
                <ItemMedium key={item.name} item={item} />
              ))}
            </SlickCarousel>
          </div>  
          <div className="body section-container">
            <div className="container">
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
                      onClick={() => handlePathInfo(nav, item.slug)}
                    />
                  ))}
                </SlickCarousel>
              </div>
              <div className="update-anime">
                <div className="title m-top-50 m-bottom-50">
                  <h3>Anime Đang cập nhật</h3>
                </div>
                <SlickCarousel
                  setting={settings}
                  className="slick-slider-youlike"
                >
                  {recentlyData?.map((item) => (
                    <Item
                      key={item.slug}
                      anime={item}
                      onClick={() => handlePathInfo(nav, item.slug)}
                    />
                  ))}
                </SlickCarousel>
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

export default PageTest;
