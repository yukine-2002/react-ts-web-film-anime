import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Episode from "../../component/episode/episode";
import Item from "../../component/item-slide/item";
import ItemRecommended from "../../component/item-slide/item-recommended";
import { Spinner } from "../../component/lazyLoading/lazyLoading";
import SlickCarousel from "../../component/slick-carousel/slick-carousel";
import { fetchAnimeRank } from "../../redux/collection/collection.actions";
import { useAppDispatch, useAppSelector } from "../../redux/useTypeSelector";
import { handlePathInfo } from "../../utils/service";
import { settingEpisode, settings, settingsRcm } from "../../utils/settingCarousel";
import { useFetchInfor, useFetchRankDay, useFetchRecommender } from "../../utils/useFetchSerice";
import "./info-anime-page.style.css";

const InfoAnimePage = () => {
  const param = useParams();
  const nav = useNavigate()
  const { slug } = param;
  const location = useLocation()
  const { data, isSuccess } = useFetchInfor(slug!);
  const { data: RankDayData, isSuccess: isSuccessDataRD } = useFetchRankDay();
  const { data: RecommendedData, isSuccess: isRecommended } =
  useFetchRecommender();
  const selectAnimeRank = useAppSelector((state) => state.collection.animeRank);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAnimeRank(RankDayData!) as any);
  }, [isSuccessDataRD]);
 
  const handleChangePath = (path: string) => {
    if(slug){
     var  pathP =location.pathname.split("/")
     pathP[pathP.length - 1] = path
     nav(pathP.join("/"));
    }else{
      console.log(2)
      nav(path);
    }
  
  };
  function randomColor() {
    return (
      "#" +
      Array.from({ length: 6 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join("")
    );
  }
  return (
    <div>
      {isSuccess && isRecommended && isSuccessDataRD? (
        <div className="info-anime-page">
          <div className="bg-info-anime-page">
            <img src={data?.thumbnail} alt="" />
          </div>

          <div className="body header-info-anime-page">
            <div className="header-info-anime">
              <div className="header-info">
                {/* <div className="header-info-image">
                  <img src={data?.thumbnail} alt="" />
                </div> */}

                <div className="header-info-content">
                  <div className="anime-name">
                    <h4>{data?.name}</h4>
                  </div>
                  <div className="info-base">
                    <div className="anime-info-c">
                      <div>
                        {" "}
                        <span>S??? t???p :</span>
                      </div>
                      <div style={{ marginLeft: "10px" }}>
                        <span>{data.episodes.length} t???p</span>
                      </div>
                    </div>
                    <div className="anime-info-c">
                      <div>
                        <span>Th?? lo???i :</span>
                      </div>

                      <div className="intro-genres">
                        {data?.genres.map((item) => (
                          <div
                            key={item.slug}
                            className="intro-genres-collection"
                          >
                            <span style={{ background: `${randomColor()}` }}>
                              {item.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="anime-info-c">
                      <div>
                        <span>Team subs :</span>
                      </div>

                      <div className="intro-genres">
                        {data?.subTeams.map((item) => (
                          <div key={item}>
                            <span style={{ background: `${randomColor()}` }}>
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="anime-info-c">
                      <div>
                        {" "}
                        <span>L?????t ?????c : </span>
                      </div>
                      <div className="views-info-anime">
                        <span>{data?.views} l?????t xem</span>
                      </div>
                    </div>
                  </div>
                  <div className="content">
                    <h4>N???i dung : </h4>
                    <p>{data?.description}</p>
                  </div>
                  <div className="button-read">
                    <button>Xem t???p 1</button>
                    <button>Xem t???p m???i nh???t</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space"></div>
          <div className="body body-info-anime">
            <div className="episode-anime">
              <div className="title">
                <h3>Danh s??ch c??c T???p</h3>
              </div>
              <div className="anime-collection " style={{ marginTop: "30px" }}>
                <SlickCarousel
                  setting={settingEpisode}
                  className="episode-list"
                >
                  {data.episodes.map((item) => (
                    <Episode key={item.id} Episodes={item!} />
                  ))}
                </SlickCarousel>
              </div>
            </div>

            <div className="recommended p-l-r m-top-50 m-bottom-50">
              <div className="title m-bottom-50">
                <h3>????? xu???t cho b???n</h3>
              </div>
              <SlickCarousel
                setting={settingsRcm}
                className="slick-slider-recommender"
              >
                {selectAnimeRank.map((item) => (
                  <ItemRecommended key={item.slug} item={item}  onClick={() => handleChangePath(item.slug)}/>
                ))}
              </SlickCarousel>
            </div>

            <div className="youlike p-l-r m-top-50 m-bottom-50">
              <div className="title m-bottom-50">
                <h3>Th???nh h??nh</h3>
              </div>
              <SlickCarousel
                setting={settings}
                className="slick-slider-youlike"
              >
                {RecommendedData?.map((item) => (
                  <Item
                    key={item.slug}
                    anime={item}
                    onClick={() => handleChangePath(item.slug)}
                  />
                ))}
              </SlickCarousel>
            </div>

          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default InfoAnimePage;
