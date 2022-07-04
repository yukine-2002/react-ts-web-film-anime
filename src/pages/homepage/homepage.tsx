import SlickCarousel from "../../component/slick-carousel/slick-carousel";
import slideBg from "../../assests/violet-evergarden-zheleznaia-ruka-krov-v-profil-krasnaia-len.jpg";
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

const settings = {
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  speed: 500,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1460,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 1260,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
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
  autoplaySpeed: 15000,
};

const HomePage = () => {
  const nav = useNavigate();
  const { data: recentlyData, isSuccess: isRecenLoading } = useFetchRecently();
  const { data: RecommendedData, isSuccess: isRecommended } =
    useFetchRecommender();
  const { data: MoveData, isSuccess: isMovie } = useFetchMove();
  const { data: SlideData, isSuccess: isSlideLoading } = useFetchSlide();
  const handlePath = (slug: string, name: string) => {
    console.log(name);
    nav(`/watch/${slug}/${name}`);
  };
  return (
    <div>
      <div className="body">
        <div className="slide p-l-r m-top-100 m-bottom-50">
          <ItemSliderHeader />
          {/* <SlickCarousel setting={settingSlide} className="Slider-slick-sl">
          {isSlideLoading ? (
            SlideData.map((item) => (
              <ItemSlideMovie
                key={item.slug}
                anime={item}
                onClick={() => handlePath(item.slug, item.name)}
              />
            ))
          ) : (
            <Spinner />
          )}
        </SlickCarousel> */}
        </div>

        <div className="trending p-l-r m-top-50 m-bottom-50">
          <div className="title m-bottom-50">
            <h3>Phim mới cập nhật</h3>
          </div>
          <div className="slick-slider-trending">
            {isRecenLoading ? (
              recentlyData
                .filter((item, index) => index <= 11)
                .map((item) => (
                  <Item
                    key={item.slug}
                    anime={item}
                    onClick={() =>
                      handlePath(item.slug, item.latestEpisode!.name)
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
            <h3>Có thể bạn sẽ thích</h3>
          </div>
          <SlickCarousel setting={settings} className="slick-slider-youlike">
            {isRecommended ? (
              RecommendedData.map((item) => (
                <Item
                  key={item.slug}
                  anime={item}
                  onClick={() => handlePath(item.slug, item.name)}
                />
              ))
            ) : (
              <Spinner />
            )}
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
                  onClick={() => handlePath(item.slug, item.name)}
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
