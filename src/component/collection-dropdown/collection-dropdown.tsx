import { Link } from "react-router-dom";
import { GENRES, RANKINGS } from "../../utils/type";
import "./collection-dropdown.style.css";

interface propCol {
  isMobile : boolean
}
const CollectionDropDown = ({isMobile} : propCol) => {

  return (
    <div className="collection_dropdown" style={{visibility: isMobile ? `visible` : `hidden` ,
      opacity: isMobile ? 1 : 0 , display : isMobile ? `block` : 'none'}} >
      <div className="collection_dropdown_box">
        <div className="row">
          <div className="title">
            <h3>Genres</h3>
          </div>
          <ul  className="cls-links">
            {GENRES.map((item) => (
              <li key={item.slug}>
                <Link to={`genres/${item.slug}`}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="row">
          <div className="title">
            <h3>Rank</h3>
          </div>
          <ul className="cls-links">
            {RANKINGS.map((item) => (
              <li key={item.slug}>
                <Link to={`ranking/${item.slug}`}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default CollectionDropDown;
