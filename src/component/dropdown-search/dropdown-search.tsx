import { useNavigate } from "react-router-dom";
import { Anime } from "../../utils/type";
import "./dropdown-search.style.css";

const DropdownSearch = ({ dataSearch }: { dataSearch: Anime[] }) => {
    const nav = useNavigate();

    const handlePath = (slug: string, name: string) => {
        nav(`/watch/${slug}/${name}`);
      };
  return (
    <div className="dropdown_search">
      {dataSearch.map((item) => (
        <div className="dropdown-search-item" key={item.id} onClick={()=>  handlePath(item.slug, item.name)}>
          <div className="img">
            <img
              src={`${item.thumbnail}`}
              alt=""
            />
          </div>
          <div className="name-anime">
            <h4>{item.name}</h4>
          </div>
        </div>
      ))}
      
    </div>
  );
};
export default DropdownSearch;
