
import { useNavigate } from "react-router-dom";
import { Story } from "../../utils/type";

const ItemLarge = ({ item }: { item: Story }) => {

  const nav = useNavigate()

  const handleRouterStory = (slug : string) => {
    nav(`${slug}`)
  }
  const handleRouterStoryChap = (url : string) => {
    nav(`${url.split("/").slice(1,url.length).join("/")}`)
  }
  return (
    <div className="item-large" >
      <div className="item-thumbnail" onClick={()=>handleRouterStory(item.slug)}>
        <img src={item.img} data-src={item.img} alt={item.name} />
        <span className="background-1" style={{ padding: "2px 3px" }}>
          {item.dateUpdate}
        </span>
      </div>
      <div className="item-children">
        <div className="C_">
            <span>Lượt xem :</span> <span>{item.view}</span>
        </div>   
        {item.storyChap?.map((it,_) => (
          <div className="child-chap" key={_} onClick={()=> handleRouterStoryChap(it.url)} >
            <span className="child-chap-name">{it.name}</span>
            <span className="child-chap-update">{it.update}</span>
          </div>
        ))}
      </div>
      <h4 className="item-title" onClick={()=>handleRouterStory(item.slug)}> {item.name}</h4>
    </div>
  );
};

export default ItemLarge;
