import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Spinner } from "../../component/lazyLoading/lazyLoading";
import {
  useFetchGeInfoStory,
  useFetchGetImgStory,
} from "../../utils/useFetchSerice";
import "./read-story-page.style.css";

const ReadStoryPage = () => {
  const { slug, chap } = useParams();
  const nav = useNavigate();
  const location = useLocation();
  const { data, isSuccess } = useFetchGeInfoStory(slug!);
  const { data: imgData, isSuccess: isSuccessFetch } = useFetchGetImgStory(
    slug!,
    chap!,
    isSuccess
  );
  const handleRouterChap = (chap: string) => {
    const newUrl = location.pathname.split("/");
    newUrl[newUrl.length - 1] = chap;
    nav(newUrl.join("/"));
  };
  const preChap = () => {
    const arr: any = chap?.split("-");
    arr[1] = +arr[1] - 1;
    return arr.join("-");
  };

  const nextChap = () => {
    const arr: any = chap?.split("-");
    arr[1] = +arr[1] + 1;
    return arr.join("-");
  };
  const readFirstChap = () => {
    const newUrl = location.pathname.split("/");
    newUrl[newUrl.length - 1] = data?.chapters[data.chapters.length - 1].slug!;
    nav(newUrl.join("/"));
  }
  const readLastChap = () => {
    const newUrl = location.pathname.split("/");
    newUrl[newUrl.length - 1] = data?.latest.replace(" ","-")!
    nav(newUrl.join("/"));

  }
  return (
    <div className="body m-top-100 read-story-page">
      {isSuccessFetch ? (
        <div>
          <div className="header-read-story-page">
            <div className="header-read-story">
              <div className="header-read">
                <div className="header-read-image">
                  <img src={data?.thumbnail} alt="" />
                </div>

                <div className="header-read-content">
                  <div className="story-name">
                    <h4>{data?.name}</h4>
                  </div>
                  <div className="read-base">
                    <div className="story-auth str-item">
                      <span>Tác giả </span>
                      <span>{data?.auth}</span>
                    </div>
                    <div className="story-chap-new str-item">
                      <span>Mới nhất </span>
                      <span>{data?.latest}</span>
                    </div>
                    <div className="story-view str-item">
                      <span>Trạng thái </span>
                      <span>{data?.status}</span>
                    </div>
                    <div className="story-view str-item">
                      <span>Lượt đọc </span>
                      <span>{data?.views}</span>
                    </div>
                  </div>
                  <div className="content">
                    <h4>Nội dung : </h4>
                    <p>{data?.description}</p>
                  </div>
                  <div className="button-read">
                    <button onClick={readFirstChap}>Đọc từ đầu</button>
                    <button onClick={readLastChap}>Đọc Chap mới nhất</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="body-read-story">
            <div className="control-read-story">
              <button
                onClick={() => handleRouterChap(preChap())}
                style={{
                  display:
                    chap === data?.chapters[data?.chapters.length - 1].slug
                      ? "none"
                      : "block",
                }}
              >
                <span className="material-icons">chevron_left</span>
              </button>
              <div className="current-chapter">
                <span>{chap?.replace("-", " ")}</span>
              </div>
              <button
                onClick={() => handleRouterChap(nextChap())}
                style={{
                  display: chap === data?.chapters[0].slug ? "none" : "block",
                }}
              >
                <span className="material-icons">chevron_right</span>
              </button>
            </div>
            <div className="collection-item-img">
              {imgData?.map((it) => (
                <img key={it.src} src={it.src} alt={it.alt} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <Spinner isLoading={isSuccessFetch} timeLoading={100000} />
      )}
    </div>
  );
};

export default ReadStoryPage;
