import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AnimeInfo, Episodes } from "../../utils/type";
import SlickCarousel from "../slick-carousel/slick-carousel";
import "./episode.style.css";
interface propEpisode {
  Episodes: Episodes;
}

const Episode = ({ Episodes }: propEpisode) => {
  const Nav = useNavigate();
  const {name} = useParams()
  const location = useLocation()
  const handleChangePath = (path: string) => {
    if(name){
     var  pathP =location.pathname.split("/")
     pathP[pathP.length - 1] = path
     Nav(pathP.join("/"));
    }else{
      console.log(2)
      Nav(path);
    }
  
  };

  return (
    <div className="episode">
      <div
        key={Episodes.id}
        className="episode-item"
        onClick={() =>
          handleChangePath(
            Episodes.full_name === "Full"
              ? Episodes.film_name
              : Episodes.full_name
          )
        }
      >
        <div className="episode-item-img">
          <i className="material-icons circle"> play_arrow </i>
          <img src={Episodes.thumbnail_medium} alt="" />
        </div>
        <div className="episode-item-content">
          <div className="episode-item-name">
            <span>
              {Episodes.full_name === "Full"
                ? Episodes.film_name
                : Episodes.full_name}
            </span>
          </div>
          <div className="view">
            <span>{Episodes.views} Lượt xem</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Episode;
