import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Story } from "../../utils/type";
import './item.style.css'

const ItemMedium = ({item} : {item : Story}) => {
  const {pathname} = useLocation() 
  const param = useParams()
  const nav = useNavigate()
  
  const handleRouterStory = (slug : string) => {
    if(pathname.includes("story")){
      
       if(param.slug){
        var path =  pathname.split("/")
        path[path.length-1] = slug
        nav(path.join("/"))
       }else{
        nav(`${slug}`) 
       }
    }else{
      nav(`story/${slug}`)
    }
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
