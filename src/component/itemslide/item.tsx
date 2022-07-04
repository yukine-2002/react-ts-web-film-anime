import { Anime } from "../../utils/type";
import './item.style.css'

interface propsItemSlide {
  anime: Anime;
  onClick?: () => void;
}

const Item= (props: propsItemSlide) => {
  return (
    <div className="slick-trending-item" onClick={props.onClick}>
      <div className="play-btn">
        <i className="fa-solid fa-circle-play"></i>
      </div>
      <div className="img">
        <img src={props.anime.thumbnail} alt="aria" />
      </div>
      <div className="slick-item-content">
        <div className="slick-item-title">
          <h4>{props.anime.name}</h4>
        </div>
        <div className="view">
          <span className="ep">{props.anime.latestEpisode?.name || props.anime.time}</span>
          <span>{props.anime.latestEpisode?.views || props.anime.views} lượt xem</span>
        </div>
      </div>
    </div>
  );
};

export default Item;
