import { useNavigate } from "react-router-dom";
import { AnimeInfo } from "../../utils/type";

interface typeProps {
  item: AnimeInfo;
}

const ItemSliderHeader = ({ item }: typeProps) => {
  const nav = useNavigate();
  const handlePath = (slug: string, name: string) => {
    nav(`/watch/${slug}/${name}`);
  };
  return (
    <div className="item_slide_header">
      <div className="item_slide_header-img">
        <img src={item.thumbnail} alt="" />
        <div className="overlay"> </div>
      </div>
      <div className="item_slide_header-content">
        <div className="slide_content_left">
          <div className="slide_header-content-name-item">
            <h4>{item.name}</h4>
          </div>
          <div className="slide_header-icon-item">
            <div className="icon-item">
              <div className="start round-icon">
                <i className="fa-solid fa-star"></i>
                <span>10</span>
              </div>
              <div className="episodes round-icon">
                <i className="material-icons">schedule</i>
                <span>{item.episodes.length} tập</span>
              </div>
              <div className="genres round-icon">
                <i className="material-icons">add_circle</i>
                {item.genres.map((it, index) => (
                  <span key={it.slug}>
                    {" "}
                    {it.name} {index === item.genres.length - 1 ? ` ` : `-`}
                  </span>
                ))}
              </div>
            </div>
            <div className="slide_header-desc">
              <p>{item.description}</p>
            </div>
            <div className="slide_header-button">
              <button onClick={() => handlePath(item.slug, item.name)}>
                Xem ngay
              </button>
            </div>
          </div>
        </div>
        <div
          className="slide_content_btn_play"
          onClick={() => handlePath(item.slug, item.name)}
        >
          <span className="icons">
            <i className="material-icons">play_arrow</i>
          </span>
        </div>
      </div>
    </div>
  );
};
export default ItemSliderHeader;
