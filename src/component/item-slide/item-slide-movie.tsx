import { Anime } from "../../utils/type";

interface propsItem{
  anime : Anime,
  onClick :() =>  void
} 

const ItemSlideMovie = (props : propsItem)=> {
  return (
    <div className="slick-slider-movie-item" onClick={props.onClick}>
    <div className="movie-item-img">
      <img src={props.anime.thumbnail} alt="" />
    </div>
    <div className="movie-item-content">
        <div className="movie-name-item">
            <h4>{props.anime.name}</h4>
        </div>
        <div className="movie-c-item">
            <div className="star-item">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
            </div>
            <div className="view-item">
              <span>{props.anime.views}</span>
              <i className="fa-solid fa-eye"></i>
            </div>
        </div>
    </div>
 </div>
  )
}

export default ItemSlideMovie