import { useParams } from "react-router-dom";
import Episode from "../../component/episode/episode";
import { Spinner } from "../../component/lazyLoading/lazyLoading";
import SlickCarousel from "../../component/slick-carousel/slick-carousel";
import VideoPlayer from "../../component/videoplayer/videoplayer";
import { settingEpisode } from "../../utils/settingCarousel";
import { useFetchInfor, useFetchSoure } from "../../utils/useFetchSerice";
import "./watch-video.style.css";

const WatchVideo = () => {
  const param = useParams();
  const { slug, name } = param;
  const { data: info, isSuccess: isInfoLoading } = useFetchInfor(slug!);

  const filterFilm = info?.episodes.filter(
    (item, index) => item.full_name === name
  )[0];
  const { data: source } = useFetchSoure(
    info?.id!,
    filterFilm?.name! - 1 < 0 ? 0 : filterFilm?.name! - 1 || 0,
    isInfoLoading
  );

  function randomColor() {
    return (
      "#" +
      Array.from({ length: 6 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join("")
    );
  }

  return (
    <div className="body">
      <div className="video-container">
        {source === undefined ? (
          <Spinner
            isLoading={false}
            timeLoading={100000}
            text="films đang được cập nhật vui lòng trở lại sau"
          />
        ) : source?.videoSource ? (
          <div>
            <VideoPlayer source={source} info={info} />
            <div className="title m-top-50 m-bottom-50">
              <h3>
                {source?.film_name || info?.name} - {source?.full_name}
              </h3>
            </div>
          </div>
        ) : (
          <Spinner
            isLoading={source?.videoSource ? true : false}
            timeLoading={100000}
            text="films đang được cập nhật vui lòng trở lại sau"
          />
        )}
        <div className="intro">
          <div className="episode-anime">
            <div className="episode-title">
              <h4>Danh sách các tập</h4>
            </div>
            <SlickCarousel setting={settingEpisode} className="episode-list">
               {
                info?.episodes.map(item => <Episode key={item.id} Episodes={item!} />)
               }     
            </SlickCarousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchVideo;
