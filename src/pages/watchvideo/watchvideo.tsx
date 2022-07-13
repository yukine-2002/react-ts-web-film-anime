import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Episode from "../../component/episode/episode";
import { Spinner } from "../../component/lazyLoading/lazyLoading";
import VideoPlayer from "../../component/videoplayer/videoplayer";
import { useFetchInfor, useFetchSoure } from "../../utils/useFetchSerice";
import "./watchvideo.style.css";

const WatchVideo = () => {
  const param = useParams();
  const { slug, name } = param;
  const { data: info, isSuccess: isInfoLoading } = useFetchInfor(slug!);

  const filterFilm = info?.episodes.filter(
    (item, index) => item.full_name === name
  )[0];
  const { data: source } = useFetchSoure(
    info?.id!,
    filterFilm?.name! - 1 || 0,
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
           text="films đang được cập nhật vui lòng trở lại sau"
         />
        ) : source?.videoSource ? (
          <VideoPlayer source={source} info={info} />
        ) : (
          <Spinner
            isLoading={source?.videoSource ? true : false}
            text="films đang được cập nhật vui lòng trở lại sau"
          />
        )}
        <div className="intro">
          <div className="title m-top-50 m-bottom-50">
            <h3>
              {source?.film_name || info?.name} - {source?.full_name}
            </h3>
          </div>

          <div className="intro-content">
            <div className="intro-view">
              <h4>Lượt xem :</h4>
              <span>{source?.views} Lượt xem</span>
            </div>

            <h4>Thê loại :</h4>
            <div className="intro-genres">
              {info?.genres.map((item) => (
                <div key={item.slug} className="intro-genres-collection">
                  <span style={{ background: `${randomColor()}` }}>
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
            <h4>Team Sub :</h4>
            <div className="teamsub">
              <span>Phim 1080</span>
            </div>
            <h4>Nội dung :</h4>
            <div className="intro-description">
              <p>{info?.description}</p>
            </div>
          </div>

          <div className="episode-title">
            <h4>Danh sách các tập</h4>
          </div>
        </div>
        <Episode animeInfo={info!} />
      </div>
    </div>
  );
};

export default WatchVideo;
