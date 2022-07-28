import { Story } from "../../utils/type";

const ItemMedium = ({item} : {item : Story}) => {
  return (
    <div className="item-medium">
      <div className="item-thumbnail">
        <img
          src={item.img}
          data-src={item.img}
          alt={item.name}
        />
        <span className="background-1" style={{padding: '3px'}}>{item.chap || (item.view + 'lượt xem')}</span>
      </div>

      <h4 className="item-title">
        {" "}
        {item.name}
      </h4>
    </div>
  );
};
export default ItemMedium;
