import { useNavigate } from "react-router-dom";
import { handlePath, handlePathInfo } from "../../utils/service";
import { AnimeInfo } from "../../utils/type";

interface typeProps {
  item: AnimeInfo;
  onClick?: () => void;
}

const ItemRecommended = ({ item , onClick}: typeProps) => {
  
  return (
    <div className="item_recommended" onClick={onClick}>
      <div className="item_recommended-img">
        <img src={item.thumbnail} alt={item.name} />
        <div className="overlay"> </div>
      </div>
      <div className="item_recommended-content">
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
                <p>{item.genres.map((it, index) => (
                  <span key={it.slug}>
                    {" "}
                    {it.name} {index === item.genres.length - 1 ? ` ` : `-`}
                  </span>
                ))}</p>
              
              </div>
            </div>
            <div className="slide_header-desc">
              <p>{item.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemRecommended;
