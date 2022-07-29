import { useNavigate } from "react-router-dom";
import { Story } from "../../utils/type";

const ItemMedium = ({item} : {item : Story}) => {
  const nav = useNavigate()

  const handleRouterStory = (slug : string) => {
    nav(`${slug}`)
  }
  return (
    <div className="item-medium" onClick={() => handleRouterStory(item.slug)}>
      <div className="item-thumbnail">
        <img
          src={item.img}
          data-src={item.img}
          alt={item.name}
        />
        <span className="background-1" style={{padding: '3px'}}>{item.chap || (item.view.includes('lượt đọc') ? item.view : item.view + 'lượt đọc')}</span>
      </div>

      <h4 className="item-title">
        {" "}
        {item.name}
      </h4>
    </div>
  );
};
export default ItemMedium;
