import { useLocation, useNavigate } from "react-router-dom";
import { AnimeInfo } from "../../utils/type";
import SlickCarousel from "../slick-carousel/slick-carousel";

interface propEpisode {
  animeInfo: AnimeInfo;
}


const Episode = ({ animeInfo }: propEpisode) => {
  const Nav = useNavigate()
  const location = useLocation();
 
  const handleChangePath = (path : string) => {
    const route = location.pathname.split('/')
    route[route.length - 1] = path
    Nav(route.join('/')) 
  }
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [

      {
        breakpoint: 1460,
        settings: {
          slidesToShow: 4,
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
          slidesToShow: 3,
          slidesToScroll: 1,
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
  return (
    <div className="episode">
      <SlickCarousel setting={settings} className="episode-list" >
        {animeInfo?.episodes!.map((item) => (
          <div key={item.id} className="episode-item" onClick={() =>handleChangePath(item.full_name === 'Full' ? item.film_name : item.full_name)}>
            <div className="episode-item-img">
              <i className="material-icons circle"> play_arrow </i>
              <img src={item.thumbnail_medium} alt="" />
            </div>
            <div className="episode-item-content">
              <div className="episode-item-name">
                <span>{item.full_name === 'Full' ? item.film_name : item.full_name}</span>
              </div>
              <div className="view">
                <span>{item.views} Lượt xem</span>
              </div>
            </div>
          </div>
        ))}
      </SlickCarousel>
    </div>
  );
};

export default Episode;
